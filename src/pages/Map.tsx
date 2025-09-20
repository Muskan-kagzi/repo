import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function Map() {
  useEffect(() => {
    // Initialize map
    const map = L.map("map").setView([22.9734, 78.6569], 5);

    // Dark basemap
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      subdomains: "abcd",
      maxZoom: 19,
      attribution: "&copy; OSM & CARTO"
    }).addTo(map);

    // Risk points
    const riskPoints = [
      { lat: 30.7333, lng: 76.7794, risk: "High", place: "Himachal Foothills" },
      { lat: 32.7266, lng: 74.8570, risk: "High", place: "Jammu Hills" },
      { lat: 27.1767, lng: 78.0081, risk: "Medium", place: "Bundelkhand Region" },
      { lat: 25.3176, lng: 82.9739, risk: "Low", place: "Varanasi Plains" },
      { lat: 23.3441, lng: 85.3096, risk: "Medium", place: "Jharkhand Plateau" },
      { lat: 20.9517, lng: 85.0985, risk: "Low", place: "Odisha Coast" },
    ];

    riskPoints.forEach(p => {
      let color = p.risk === "High" ? "#ff3333" : (p.risk === "Medium" ? "#ff9900" : "#ffff33");
      L.circleMarker([p.lat, p.lng], {
        radius: p.risk === "High" ? 10 : p.risk === "Medium" ? 7 : 5,
        color: color,
        fillColor: color,
        fillOpacity: 0.8,
        weight: 2
      }).addTo(map).bindPopup(
        `<b>${p.place}</b><br>Risk Level: <span style="color:${color}">${p.risk}</span>`
      );
    });

    // Legend
    const legend = L.control({ position: "bottomright" });
    legend.onAdd = function () {
      const div = L.DomUtil.create("div", "legend");
      div.innerHTML = `
        <div><span style="background:#ff3333"></span> High Risk</div>
        <div><span style="background:#ff9900"></span> Medium Risk</div>
        <div><span style="background:#ffff33"></span> Low Risk</div>
      `;
      return div;
    };
    legend.addTo(map);

    // User location
    map.locate({ setView: true, maxZoom: 8 });
    map.on("locationfound", (e: any) => {
      const pulsingIcon = L.divIcon({ className: "pulse" });
      L.marker(e.latlng, { icon: pulsingIcon }).addTo(map)
        .bindPopup("<b>You are here 📍</b>").openPopup();
    });

  }, []);

  return (
    <>
      <div id="map"></div>
      <div id="sidebar">
        <h2>🌋 Rockfall Risk Map</h2>
        <p>
          This map shows regions with varying probabilities of rockfall across India.  
          <br /><br />
          🔴 High Risk → Severe possibility  
          🟠 Medium Risk → Moderate probability  
          🟡 Low Risk → Minor chances
        </p>
      </div>
    </>
  );
}
