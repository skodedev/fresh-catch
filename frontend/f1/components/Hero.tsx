'use client';

import React from 'react';
import { I } from './icons';

export function Hero() {
  const v0Ref = React.useRef<HTMLVideoElement>(null);
  const v1Ref = React.useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = React.useState(true);
  const [muted, setMuted] = React.useState(true);
  const [shipProgress] = React.useState(72);
  const [activeIdx, setActiveIdx] = React.useState(0);

  const clips = React.useMemo(() => [
    { src: '/assets/hero.mp4', start: 0 },
    { src: '/assets/hero2.mp4', start: 0 },
  ], []);

  React.useEffect(() => {
    [v0Ref, v1Ref].forEach((ref, i) => {
      const v = ref.current; if (!v) return;
      const onMeta = () => { try { v.currentTime = clips[i].start; } catch { /* noop */ } };
      if (v.readyState >= 1) onMeta();
      else v.addEventListener('loadedmetadata', onMeta, { once: true });
    });
  }, [clips]);

  React.useEffect(() => {
    const refs = [v0Ref, v1Ref];
    refs.forEach((ref, i) => {
      const v = ref.current; if (!v) return;
      if (i === activeIdx) {
        try { v.currentTime = clips[i].start; } catch { /* noop */ }
        const p = v.play(); if (p && p.catch) p.catch(() => { /* noop */ });
      } else {
        v.pause();
        try { v.currentTime = clips[i].start; } catch { /* noop */ }
      }
    });
  }, [activeIdx, clips]);

  const handleEnded = (i: number) => () => {
    if (i !== activeIdx) return;
    setActiveIdx((activeIdx + 1) % clips.length);
  };
  const togglePlay = () => {
    const v = (activeIdx === 0 ? v0Ref : v1Ref).current; if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
  };
  const toggleMute = () => {
    [v0Ref, v1Ref].forEach(r => { if (r.current) r.current.muted = !muted; });
    setMuted(!muted);
  };

  return (
    <section className="hero">
      <video
        ref={v0Ref}
        className="hero-video"
        src={clips[0].src}
        autoPlay muted playsInline preload="auto"
        onEnded={handleEnded(0)}
        style={{ opacity: activeIdx === 0 ? 1 : 0, transition: 'opacity 0.6s ease' }}
      />
      <video
        ref={v1Ref}
        className="hero-video"
        src={clips[1].src}
        muted playsInline preload="auto"
        onEnded={handleEnded(1)}
        style={{ opacity: activeIdx === 1 ? 1 : 0, transition: 'opacity 0.6s ease' }}
      />
      <div className="hero-scrim" />

      <div className="shipping-bar">
        <I.Truck size={14} />
        <span>Free shipping over <b>AED 200</b></span>
        <div className="track"><div className="fill" style={{ width: shipProgress + '%' }} /></div>
        <span>{shipProgress}%</span>
      </div>

      <div className="hero-inner">
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="pulse" />
            Daily catch arriving from the docks
          </div>
          <h1 className="hero-title">
            From the sea<br />to your table,<br /><em>overnight.</em>
          </h1>
          <p className="hero-sub">
            Hand-selected seafood from sustainable fisheries — prepped the way you like, delivered ice-cold across the UAE the next morning.
          </p>
          <div className="hero-cta-row">
            <a className="btn btn-primary" href="#shop">
              Shop today&apos;s catch
              <I.ArrowRight size={16} />
            </a>
            <a className="btn btn-ghost" href="#story">Our story</a>
          </div>
          <div className="hero-trust">
            <span className="pill"><I.Star size={14} /><span>4.9 · 12k reviews</span></span>
            <span className="pill"><I.Truck size={14} /><span>Next-day delivery</span></span>
            <span className="pill"><I.Shield size={14} /><span>Freshness guarantee</span></span>
          </div>
        </div>
      </div>

      <div className="video-ctrl">
        <button onClick={togglePlay} aria-label="Play/pause">{playing ? <I.Pause /> : <I.Play />}</button>
        <button onClick={toggleMute} aria-label="Mute/unmute">{muted ? <I.VolumeOff /> : <I.Volume />}</button>
      </div>
    </section>
  );
}
