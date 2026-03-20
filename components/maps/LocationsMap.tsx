"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import type { LocationItem } from "@/types/landing";

interface LocationsMapProps {
  activeLocationId: string;
  locations: LocationItem[];
  onSelectLocation: (id: string) => void;
}

export function LocationsMap({
  activeLocationId,
  locations,
  onSelectLocation,
}: LocationsMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<Map<string, maplibregl.Marker>>(new Map());

  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container || mapRef.current) {
      return;
    }

    const validLocations = locations.filter((location) => location.coordinates);
    const center = validLocations[0]?.coordinates ?? { lat: -31.424, lng: -64.497 };

    const map = new maplibregl.Map({
      container,
      style: "https://demotiles.maplibre.org/style.json",
      center: [center.lng, center.lat],
      zoom: 13,
      attributionControl: false,
      dragRotate: false,
      pitchWithRotate: false,
      touchZoomRotate: true,
    });

    mapRef.current = map;
    const markers = markersRef.current;

    validLocations.forEach((location) => {
      const coordinates = location.coordinates;
      if (!coordinates) {
        return;
      }

      const markerElement = document.createElement("button");
      markerElement.type = "button";
      markerElement.className = "juicy-map-marker";
      markerElement.setAttribute("aria-label", `Ver ${location.zone} en el mapa`);
      markerElement.innerHTML = `<span>${location.zone.split(" ")[0]}</span>`;
      markerElement.addEventListener("click", () => onSelectLocation(location.id));

      const marker = new maplibregl.Marker({ element: markerElement, anchor: "bottom" })
        .setLngLat([coordinates.lng, coordinates.lat])
        .addTo(map);

      markers.set(location.id, marker);
    });

    return () => {
      markers.forEach((marker) => marker.remove());
      markers.clear();
      map.remove();
      mapRef.current = null;
    };
  }, [locations, onSelectLocation]);

  useEffect(() => {
    markersRef.current.forEach((marker, id) => {
      const element = marker.getElement();
      if (id === activeLocationId) {
        element.classList.add("is-active");
      } else {
        element.classList.remove("is-active");
      }
    });

    const active = locations.find((location) => location.id === activeLocationId);
    const map = mapRef.current;
    if (active?.coordinates && map) {
      map.flyTo({
        center: [active.coordinates.lng, active.coordinates.lat],
        zoom: 14,
        duration: 700,
        essential: true,
      });
    }
  }, [activeLocationId, locations]);

  return (
    <>
      <div ref={mapContainerRef} className="h-[360px] w-full rounded-[1.35rem]" />
      <style>{`
        .juicy-map-marker {
          border: 2px solid rgba(196, 30, 30, 0.45);
          background: #fff;
          color: #8b1010;
          border-radius: 999px;
          padding: 0.28rem 0.6rem;
          font-size: 0.58rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          box-shadow: 0 6px 16px rgba(26, 16, 8, 0.16);
          transition: transform 180ms ease, border-color 180ms ease, background 180ms ease,
            color 180ms ease;
          cursor: pointer;
        }

        .juicy-map-marker:hover {
          transform: translateY(-1px);
          border-color: rgba(196, 30, 30, 0.75);
        }

        .juicy-map-marker.is-active {
          border-color: #c41e1e;
          background: #c41e1e;
          color: #fff;
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 10px 20px rgba(196, 30, 30, 0.35);
        }

        .maplibregl-canvas {
          border-radius: 1.35rem;
        }
      `}</style>
    </>
  );
}
