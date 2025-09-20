# import webbrowser
# from pipeline import run_pipeline

# # ---------------------------
# # User inputs
# # ---------------------------

# # Bounding box [west, south, east, north] (example: Kodagu region)
# bbox = [75.3, 12.1, 76.0, 12.7]

# # Path to landslide shapefile
# landslide_shp = "Kodagu_landslides.shp"

# # Year and month for rainfall data
# year = 2023
# month = 6

# # Optional grid step (smaller = finer resolution, but slower)
# grid_step = 0.01

# # ---------------------------
# # Run full pipeline
# # ---------------------------
# print("🚀 Running full rockfall susceptibility pipeline...")
# folium_map = run_pipeline(
#     bbox=bbox,
#     landslide_shp=landslide_shp,
#     year=year,
#     month=month,
#     grid_step=grid_step
# )

# # ---------------------------
# # Open generated map in browser
# # ---------------------------
# map_file = "Pipeline_Susceptibility_Map.html"
# webbrowser.open(map_file)
# print("✅ Pipeline complete! Map should open in your browser.")







from pipeline import run_pipeline

# ---------------------------
# Test Configuration
# ---------------------------
# Small bounding box (for testing)
# Kodagu bounding box (approx)
bbox_test = [75.3, 12.2, 75.9, 12.6]  # ⚠ disable point rainfall
  # [west, south, east, north]

# Mine location (used for small bbox)
mine_location = (75.65, 12.4)

# Landslide shapefile (use a test or small dataset)
landslide_shp = "path/to/landslides.shp"

# Current year and month (you can change as needed)
year = 2023
month = 9

# Grid step for DEM sampling (smaller = higher resolution)
grid_step = 0.01

# ---------------------------
# Run full pipeline
# ---------------------------
print("🚀 Running full rockfall susceptibility pipeline...")
folium_map = run_pipeline(
    bbox=bbox_test,
    landslide_shp=None,   # or path if you want clipping
    year=year,
    month=month,
    grid_step=grid_step,
    mine_location=None    # ⚠ use regional rainfall grid
)


print("✅ Pipeline completed! Map is ready.")