from flask import Flask, request, jsonify, send_file
from pipeline import run_pipeline

app = Flask(__name__)

@app.route("/run", methods=["POST"])
def run():
    data = request.json
    bbox = data.get("bbox", [82.12, 24.34, 82.13, 24.35])
    year = data.get("year", 2023)
    month = data.get("month", 7)
    landslide_shp = data.get("landslide_shp", None)

    map_file = run_pipeline(bbox, landslide_shp, year, month)
    return send_file(map_file, mimetype="text/html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
