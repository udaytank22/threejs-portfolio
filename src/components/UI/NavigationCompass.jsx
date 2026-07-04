import React, { useEffect, useRef } from 'react';
import { useStore } from '../../store/useStore';

/* Island world positions [x, z] — must match WorldMap.jsx */
const ISLANDS = [
  { stopIndex: 1, x: -60, z: -60,  label: 'Meet Manifest',     color: '#38bdf8', tag: '01' },
  { stopIndex: 2, x:  65, z: -90,  label: 'Trading Is Broken', color: '#f97316', tag: '02' },
  { stopIndex: 3, x: -90, z: -150, label: 'The Platform',      color: '#a855f7', tag: '03' },
  { stopIndex: 4, x:  80, z: -200, label: 'Proven ROI',        color: '#22c55e', tag: '04' },
  { stopIndex: 9, x:   0, z: -300, label: 'Manifest HQ',       color: '#eab308', tag: 'HQ' },
];

const R   = 54;   // compass ring radius
const CX  = R + 16; // SVG center X
const CY  = R + 16; // SVG center Y
const SZ  = (R + 16) * 2; // SVG total size

/**
 * Compute bearing of an island relative to the ship's forward direction.
 * Returns angle in radians: 0 = straight ahead, ±π = directly behind.
 * Positive = clockwise (right), Negative = counter-clockwise (left).
 */
function bearing(sx, sz, ix, iz, shipRot) {
  const dx = ix - sx;
  const dz = iz - sz;
  // World angle from -Z axis (ship's default forward = -Z)
  const worldAngle = Math.atan2(dx, -dz);
  // Make relative to ship rotation
  return worldAngle - shipRot;
}

/** Format distance nicely — always in metres */
function fmtDist(d) {
  if (d < 18) return 'DOCKED';
  // Scale: 1 Three.js unit ≈ 1.5m, round to nearest 10m
  const metres = Math.round((d * 1.5) / 10) * 10;
  return `${metres}m`;
}

/* ─── Compass SVG (updated imperatively every frame via ref) ── */
function CompassSVG({ compassRef }) {
  return (
    <svg
      ref={compassRef}
      width={SZ}
      height={SZ}
      style={{ display: 'block', overflow: 'visible' }}
      viewBox={`0 0 ${SZ} ${SZ}`}
    >
      {/* Outer ring */}
      <circle cx={CX} cy={CY} r={R} fill="rgba(6,10,26,0.78)"
        stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />

      {/* Tick marks every 45° */}
      {[0,45,90,135,180,225,270,315].map(deg => {
        const a = deg * Math.PI / 180;
        const inner = R - 6;
        const outer = R;
        return (
          <line key={deg}
            x1={CX + Math.sin(a)*inner} y1={CY - Math.cos(a)*inner}
            x2={CX + Math.sin(a)*outer} y2={CY - Math.cos(a)*outer}
            stroke="rgba(255,255,255,0.2)" strokeWidth={deg % 90 === 0 ? 1.5 : 0.8}
          />
        );
      })}

      {/* Cardinal labels */}
      {[['N',0],['E',90],['S',180],['W',270]].map(([lbl, deg]) => {
        const a = deg * Math.PI / 180;
        const r2 = R - 13;
        return (
          <text key={lbl}
            x={CX + Math.sin(a)*r2} y={CY - Math.cos(a)*r2 + 3.5}
            textAnchor="middle" fill={deg===0 ? '#f87171' : 'rgba(255,255,255,0.4)'}
            fontSize="9" fontFamily="monospace" fontWeight="700"
          >{lbl}</text>
        );
      })}

      {/* Cross-hair lines */}
      <line x1={CX} y1={CY-R+2} x2={CX} y2={CY+R-2}
        stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      <line x1={CX-R+2} y1={CY} x2={CX+R-2} y2={CY}
        stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

      {/* Island dots — rendered as a group we'll update imperatively */}
      <g id="island-dots" />

      {/* Ship indicator (always at center, always pointing up) */}
      <polygon
        points={`${CX},${CY-11} ${CX-6},${CY+7} ${CX},${CY+3} ${CX+6},${CY+7}`}
        fill="#60a5fa" opacity="0.95"
      />
      <circle cx={CX} cy={CY} r="2.5" fill="#93c5fd" />
    </svg>
  );
}

/* ─── Main Component ──────────────────────────────────────────── */
export default function NavigationCompass() {
  const compassRef = useRef(null);
  const listRef    = useRef(null);
  const speedRef   = useRef(null);

  /**
   * Update the compass every frame using RAF + direct DOM writes
   * instead of React re-renders, so we avoid 60fps React renders.
   */
  useEffect(() => {
    let rafId;

    function tick() {
      const state = useStore.getState();
      if (!state.started) { rafId = requestAnimationFrame(tick); return; }

      const [sx, , sz] = state.shipPosition;
      const shipRot    = state.shipRotation;
      const current    = state.currentStop;

      /* ── Update compass SVG dots ── */
      const dotsGroup = compassRef.current?.getElementById?.('island-dots')
        ?? compassRef.current?.querySelector('#island-dots');

      if (dotsGroup) {
        // Remove old children
        while (dotsGroup.firstChild) dotsGroup.removeChild(dotsGroup.firstChild);

        ISLANDS.forEach(island => {
          const b   = bearing(sx, sz, island.x, island.z, shipRot);
          const dotX = CX + Math.sin(b) * R;
          const dotY = CY - Math.cos(b) * R;
          const isActive = current === island.stopIndex;
          const dist = Math.hypot(island.x - sx, island.z - sz);
          const isNear = dist < 25;

          // Pulse ring
          if (isActive || isNear) {
            const ring = document.createElementNS('http://www.w3.org/2000/svg','circle');
            ring.setAttribute('cx', dotX);
            ring.setAttribute('cy', dotY);
            ring.setAttribute('r', isActive ? '11' : '8');
            ring.setAttribute('fill', 'none');
            ring.setAttribute('stroke', island.color);
            ring.setAttribute('stroke-width', '1');
            ring.setAttribute('opacity', '0.45');
            dotsGroup.appendChild(ring);
          }

          // Main dot
          const circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
          circle.setAttribute('cx', dotX);
          circle.setAttribute('cy', dotY);
          circle.setAttribute('r', isActive ? '7' : '5');
          circle.setAttribute('fill', island.color);
          circle.setAttribute('opacity', isActive ? '1' : '0.72');
          if (isActive) {
            circle.setAttribute('stroke', '#fff');
            circle.setAttribute('stroke-width', '1.5');
          }
          dotsGroup.appendChild(circle);

          // Tag text
          const text = document.createElementNS('http://www.w3.org/2000/svg','text');
          text.setAttribute('x', dotX);
          text.setAttribute('y', dotY + 3.5);
          text.setAttribute('text-anchor', 'middle');
          text.setAttribute('fill', '#fff');
          text.setAttribute('font-size', '6');
          text.setAttribute('font-family', 'monospace');
          text.setAttribute('font-weight', 'bold');
          text.textContent = island.tag;
          dotsGroup.appendChild(text);
        });
      }

      /* ── Update island list rows ── */
      const rows = listRef.current?.querySelectorAll('[data-stop]');
      if (rows) {
        rows.forEach(row => {
          const idx    = Number(row.dataset.stop);
          const island = ISLANDS.find(i => i.stopIndex === idx);
          if (!island) return;

          const b       = bearing(sx, sz, island.x, island.z, shipRot);
          const deg     = b * (180 / Math.PI);
          const dist    = Math.hypot(island.x - sx, island.z - sz);
          const isActive = current === idx;

          const arrow = row.querySelector('[data-arrow]');
          const distEl = row.querySelector('[data-dist]');
          const nameEl = row.querySelector('[data-name]');

          if (arrow)  arrow.style.transform  = `rotate(${deg}deg)`;
          if (distEl) distEl.textContent      = fmtDist(dist);
          if (distEl) distEl.style.color      = isActive ? island.color : 'rgba(100,116,139,0.8)';
          if (nameEl) nameEl.style.fontWeight = isActive ? '700' : '400';
          if (nameEl) nameEl.style.color      = isActive ? '#fff' : 'rgba(203,213,225,0.75)';
          row.style.opacity = isActive ? '1' : '0.65';
        });
      }

      /* ── Update Speedometer ── */
      if (speedRef.current) {
        // scale Three.js velocity units to realistic-looking knots (KTS)
        const kts = (state.shipSpeed * 1.2).toFixed(1);
        speedRef.current.textContent = `${kts} KTS`;
      }

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '24px',
        left: '24px',
        zIndex: 100,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '10px',
      }}
    >
      {/* ── Compass rose ── */}
      <div style={{
        background: 'rgba(6,10,26,0.5)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        padding: '0',
        overflow: 'visible',
      }}>
        <CompassSVG compassRef={compassRef} />
      </div>
      
      {/* ── Speedometer ── */}
      <div style={{
        background: 'rgba(6,10,26,0.82)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '14px',
        padding: '6px 14px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '210px',
        color: '#38bdf8',
        fontFamily: 'monospace',
        fontWeight: 'bold',
        fontSize: '12px',
        letterSpacing: '1px'
      }}>
        SPEED <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 8px' }}>—</span> <span ref={speedRef}>0.0 KTS</span>
      </div>

      {/* ── Island direction list ── */}
      <div
        ref={listRef}
        style={{
          background: 'rgba(6,10,26,0.82)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '14px',
          padding: '10px 14px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          display: 'flex',
          flexDirection: 'column',
          gap: '7px',
          minWidth: '210px',
        }}
      >
        {/* Header */}
        <div style={{
          fontSize: '8.5px', fontWeight: 700, letterSpacing: '2.5px',
          color: 'rgba(148,163,184,0.55)', fontFamily: 'monospace',
          paddingBottom: '5px', borderBottom: '1px solid rgba(255,255,255,0.07)',
          marginBottom: '1px',
        }}>
          ⬆ NAVIGATION · SAIL TO EXPLORE
        </div>

        {/* One row per island */}
        {ISLANDS.map(island => (
          <div
            key={island.stopIndex}
            data-stop={island.stopIndex}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              opacity: '0.65', transition: 'opacity 0.25s',
            }}
          >
            {/* Color tag */}
            <div style={{
              width: '26px', height: '16px', borderRadius: '4px', flexShrink: 0,
              background: `${island.color}1c`,
              border: `1px solid ${island.color}55`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '7px', fontWeight: 800, color: island.color, fontFamily: 'monospace',
            }}>
              {island.tag}
            </div>

            {/* Name */}
            <span
              data-name
              style={{
                fontSize: '11px', color: 'rgba(203,213,225,0.75)',
                flex: 1, fontFamily: 'system-ui', overflow: 'hidden',
                whiteSpace: 'nowrap', textOverflow: 'ellipsis',
              }}
            >
              {island.label}
            </span>

            {/* Directional arrow */}
            <span
              data-arrow
              style={{
                display: 'inline-block',
                fontSize: '15px',
                color: island.color,
                lineHeight: 1,
                flexShrink: 0,
                transformOrigin: 'center',
                transition: 'transform 0.1s ease',
              }}
            >
              ↑
            </span>

            {/* Distance */}
            <span
              data-dist
              style={{
                fontSize: '10px', fontFamily: 'monospace',
                flexShrink: 0, minWidth: '42px', textAlign: 'right',
                color: 'rgba(100,116,139,0.8)',
              }}
            >
              —
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
