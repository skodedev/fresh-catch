'use client';

import React from 'react';
import { useStore } from '@/lib/store';
import { I } from './icons';

const EMIRATES = [
  { name: 'Dubai', sub: 'Same-day · 2hr slots' },
  { name: 'Abu Dhabi', sub: 'Next-day delivery' },
  { name: 'Sharjah', sub: 'Same-day · evening' },
  { name: 'Ajman', sub: 'Next-day delivery' },
  { name: 'Umm Al Quwain', sub: 'Next-day delivery' },
  { name: 'Ras Al Khaimah', sub: 'Next-day delivery' },
  { name: 'Fujairah', sub: 'Next-day delivery' },
];
const CENTERS = [
  { name: 'Dubai', lat: 25.2048, lng: 55.2708 },
  { name: 'Abu Dhabi', lat: 24.4539, lng: 54.3773 },
  { name: 'Sharjah', lat: 25.3463, lng: 55.4209 },
  { name: 'Ajman', lat: 25.4052, lng: 55.5136 },
  { name: 'Umm Al Quwain', lat: 25.5644, lng: 55.5526 },
  { name: 'Ras Al Khaimah', lat: 25.7895, lng: 55.9432 },
  { name: 'Fujairah', lat: 25.1288, lng: 56.3265 },
];

export function LocationModal() {
  const { city, setCity } = useStore();
  const [locating, setLocating] = React.useState(false);
  const [locError, setLocError] = React.useState<string | null>(null);

  const handleLocate = () => {
    setLocError(null);
    if (!navigator.geolocation) { setLocError("Your browser doesn't support location."); return; }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        let best = CENTERS[0], bestD = Infinity;
        for (const c of CENTERS) {
          const dx = c.lat - latitude, dy = c.lng - longitude;
          const d = dx * dx + dy * dy;
          if (d < bestD) { bestD = d; best = c; }
        }
        setLocating(false);
        setCity(best.name);
      },
      (err) => {
        setLocating(false);
        setLocError(err.code === 1 ? 'Location permission denied. Pick your emirate below.' : "Couldn't get your location. Pick your emirate below.");
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 60000 }
    );
  };

  React.useEffect(() => {
    if (!city) document.body.classList.add('locked');
    else document.body.classList.remove('locked');
    return () => document.body.classList.remove('locked');
  }, [city]);

  if (city) return null;

  return (
    <div className="loc-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="loc-modal-title">
      <div className="loc-modal">
        <div className="loc-modal-head">
          <h2 id="loc-modal-title">Where should we deliver?</h2>
          <p>Pick your emirate to see today&apos;s stock and your fastest slot.</p>
        </div>
        <div className="loc-modal-locate">
          <button className="loc-modal-locate-btn" onClick={handleLocate} disabled={locating}>
            {locating ? <span className="loc-spinner" /> : <I.Crosshair size={15} />}
            <span>{locating ? 'Finding you…' : 'Use my current location'}</span>
          </button>
          {locError && <div className="loc-modal-error">{locError}</div>}
        </div>
        <div className="loc-modal-grid">
          {EMIRATES.map(e => (
            <button key={e.name} className="loc-modal-item" onClick={() => setCity(e.name)}>
              <div className="loc-modal-item-text">
                <span className="loc-modal-item-name">{e.name}</span>
                <span className="loc-modal-item-sub">{e.sub}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
