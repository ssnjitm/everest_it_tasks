import React, { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { useAppStore } from '../store/useAppStore';
import type { RegionData } from '../types';
import 'leaflet/dist/leaflet.css';

// Component to handle auto-panning
const MapController = ({ activePoint }: { activePoint?: RegionData }) => {
  const map = useMap();
  useEffect(() => {
    if (activePoint) {
      map.flyTo([activePoint.lat, activePoint.lng], 7, { duration: 1.5 });
    }
  }, [activePoint, map]);
  return null;
};

const TrafficMap: React.FC<{ data: RegionData[] }> = ({ data }) => {
  const selectedRegion = useAppStore((state) => state.selectedRegion);
  const activeData = data.find((d) => d.name === selectedRegion);

  return (
    <div className="h-full w-full bg-slate-100">
      <MapContainer center={[35.8617, 104.1954]} zoom={4} className="h-full w-full" zoomControl={false}>
        <TileLayer 
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />
        
        {data.map((p) => (
          <CircleMarker
            key={p.name}
            center={[p.lat, p.lng]}
            radius={selectedRegion === p.name ? 18 : Math.max(6, Math.log(p.count) * 10)}
            pathOptions={{
              fillColor: selectedRegion === p.name ? '#4f46e5' : '#ef4444',
              color: selectedRegion === p.name ? '#ffffff' : '#b91c1c',
              weight: selectedRegion === p.name ? 3 : 1,
              fillOpacity: 0.7,
            }}
          >
            <Popup className="custom-popup">
              <div className="p-1">
                <p className="font-bold text-slate-900">{p.name}</p>
                <p className="text-xs text-slate-500">Frequency: {p.count} hits</p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
        <MapController activePoint={activeData} />
      </MapContainer>
    </div>
  );
};

export default TrafficMap;