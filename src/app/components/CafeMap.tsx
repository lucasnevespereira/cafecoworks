"use client";

import { useEffect, useState } from "react";

type CafeMapProps = {
  name: string;
  lat: number;
  lng: number;
};

export default function CafeMap({ name, lat, lng }: CafeMapProps) {
  const [MapComponent, setMapComponent] =
    useState<React.ComponentType<unknown> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMap = async () => {
      try {
        const L = await import("leaflet");
        const { MapContainer, TileLayer, Marker, Popup } = await import(
          "react-leaflet"
        );

        // Import CSS
        await import("leaflet/dist/leaflet.css");

        const customIcon = new L.Icon({
          iconUrl: "/logo.png",
          iconSize: [36, 36],
          iconAnchor: [18, 36],
          popupAnchor: [0, -36],
        });

        const MapWithIcon = () => (
          <MapContainer
            center={[lat, lng]}
            zoom={15}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            <Marker position={[lat, lng]} icon={customIcon}>
              <Popup>{name}</Popup>
            </Marker>
          </MapContainer>
        );

        setMapComponent(() => MapWithIcon);
      } catch (error) {
        console.error("Failed to load map:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMap();
  }, [lat, lng, name]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-coffee-cream">
        <div className="text-coffee-warm">Loading map...</div>
      </div>
    );
  }

  if (!MapComponent) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-coffee-cream">
        <div className="text-coffee-warm">Map unavailable</div>
      </div>
    );
  }

  return <MapComponent />;
}
