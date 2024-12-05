import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { ClipLoader } from "react-spinners";

interface LocationInfo {
  address?: string;
  city?: string;
  country?: string;
}

interface VisitUsProps {
  location: LocationInfo;
}

const VisitUs: React.FC<VisitUsProps> = ({ location }) => {
  const [map, setMap] = useState<L.Map | null>(null);
  const [marker, setMarker] = useState<L.Marker | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && mapRef.current) {
      import("leaflet")
        .then((L) => {
          // Check if mapRef.current is not null
          if (mapRef.current) {
            const newMap = L.map(mapRef.current).setView([51.505, -0.09], 13);
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
              attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(newMap);
            setMap(newMap);
            setLoading(false);
          } else {
            console.error("Map container not found.");
          }
        })
        .catch((err) => {
          console.error("Error loading Leaflet:", err);
          setLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    if (map && location.address && location.city && location.country) {
      setLoading(true);
      const address = `${location.address}, ${location.city}, ${location.country}`;
      fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          address
        )}&format=json`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data[0]) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);
            map.setView([lat, lon], 13);

            if (marker) {
              marker.setLatLng([lat, lon]);
            } else {
              import("leaflet").then((L) => {
                const newMarker = L.marker([lat, lon]).addTo(map);
                setMarker(newMarker);
                setLoading(false);
              });
            }
          } else {
            setLoading(false);
          }
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [location, map, marker]);

  return (
    <div className="relative bg-transparent h-40 overflow-hidden dark:bg-gray-700 rounded-lg shadow-lg border border-gray-400 dark:border-gray-600">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
          <ClipLoader color={"#3498db"} loading={loading} size={50} />
        </div>
      )}
      <div ref={mapRef} className="w-full h-full rounded-lg"></div>
    </div>
  );
};

export default VisitUs;
