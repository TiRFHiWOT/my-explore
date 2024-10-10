import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const Leaflet = dynamic(() => import("leaflet"), { ssr: false });

const useLeafletMap = (
  showLocation: boolean,
  location: { address: string; city: string; country: string }
) => {
  const [map, setMap] = useState<L.Map | null>(null);
  const [marker, setMarker] = useState<L.Marker | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (showLocation && mapRef.current && typeof window !== "undefined") {
      if (!map) {
        import("leaflet").then((L) => {
          const newMap = L.map(mapRef.current!).setView([51.505, -0.09], 13);
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(newMap);
          setMap(newMap);
          setLoading(false);
        });
      }
    }
  }, [showLocation, map]);

  useEffect(() => {
    if (
      showLocation &&
      location.address &&
      location.city &&
      location.country &&
      map
    ) {
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
    }
  }, [location, showLocation, map, marker]);

  return { mapRef, loading };
};

export default useLeafletMap;
