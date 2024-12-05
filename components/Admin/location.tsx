import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { ClipLoader } from "react-spinners";

interface Location {
  address: string;
  city: string;
  country: string;
}

interface LocationInputProps {
  location: Location;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showLocation: boolean;
  toggleLocation: () => void;
}

const LocationInput: React.FC<LocationInputProps> = ({
  location,
  handleInputChange,
  showLocation,
  toggleLocation,
}) => {
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

  return (
    <div
      className="relative bg-gradient-to-tr from-slate-100 via-slate-200 to-slate-300 dark:from-gray-600 dark:to-gray-700 rounded-lg p-6 shadow-sm
     border border-gray-300 dark:border-gray-600 transition-transform duration-300 hover:scale-[101%] hover:shadow-lg"
    >
      <button
        onClick={toggleLocation}
        className="w-full text-left text-2xl font-semibold text-gray-600 dark:text-blue-300 flex items-center justify-between"
      >
        <span>Location</span>
        <svg
          className={`w-8 h-8 transition-transform duration-300 ${
            showLocation ? "rotate-180" : "rotate-0"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {showLocation && (
        <div className="mt-6 space-y-4">
          <input
            type="text"
            name="address"
            value={location.address}
            onChange={handleInputChange}
            placeholder="Address"
            className="border border-gray-300 dark:border-gray-800 rounded-lg p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-lg focus:ring-indigo-500 focus:border-indigo-500 w-full transition duration-300 ease-in-out transform"
          />
          <input
            type="text"
            name="city"
            value={location.city}
            onChange={handleInputChange}
            placeholder="City"
            className="border border-gray-300 dark:border-gray-800 rounded-lg p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-lg focus:ring-indigo-500 focus:border-indigo-500 w-full transition duration-300 ease-in-out transform"
          />
          <input
            type="text"
            name="country"
            value={location.country}
            onChange={handleInputChange}
            placeholder="Country"
            className="border border-gray-300 dark:border-gray-800 rounded-lg p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-lg focus:ring-indigo-500 focus:border-indigo-500 w-full transition duration-300 ease-in-out transform"
          />
          <div className="w-full h-64 mt-4 rounded-lg overflow-hidden relative">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
                <ClipLoader color={"#3498db"} loading={loading} size={50} />
              </div>
            )}
            <div ref={mapRef} className="w-full h-full rounded-lg"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationInput;
