# import rasterio
# from rasterio.merge import merge
# import numpy as np

# def compute_slope_aspect_curvature(dem_array, transform):
#     dx = transform.a
#     dy = -transform.e
#     dzdx = np.gradient(dem_array, axis=1) / dx
#     dzdy = np.gradient(dem_array, axis=0) / dy
#     slope = np.arctan(np.sqrt(dzdx*2 + dzdy*2)) * 180 / np.pi
#     aspect = np.arctan2(-dzdx, dzdy) * 180 / np.pi
#     aspect = (aspect + 360) % 360
#     d2zdx2 = np.gradient(dzdx, axis=1) / dx
#     d2zdy2 = np.gradient(dzdy, axis=0) / dy
#     curvature = d2zdx2 + d2zdy2
#     return slope, aspect, curvature

# def save_array_as_tif(array, reference_path, output_path):
#     with rasterio.open(reference_path) as src:
#         profile = src.profile
#     profile.update(dtype=rasterio.float32, count=1)
#     with rasterio.open(output_path, "w", **profile) as dst:
#         dst.write(array.astype(np.float32), 1)

# def create_topo_features(dem_files, output_prefix="Kodagu"):
#     # Merge DEMs
#     src_files = [rasterio.open(f) for f in dem_files]
#     mosaic, out_transform = merge(src_files)
#     out_meta = src_files[0].meta.copy()
#     out_meta.update({
#         "driver": "GTiff",
#         "height": mosaic.shape[1],
#         "width": mosaic.shape[2],
#         "transform": out_transform,
#         "count": 1
#     })

#     merged_dem = f"{output_prefix}_merged.tif"
#     with rasterio.open(merged_dem, "w", **out_meta) as dest:
#         dest.write(mosaic[0], 1)

#     # Compute slope, aspect, curvature
#     slope, aspect, curvature = compute_slope_aspect_curvature(mosaic[0], out_transform)

#     slope_file = f"{output_prefix}_slope.tif"
#     aspect_file = f"{output_prefix}_aspect.tif"
#     curvature_file = f"{output_prefix}_curvature.tif"

#     save_array_as_tif(slope, merged_dem, slope_file)
#     save_array_as_tif(aspect, merged_dem, aspect_file)
#     save_array_as_tif(curvature, merged_dem, curvature_file)

#     return {
#         "dem": merged_dem,
#         "slope": slope_file,
#         "aspect": aspect_file,
#         "curvature": curvature_file,
#     }





import rasterio
from rasterio.merge import merge
import numpy as np

def compute_slope_aspect_curvature(dem_array, transform):
    dx = transform.a
    dy = -transform.e
    dzdx = np.gradient(dem_array, axis=1) / dx
    dzdy = np.gradient(dem_array, axis=0) / dy
    np.nan_to_num(dzdx, nan=0)
    np.nan_to_num(dzdy, nan=0)
    slope = np.arctan(np.sqrt(dzdx*2 + dzdy*2)) * 180 / np.pi
    aspect = np.arctan2(-dzdx, dzdy) * 180 / np.pi
    aspect = (aspect + 360) % 360
    d2zdx2 = np.gradient(dzdx, axis=1) / dx
    d2zdy2 = np.gradient(dzdy, axis=0) / dy
    curvature = d2zdx2 + d2zdy2
    return slope, aspect, curvature

def save_array_as_tif(array, reference_path, output_path):
    with rasterio.open(reference_path) as src:
        profile = src.profile
    profile.update(dtype=rasterio.float32, count=1)
    with rasterio.open(output_path, "w", **profile) as dst:
        dst.write(array.astype(np.float32), 1)

def create_topo_features(dem_files, output_prefix="Kodagu"):
    # Merge DEMs
    src_files = [rasterio.open(f) for f in dem_files]
    mosaic, out_transform = merge(src_files)
    out_meta = src_files[0].meta.copy()
    out_meta.update({
        "driver": "GTiff",
        "height": mosaic.shape[1],
        "width": mosaic.shape[2],
        "transform": out_transform,
        "count": 1
    })

    merged_dem = f"{output_prefix}_merged.tif"
    with rasterio.open(merged_dem, "w", **out_meta) as dest:
        dest.write(mosaic[0], 1)

    # Compute slope, aspect, curvature
    slope, aspect, curvature = compute_slope_aspect_curvature(mosaic[0], out_transform)

    slope_file = f"{output_prefix}_slope.tif"
    aspect_file = f"{output_prefix}_aspect.tif"
    curvature_file = f"{output_prefix}_curvature.tif"

    save_array_as_tif(slope, merged_dem, slope_file)
    save_array_as_tif(aspect, merged_dem, aspect_file)
    save_array_as_tif(curvature, merged_dem, curvature_file)

    return {
        "dem": merged_dem,
        "slope": slope_file,
        "aspect": aspect_file,
        "curvature": curvature_file,
    }