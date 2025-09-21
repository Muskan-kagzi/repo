# # import os
# # import requests
# # import rasterio
# # import pandas as pd
# # import numpy as np
# # import joblib
# # from data_creation_refactored import create_topo_features
# # import folium
# # import matplotlib.colors as colors
# # import matplotlib
# # from scipy.interpolate import griddata
# # import elevation

# # # ---------------------------
# # # Config
# # # ---------------------------
# # OT_API_KEY = "d3bc2e8cbdd6b24ff687a74a6e8c69ed"
# # MODEL_PATH = "logistic_regression_elasticnet.pkl"


# # # ---------------------------
# # # Fetch DEM with fallback
# # # ---------------------------
# # def get_dem(bbox, demtype="SRTMGL1"):
# #     """
# #     bbox = [west, south, east, north]
# #     Try OpenTopography first; fallback to NASA SRTM using elevation library
# #     """
# #     dem_file = "downloaded_dem.tif"
# #     try:
# #         url = (
# #             f"https://portal.opentopography.org/API/globaldem?"
# #             f"demtype={demtype}&south={bbox[1]}&north={bbox[3]}"
# #             f"&west={bbox[0]}&east={bbox[2]}"
# #             f"&outputFormat=GTiff&API_Key={OT_API_KEY}"
# #         )
# #         r = requests.get(url, timeout=60)
# #         r.raise_for_status()
# #         with open(dem_file, "wb") as f:
# #             f.write(r.content)
# #         # Quick check
# #         with rasterio.open(dem_file) as src:
# #             pass
# #         print("✅ DEM downloaded from OpenTopography.")
# #     except Exception as e:
# #         print(f"⚠ OpenTopography failed: {e}")
# #         print("🔄 Falling back to NASA SRTM (elevation library)...")
# #         elevation.clip(bounds=(bbox[0], bbox[1], bbox[2], bbox[3]), output=dem_file)
# #         try:
# #             with rasterio.open(dem_file) as src:
# #                 pass
# #         except Exception:
# #             raise RuntimeError("DEM fallback failed: downloaded_dem.tif is invalid.")
# #         print("✅ DEM downloaded using elevation (NASA SRTM).")
# #     return [dem_file]


# # # ---------------------------
# # # Generate grid points over DEM
# # # ---------------------------
# # def generate_point_grid(dem_path, step=0.01):
# #     with rasterio.open(dem_path) as src:
# #         bounds = src.bounds
# #     lons = np.arange(bounds.left, bounds.right, step)
# #     lats = np.arange(bounds.bottom, bounds.top, step)
# #     return [(lon, lat) for lat in lats for lon in lons]


# # # ---------------------------
# # # Fetch rainfall from NASA POWER
# # # ---------------------------
# # def get_rainfall_grid(bbox, year, month):
# #     """
# #     Fetch monthly rainfall (PRECTOT) for a bounding box using NASA POWER regional API.
# #     bbox = [west, south, east, north]
# #     Returns rainfall as a 2D numpy array aligned to POWER grid.
# #     """
# #     url = "https://power.larc.nasa.gov/api/temporal/monthly/regional"
# #     params = {
# #         "parameters": "PRECTOT",
# #         "community": "AG",
# #         "longitude-min": bbox[0],
# #         "longitude-max": bbox[2],
# #         "latitude-min": bbox[1],
# #         "latitude-max": bbox[3],
# #         "start": year,
# #         "end": year,
# #         "format": "JSON"
# #     }
# #     r = requests.get(url, params=params, timeout=120)
# #     r.raise_for_status()
# #     data = r.json()

# #     key = f"{year}{str(month).zfill(2)}"
# #     rainfall_data = data["properties"]["parameter"]["PRECTOT"][key]

# #     # Convert dict {lat: {lon: value}} → 2D numpy array
# #     lats = sorted(rainfall_data.keys(), key=float)
# #     lons = sorted(next(iter(rainfall_data.values())).keys(), key=float)

# #     arr = np.array([[rainfall_data[lat][lon] for lon in lons] for lat in lats], dtype=float)
# #     return arr, list(map(float, lons)), list(map(float, lats))



# # # ---------------------------
# # # Interpolate rainfall to DEM grid
# # # ---------------------------
# # def interpolate_rainfall_to_dem(rainfall_arr, lons, lats, dem_path):
# #     """
# #     Interpolates NASA rainfall grid to DEM resolution.
# #     """
# #     with rasterio.open(dem_path) as src:
# #         dem = src.read(1)
# #         rows, cols = dem.shape
# #         lon_min, lat_min, lon_max, lat_max = src.bounds.left, src.bounds.bottom, src.bounds.right, src.bounds.top
# #         lon_grid = np.linspace(lon_min, lon_max, cols)
# #         lat_grid = np.linspace(lat_min, lat_max, rows)
# #         mesh_lon, mesh_lat = np.meshgrid(lon_grid, lat_grid)

# #     # Flatten rainfall grid into points
# #     lon_mesh, lat_mesh = np.meshgrid(lons, lats)
# #     points = np.column_stack((lon_mesh.ravel(), lat_mesh.ravel()))
# #     values = rainfall_arr.ravel()

# #     # Interpolate rainfall onto DEM grid
# #     rainfall_raster = griddata(points, values, (mesh_lon, mesh_lat), method="nearest")
# #     return rainfall_raster



# # # ---------------------------
# # # Predict raster susceptibility
# # # ---------------------------
# # def predict_susceptibility(rasters, rainfall_raster, out_tif="Susceptibility.tif"):
# #     model = joblib.load(MODEL_PATH)

# #     arrays = {}
# #     profile = None
# #     for name, path in rasters.items():
# #         with rasterio.open(path) as src:
# #             arr = src.read(1).astype("float32")
# #             if profile is None:
# #                 profile = src.profile
# #             arrays[name] = arr

# #     stacked = np.stack([
# #         arrays["dem"].ravel(),
# #         arrays["slope"].ravel(),
# #         arrays["aspect"].ravel(),
# #         arrays["curvature"].ravel(),
# #         rainfall_raster.ravel()
# #     ], axis=1)

# #     df = pd.DataFrame(stacked, columns=["elevation", "slope", "aspect", "curvature", "rainfall_mm"])

# #     # ✅ Safe NaN handling, no chained assignment warnings
# #     for col in df.columns:
# #         if df[col].isna().all():
# #             df[col] = 0.0
# #         else:
# #             median_val = df[col].median()
# #             df[col] = df[col].fillna(median_val)

# #     probas = model.predict_proba(df)[:, 1]
# #     probas_map = probas.reshape(arrays["dem"].shape)

# #     profile.update(dtype=rasterio.float32, count=1, compress="lzw")
# #     with rasterio.open(out_tif, "w", **profile) as dst:
# #         dst.write(probas_map.astype("float32"), 1)

# #     return out_tif




# # # ---------------------------
# # # Generate Folium Map
# # # ---------------------------
# # def generate_map(raster_file, center, zoom=10, out_html="Susceptibility_Map.html"):
# #     with rasterio.open(raster_file) as src:
# #         bounds = src.bounds
# #         data = src.read(1)

# #     norm = colors.Normalize(vmin=0, vmax=1)
# #     cmap = matplotlib.colormaps.get_cmap("RdYlGn_r")
# #     rgba_img = (cmap(norm(data)) * 255).astype(np.uint8)

# #     m = folium.Map(location=center, zoom_start=zoom)
# #     folium.raster_layers.ImageOverlay(
# #         image=rgba_img,
# #         bounds=[[bounds.bottom, bounds.left], [bounds.top, bounds.right]],
# #         opacity=0.6,
# #     ).add_to(m)

# #     m.save(out_html)
# #     print(f"✅ Map saved: {out_html}")
# #     return m


# # # ---------------------------
# # # Full pipeline
# # # ---------------------------
# # def run_pipeline(bbox, landslide_shp, year, month, grid_step=0.1):
# #     # 1. DEM (with automatic fallback)
# #     dem_files = get_dem(bbox)

# #     # 2. Create topo features
# #     rasters = create_topo_features(dem_files, output_prefix="Pipeline")


# #     # 3. Generate grid and fetch NASA POWER rainfall
# #     # 3. Fetch NASA POWER rainfall (regional API)
# #     rainfall_arr, lons, lats = get_rainfall_grid(bbox, year, month)
# #     rainfall_raster = interpolate_rainfall_to_dem(rainfall_arr, lons, lats, rasters["dem"])


# #     # 4. Predict susceptibility raster
# #     susceptibility_tif = predict_susceptibility(rasters, rainfall_raster, out_tif="Pipeline_Susceptibility.tif")

# #     # 5. Folium map
# #     center = [(bbox[1] + bbox[3]) / 2, (bbox[0] + bbox[2]) / 2]
# #     return generate_map(susceptibility_tif, center)







# import os
# import requests
# import rasterio
# import pandas as pd
# import numpy as np
# import joblib
# from data_creation_refactored import create_topo_features
# import folium
# import matplotlib.colors as colors
# import matplotlib
# from scipy.interpolate import griddata
# import elevation

# # ---------------------------
# # Config
# # ---------------------------
# OT_API_KEY = "d3bc2e8cbdd6b24ff687a74a6e8c69ed"
# MODEL_PATH = "logistic_regression_elasticnet.pkl"
# OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "output")
# os.makedirs(OUTPUT_DIR, exist_ok=True)


# # ---------------------------
# # Fetch DEM with fallback
# # ---------------------------
# def get_dem(bbox, demtype="SRTMGL1"):
#     """
#     bbox = [west, south, east, north]
#     Try OpenTopography first; fallback to NASA SRTM using elevation library
#     """
#     dem_file = os.path.join(OUTPUT_DIR, "downloaded_dem.tif")
#     try:
#         url = (
#             f"https://portal.opentopography.org/API/globaldem?"
#             f"demtype={demtype}&south={bbox[1]}&north={bbox[3]}"
#             f"&west={bbox[0]}&east={bbox[2]}"
#             f"&outputFormat=GTiff&API_Key={OT_API_KEY}"
#         )
#         r = requests.get(url, timeout=60)
#         r.raise_for_status()
#         with open(dem_file, "wb") as f:
#             f.write(r.content)
#         with rasterio.open(dem_file):
#             pass
#         print("✅ DEM downloaded from OpenTopography.")
#     except Exception as e:
#         print(f"⚠ OpenTopography failed: {e}")
#         print("🔄 Falling back to NASA SRTM (elevation library)...")
#         elevation.clip(bounds=(bbox[0], bbox[1], bbox[2], bbox[3]), output=dem_file)
#         try:
#             with rasterio.open(dem_file):
#                 pass
#         except Exception:
#             raise RuntimeError("DEM fallback failed: downloaded_dem.tif is invalid.")
#         print("✅ DEM downloaded using elevation (NASA SRTM).")
#     return [dem_file]


# # ---------------------------
# # Generate grid points over DEM
# # ---------------------------
# def generate_point_grid(dem_path, step=0.01):
#     with rasterio.open(dem_path) as src:
#         bounds = src.bounds
#     lons = np.arange(bounds.left, bounds.right, step)
#     lats = np.arange(bounds.bottom, bounds.top, step)
#     return [(lon, lat) for lat in lats for lon in lons]


# # ---------------------------
# # Fetch rainfall from NASA POWER
# # ---------------------------
# def get_rainfall_grid(bbox, year, month):
#     url = "https://power.larc.nasa.gov/api/temporal/monthly/regional"
#     params = {
#         "parameters": "PRECTOT",
#         "community": "AG",
#         "longitude-min": bbox[0],
#         "longitude-max": bbox[2],
#         "latitude-min": bbox[1],
#         "latitude-max": bbox[3],
#         "start": year,
#         "end": year,
#         "format": "JSON"
#     }
#     r = requests.get(url, params=params, timeout=120)
#     r.raise_for_status()
#     data = r.json()

#     key = f"{year}{str(month).zfill(2)}"
#     rainfall_data = data["properties"]["parameter"]["PRECTOT"][key]

#     lats = sorted(rainfall_data.keys(), key=float)
#     lons = sorted(next(iter(rainfall_data.values())).keys(), key=float)

#     arr = np.array([[rainfall_data[lat][lon] for lon in lons] for lat in lats], dtype=float)
#     return arr, list(map(float, lons)), list(map(float, lats))


# # ---------------------------
# # Interpolate rainfall to DEM grid
# # ---------------------------
# def interpolate_rainfall_to_dem(rainfall_arr, lons, lats, dem_path):
#     with rasterio.open(dem_path) as src:
#         dem = src.read(1)
#         rows, cols = dem.shape
#         lon_min, lat_min, lon_max, lat_max = src.bounds.left, src.bounds.bottom, src.bounds.right, src.bounds.top
#         lon_grid = np.linspace(lon_min, lon_max, cols)
#         lat_grid = np.linspace(lat_min, lat_max, rows)
#         mesh_lon, mesh_lat = np.meshgrid(lon_grid, lat_grid)

#     lon_mesh, lat_mesh = np.meshgrid(lons, lats)
#     points = np.column_stack((lon_mesh.ravel(), lat_mesh.ravel()))
#     values = rainfall_arr.ravel()

#     rainfall_raster = griddata(points, values, (mesh_lon, mesh_lat), method="nearest")
#     return rainfall_raster


# # ---------------------------
# # Predict raster susceptibility
# # ---------------------------
# def predict_susceptibility(rasters, rainfall_raster, out_tif="Susceptibility.tif"):
#     model = joblib.load(MODEL_PATH)

#     arrays = {}
#     profile = None
#     for name, path in rasters.items():
#         with rasterio.open(path) as src:
#             arr = src.read(1).astype("float32")
#             if profile is None:
#                 profile = src.profile
#             arrays[name] = arr

#     stacked = np.stack([
#         arrays["dem"].ravel(),
#         arrays["slope"].ravel(),
#         arrays["aspect"].ravel(),
#         arrays["curvature"].ravel(),
#         rainfall_raster.ravel()
#     ], axis=1)

#     df = pd.DataFrame(stacked, columns=["elevation", "slope", "aspect", "curvature", "rainfall_mm"])

#     for col in df.columns:
#         if df[col].isna().all():
#             df[col] = 0.0
#         else:
#             df[col] = df[col].fillna(df[col].median())

#     probas = model.predict_proba(df)[:, 1]
#     probas_map = probas.reshape(arrays["dem"].shape)

#     profile.update(dtype=rasterio.float32, count=1, compress="lzw")
#     out_tif_path = os.path.join(OUTPUT_DIR, out_tif)
#     with rasterio.open(out_tif_path, "w", **profile) as dst:
#         dst.write(probas_map.astype("float32"), 1)

#     return out_tif_path


# # ---------------------------
# # Generate Folium Map
# # ---------------------------
# def generate_map(raster_file, center, zoom=10, out_html="Susceptibility_Map.html"):
#     with rasterio.open(raster_file) as src:
#         bounds = src.bounds
#         data = src.read(1)

#     norm = colors.Normalize(vmin=0, vmax=1)
#     cmap = matplotlib.colormaps.get_cmap("RdYlGn_r")
#     rgba_img = (cmap(norm(data)) * 255).astype(np.uint8)

#     m = folium.Map(location=center, zoom_start=zoom)
#     folium.raster_layers.ImageOverlay(
#         image=rgba_img,
#         bounds=[[bounds.bottom, bounds.left], [bounds.top, bounds.right]],
#         opacity=0.6,
#     ).add_to(m)

#     out_html_path = os.path.join(OUTPUT_DIR, out_html)
#     m.save(out_html_path)
#     print(f"✅ Map saved: {out_html_path}")
#     return out_html_path


# # ---------------------------
# # Full pipeline
# # ---------------------------
# def run_pipeline(bbox, landslide_shp=None, year=2023, month=7, grid_step=0.1):
#     dem_files = get_dem(bbox)
#     rasters = create_topo_features(dem_files, output_prefix="Pipeline")

#     rainfall_arr, lons, lats = get_rainfall_grid(bbox, year, month)
#     rainfall_raster = interpolate_rainfall_to_dem(rainfall_arr, lons, lats, rasters["dem"])

#     susceptibility_tif = predict_susceptibility(rasters, rainfall_raster, out_tif="Pipeline_Susceptibility.tif")

#     center = [(bbox[1] + bbox[3]) / 2, (bbox[0] + bbox[2]) / 2]
#     return generate_map(susceptibility_tif, center, out_html="Pipeline_Susceptibility_Map.html")



import os
import requests
import rasterio
import pandas as pd
import numpy as np
import joblib
from data_creation_refactored import create_topo_features
import folium 
import matplotlib.colors as colors
import matplotlib
from scipy.interpolate import griddata
import elevation

# ---------------------------
# Config
# ---------------------------
OT_API_KEY = "d3bc2e8cbdd6b24ff687a74a6e8c69ed"
MODEL_PATH = "logistic_regression_elasticnet.pkl"



# import os
# from pipeline import MODEL_PATH   # or wherever MODEL_PATH is defined in your code

# print(MODEL_PATH)
# print(os.path.exists(MODEL_PATH))





# ---------------------------
# Fetch DEM with fallback
# ---------------------------
def get_dem(bbox, demtype="SRTMGL1"):
    dem_file = "downloaded_dem.tif"
    try:
        url = (
            f"https://portal.opentopography.org/API/globaldem?"
            f"demtype={demtype}&south={bbox[1]}&north={bbox[3]}" 
            f"&west={bbox[0]}&east={bbox[2]}"
            f"&outputFormat=GTiff&API_Key={OT_API_KEY}"
        )
        r = requests.get(url, timeout=60)
        r.raise_for_status()
        with open(dem_file, "wb") as f:
            f.write(r.content)
        with rasterio.open(dem_file) as src:
            pass
        print("✅ DEM downloaded from OpenTopography.")
    except Exception as e:
        print(f"⚠ OpenTopography failed: {e}")
        print("🔄 Falling back to NASA SRTM (elevation library)...")
        elevation.clip(bounds=(bbox[0], bbox[1], bbox[2], bbox[3]), output=dem_file)
        with rasterio.open(dem_file) as src:
            pass
        print("✅ DEM downloaded using elevation (NASA SRTM).")
    return [dem_file]

# ---------------------------
# Generate grid points over DEM
# ---------------------------
def generate_point_grid(dem_path, step=0.01):
    with rasterio.open(dem_path) as src:
        bounds = src.bounds
    lons = np.arange(bounds.left, bounds.right, step)
    lats = np.arange(bounds.bottom, bounds.top, step)
    return [(lon, lat) for lat in lats for lon in lons]

# ---------------------------
# Fetch rainfall (regional or point)
# ---------------------------
def get_rainfall(bbox, year, month, mine_location=None, buffer_deg=0.05):
    """
    Fetch rainfall data from NASA POWER.
    - If mine_location is provided → expand to a small bbox around it.
    - Else → fetch for the full bbox.
    """
    key = f"{year}{str(month).zfill(2)}"

    try:
        if mine_location is not None:
            lon, lat = mine_location
            bbox = [lon - buffer_deg, lat - buffer_deg,
                    lon + buffer_deg, lat + buffer_deg]

        # Regional fetch
        url = "https://power.larc.nasa.gov/api/temporal/monthly/regional"
        params = {
            "parameters": "PRECTOT",
            "community": "AG",
            "longitude-min": bbox[0],
            "longitude-max": bbox[2],
            "latitude-min": bbox[1],
            "latitude-max": bbox[3],
            "start": f"{year}{str(month).zfill(2)}",
            "end": f"{year}{str(month).zfill(2)}",
            "format": "JSON"
        }


        r = requests.get(url, params=params, timeout=120)
        r.raise_for_status()
        data = r.json()
        rainfall_data = data.get("properties", {}).get("parameter", {}).get("PRECTOT", {})
        if not rainfall_data:
            raise ValueError("No rainfall data returned from NASA POWER.")

        lats = sorted(rainfall_data.keys(), key=float)
        lons = sorted(next(iter(rainfall_data.values())).keys(), key=float)
        arr = np.array([[rainfall_data[lat][lon] for lon in lons] for lat in lats], dtype=float)
        return arr, list(map(float, lons)), list(map(float, lats))

    except Exception as e:
        print(f"⚠ NASA POWER fetch failed: {e}")
        # Return fallback zero grid
        return np.zeros((1, 1)), [bbox[0]], [bbox[1]]



def debug_plot_rainfall(rainfall_arr, lons, lats):
    import matplotlib.pyplot as plt
    plt.figure(figsize=(6,5))
    plt.imshow(rainfall_arr, cmap="Blues", 
               extent=[min(lons), max(lons), min(lats), max(lats)], 
               origin="lower")
    plt.colorbar(label="Rainfall (mm)")
    plt.title("NASA POWER Rainfall Grid")
    plt.show()


# ---------------------------
# Interpolate rainfall to DEM grid
# ---------------------------
def interpolate_rainfall_to_dem(rainfall_arr, lons, lats, dem_path):
    with rasterio.open(dem_path) as src:
        dem = src.read(1)
        rows, cols = dem.shape
        lon_min, lat_min, lon_max, lat_max = src.bounds.left, src.bounds.bottom, src.bounds.right, src.bounds.top
        lon_grid = np.linspace(lon_min, lon_max, cols)
        lat_grid = np.linspace(lat_min, lat_max, rows)
        mesh_lon, mesh_lat = np.meshgrid(lon_grid, lat_grid)

    lon_mesh, lat_mesh = np.meshgrid(lons, lats)
    points = np.column_stack((lon_mesh.ravel(), lat_mesh.ravel()))
    values = rainfall_arr.ravel()
    rainfall_raster = griddata(points, values, (mesh_lon, mesh_lat), method="nearest")
    return rainfall_raster

# ---------------------------
# Predict raster susceptibility
# ---------------------------
def predict_susceptibility(rasters, rainfall_raster, out_tif="Susceptibility.tif"):
    model = joblib.load(MODEL_PATH)

    arrays = {}
    profile = None
    for name, path in rasters.items():
        with rasterio.open(path) as src:
            arr = src.read(1).astype("float32")
            if profile is None:
                profile = src.profile
            arrays[name] = arr

    stacked = np.stack([
        arrays["dem"].ravel(),
        arrays["slope"].ravel(),
        arrays["aspect"].ravel(),
        arrays["curvature"].ravel(),
        rainfall_raster.ravel()
    ], axis=1)

    df = pd.DataFrame(stacked, columns=["elevation", "slope", "aspect", "curvature", "rainfall_mm"])

    for col in df.columns:
        if df[col].isna().all():
            df[col] = 0.0
        else:
            median_val = df[col].median()
            df[col] = df[col].fillna(median_val)

    probas = model.predict_proba(df)[:, 1]
    probas_map = probas.reshape(arrays["dem"].shape)

    profile.update(dtype=rasterio.float32, count=1, compress="lzw")
    with rasterio.open(out_tif, "w", **profile) as dst:
        dst.write(probas_map.astype("float32"), 1)

    return out_tif

# ---------------------------
# Generate Folium Map
# ---------------------------
def generate_map(raster_file, center, zoom=10, out_html="Susceptibility_Map.html"):
    with rasterio.open(raster_file) as src:
        bounds = src.bounds
        data = src.read(1)

    norm = colors.Normalize(vmin=0, vmax=1)
    cmap = matplotlib.colormaps.get_cmap("RdYlGn_r")
    rgba_img = (cmap(norm(data)) * 255).astype(np.uint8)

    m = folium.Map(location=center, zoom_start=zoom)
    folium.raster_layers.ImageOverlay(
        image=rgba_img,
        bounds=[[bounds.bottom, bounds.left], [bounds.top, bounds.right]],
        opacity=0.6,
    ).add_to(m)

    m.save(out_html)
    print(f"✅ Map saved: {out_html}")
    return m

# ---------------------------
# Full pipeline
# ---------------------------
def run_pipeline(bbox, landslide_shp, year, month, grid_step=0.1, mine_location=None):
    # 1. DEM
    dem_files = get_dem(bbox)

    # 2. Topo features
    rasters = create_topo_features(dem_files, output_prefix="Pipeline")

    # 3. Rainfall
    rainfall_arr, lons, lats = get_rainfall(bbox, year, month, mine_location=mine_location)
    rainfall_raster = interpolate_rainfall_to_dem(rainfall_arr, lons, lats, rasters["dem"])
    # print("Rainfall array shape:", rainfall_arr.shape)
    # print("Rainfall sample values:", rainfall_arr[:3,:3])
    # 4. Predict susceptibility
    susceptibility_tif = predict_susceptibility(rasters, rainfall_raster, out_tif="Pipeline_Susceptibility.tif")

    # 5. Generate map
    center = [(bbox[1] + bbox[3]) / 2, (bbox[0] + bbox[2]) / 2]
    return generate_map(susceptibility_tif, center)