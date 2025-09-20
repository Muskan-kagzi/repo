import geopandas as gpd
import rasterio
import pandas as pd
import numpy as np
from shapely.geometry import Point
import random

def prepare_dataset(landslide_shp, rainfall_df, rasters, n_samples=5):
    """
    rasters: dict with keys 'dem', 'slope', 'aspect', 'curvature'
    rainfall_df: must have ['Month', 'Rainfall_mm']
    """

    landslides = gpd.read_file(landslide_shp).to_crs("EPSG:4326")
    rasters = {k: rasterio.open(v) for k, v in rasters.items()}

    def sample_rasters(lon, lat):
        vals = {}
        for name, r in rasters.items():
            for val in r.sample([(lon, lat)]):
                vals[name] = float(val[0])
        return vals

    month_map = {i: m for i, m in enumerate(
        ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"], 1)}

    def extract_month(name):
        try:
            return int(name.split("-")[0])
        except:
            return None

    # Positive samples
    pos_points = []
    for _, row in landslides.iterrows():
        poly = row.geometry
        month_num = extract_month(row["Name"])
        if month_num is None: continue
        rain_val = rainfall_df.loc[rainfall_df["Month"] == month_map[month_num], "Rainfall_mm"].values[0]

        for _ in range(n_samples):
            minx, miny, maxx, maxy = poly.bounds
            while True:
                p = Point(random.uniform(minx, maxx), random.uniform(miny, maxy))
                if poly.contains(p): break
            vals = sample_rasters(p.x, p.y)
            pos_points.append({"lon": p.x, "lat": p.y, **vals,
                               "rainfall_mm": rain_val, "month": month_num, "label": 1})

    df_pos = pd.DataFrame(pos_points)

    # Negative samples
    minx, miny, maxx, maxy = landslides.total_bounds
    neg_points = []
    for _, row in df_pos.iterrows():
        month_num = row["month"]
        rain_val = rainfall_df.loc[rainfall_df["Month"] == month_map[month_num], "Rainfall_mm"].values[0]
        while True:
            p = Point(random.uniform(minx, maxx), random.uniform(miny, maxy))
            if not landslides.contains(p).any(): break
        vals = sample_rasters(p.x, p.y)
        neg_points.append({"lon": p.x, "lat": p.y, **vals,
                           "rainfall_mm": rain_val, "month": month_num, "label": 0})

    df_neg = pd.DataFrame(neg_points)

    return pd.concat([df_pos, df_neg], ignore_index=True)