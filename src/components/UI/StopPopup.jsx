import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '../../store/useStore';

/* ─── Full company narrative content ─────────────────────────── */
const STOPS = {
  1: {
    icon: '🚢',
    tag: 'WELCOME',
    title: 'Meet Manifest',
    tagline: 'The AI Operating System for Global Trading',
    color: '#38bdf8',
    glow: 'rgba(56,189,248,0.3)',
    sections: [
      {
        type: 'intro',
        text: 'Manifest is the world\'s first AI-native operating system built exclusively for global trading companies — freight forwarders, trading houses, and supply chain operators.',
      },
      {
        type: 'bullets',
        heading: 'What we do',
        items: [
          'Automate the entire trade workflow end-to-end',
          'Turn raw emails into structured business data in seconds',
          'Connect buyers, suppliers & logistics in one platform',
          'Give every team member real-time visibility across all orders',
        ],
      },
      {
        type: 'stats',
        items: [
          { value: '500+', label: 'Trading Companies' },
          { value: '40%', label: 'Faster Workflows' },
          { value: '$2M+', label: 'Errors Prevented' },
        ],
      },
      {
        type: 'quote',
        text: '"The only platform that understands the complexity of global trade."',
        author: '— Head of Operations, OM Ship Supplies',
      },
    ],
  },

  2: {
    icon: '⚡',
    tag: 'THE PROBLEM',
    title: 'Trading Is Still Broken',
    tagline: 'Legacy tools are killing your margins',
    color: '#f97316',
    glow: 'rgba(249,115,22,0.3)',
    sections: [
      {
        type: 'intro',
        text: 'Global trading teams lose 60% of their day to manual data entry, email chaos, and disconnected spreadsheets. Every mistake costs thousands.',
      },
      {
        type: 'bullets',
        heading: 'The pain your team faces today',
        items: [
          '📥  Hundreds of inquiry emails parsed manually every day',
          '📊  Quotations built in Excel, prone to pricing errors',
          '📦  Purchase orders tracked across 10 different tools',
          '🔄  No single source of truth — data lives in silos',
          '⏳  Days wasted chasing status updates via WhatsApp',
          '💸  Lost deals due to slow response times',
        ],
      },
      {
        type: 'stats',
        items: [
          { value: '6 hrs', label: 'Lost per day/person' },
          { value: '23%', label: 'Deals lost to delays' },
          { value: '4.2×', label: 'More errors manually' },
        ],
      },
    ],
  },

  3: {
    icon: '🤖',
    tag: 'THE PLATFORM',
    title: 'One Platform, Everything',
    tagline: 'Six AI-powered modules. One seamless workflow.',
    color: '#a855f7',
    glow: 'rgba(168,85,247,0.3)',
    sections: [
      {
        type: 'intro',
        text: 'Manifest replaces your entire patchwork of tools with one intelligent operating system — from the first email to the final delivery.',
      },
      {
        type: 'features',
        items: [
          { icon: '📧', name: 'AI Email Parser', desc: 'Converts supplier emails into structured inquiries automatically' },
          { icon: '📋', name: 'Inquiry Hub', desc: 'Unified dashboard to track, assign, and prioritize all inquiries' },
          { icon: '💰', name: 'Smart Quotation', desc: 'Auto-generate accurate quotes from your rate cards in one click' },
          { icon: '📦', name: 'Purchase Orders', desc: 'Create, track and manage POs with full warehouse visibility' },
          { icon: '🚢', name: 'Shipment Tracker', desc: 'Real-time tracking of every shipment across all carriers' },
          { icon: '📊', name: 'Finance & Reports', desc: 'P&L, margins, and trade analytics — always up to date' },
        ],
      },
    ],
  },

  4: {
    icon: '📈',
    tag: 'RESULTS',
    title: 'Proven ROI',
    tagline: 'Real results from real trading companies',
    color: '#22c55e',
    glow: 'rgba(34,197,94,0.3)',
    sections: [
      {
        type: 'intro',
        text: 'Companies on Manifest see measurable impact within the first 30 days — less manual work, faster deals, and fewer costly errors.',
      },
      {
        type: 'stats',
        items: [
          { value: '10×', label: 'Faster Quotation' },
          { value: '85%', label: 'Less Manual Entry' },
          { value: '3 days', label: 'Time to Onboard' },
        ],
      },
      {
        type: 'bullets',
        heading: 'What customers say',
        items: [
          '"We went from 4 hours to 20 minutes per inquiry cycle."',
          '"Our error rate on POs dropped to near zero."',
          '"For the first time, the whole team sees the same data."',
          '"Manifest paid for itself in the first month."',
        ],
      },
      {
        type: 'badges',
        items: ['G2 Leader 2025', 'ISO 27001 Certified', 'SOC 2 Type II', 'GDPR Compliant'],
      },
    ],
  },

  9: {
    icon: '🏢',
    tag: 'MANIFEST HQ · GET STARTED',
    title: 'Ready to Transform?',
    tagline: 'Join 500+ global trading companies on Manifest',
    color: '#eab308',
    glow: 'rgba(234,179,8,0.3)',
    sections: [
      {
        type: 'intro',
        text: 'Start your journey with a free 14-day trial or book a personalised demo with our trade operations experts.',
      },
      {
        type: 'pricing',
        items: [
          { plan: 'Starter', price: '$299', period: '/mo', desc: 'Up to 5 users · Email Parser + Inquiry Hub' },
          { plan: 'Growth', price: '$799', period: '/mo', desc: 'Up to 20 users · All 6 modules included', highlight: true },
          { plan: 'Enterprise', price: 'Custom', period: '', desc: 'Unlimited users · Dedicated success manager' },
        ],
      },
      {
        type: 'bullets',
        heading: 'Every plan includes',
        items: [
          '✓  Free onboarding & data migration',
          '✓  24/7 priority support',
          '✓  SOC 2 & GDPR compliant security',
          '✓  API access & integrations',
        ],
      },
      {
        type: 'cta',
        primary: '🚀  Book a Free Demo',
        secondary: 'hello@manifest.ai  ·  +1 800 MANIFEST',
      },
    ],
  },
};

/* ─── Section renderers ───────────────────────────────────────── */
function Intro({ text, color }) {
  return (
    <p style={{ margin: '0 0 16px', fontSize: '13.5px', lineHeight: 1.7, color: 'rgba(203,213,225,0.92)' }}>
      {text}
    </p>
  );
}

function Bullets({ heading, items, color }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      {heading && (
        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color, marginBottom: '8px', fontFamily: 'monospace' }}>
          {heading.toUpperCase()}
        </div>
      )}
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {items.map((item, i) => (
          <li key={i} style={{ fontSize: '12.5px', lineHeight: 1.5, color: 'rgba(203,213,225,0.85)', paddingLeft: '12px', position: 'relative' }}>
            <span style={{ position: 'absolute', left: 0, color, opacity: 0.7 }}>›</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Stats({ items, color }) {
  return (
    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
      {items.map((s, i) => (
        <div key={i} style={{
          flex: 1, textAlign: 'center', padding: '10px 4px',
          background: `${color}11`, border: `1px solid ${color}33`, borderRadius: '10px',
        }}>
          <div style={{ fontSize: '18px', fontWeight: 800, color, fontFamily: "'Space Grotesk', monospace", lineHeight: 1 }}>
            {s.value}
          </div>
          <div style={{ fontSize: '10px', color: 'rgba(148,163,184,0.8)', marginTop: '4px', letterSpacing: '0.5px' }}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function Features({ items, color }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
      {items.map((f, i) => (
        <div key={i} style={{
          padding: '10px 12px', background: `${color}0d`,
          border: `1px solid ${color}2a`, borderRadius: '10px',
        }}>
          <div style={{ fontSize: '18px', marginBottom: '4px' }}>{f.icon}</div>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#fff', marginBottom: '3px' }}>{f.name}</div>
          <div style={{ fontSize: '10.5px', color: 'rgba(148,163,184,0.8)', lineHeight: 1.4 }}>{f.desc}</div>
        </div>
      ))}
    </div>
  );
}

function Pricing({ items, color }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
      {items.map((p, i) => (
        <div key={i} style={{
          padding: '12px 14px', borderRadius: '10px',
          background: p.highlight ? `${color}1a` : 'rgba(255,255,255,0.04)',
          border: `1px solid ${p.highlight ? color : 'rgba(255,255,255,0.1)'}`,
          display: 'flex', alignItems: 'center', gap: '12px',
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: p.highlight ? color : '#fff', marginBottom: '2px' }}>
              {p.plan} {p.highlight && <span style={{ fontSize: '9px', background: color, color: '#000', borderRadius: '4px', padding: '1px 5px', marginLeft: '4px' }}>POPULAR</span>}
            </div>
            <div style={{ fontSize: '10.5px', color: 'rgba(148,163,184,0.75)' }}>{p.desc}</div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <span style={{ fontSize: '16px', fontWeight: 800, color: p.highlight ? color : '#fff' }}>{p.price}</span>
            <span style={{ fontSize: '10px', color: 'rgba(148,163,184,0.7)' }}>{p.period}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function Quote({ text, author, color }) {
  return (
    <div style={{
      padding: '12px 14px', borderLeft: `3px solid ${color}`,
      background: `${color}0d`, borderRadius: '0 10px 10px 0',
      marginBottom: '16px',
    }}>
      <p style={{ margin: '0 0 4px', fontSize: '12.5px', fontStyle: 'italic', color: 'rgba(203,213,225,0.9)', lineHeight: 1.5 }}>{text}</p>
      <span style={{ fontSize: '10px', color, fontWeight: 600 }}>{author}</span>
    </div>
  );
}

function Badges({ items, color }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
      {items.map((b, i) => (
        <span key={i} style={{
          fontSize: '10px', fontWeight: 600, padding: '4px 10px',
          background: `${color}18`, border: `1px solid ${color}44`,
          borderRadius: '20px', color,
        }}>{b}</span>
      ))}
    </div>
  );
}

function Cta({ primary, secondary, color }) {
  return (
    <div style={{ marginTop: '4px' }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '12px', borderRadius: '10px',
        background: `linear-gradient(135deg, ${color}cc, ${color}88)`,
        fontSize: '13px', fontWeight: 700, color: '#000',
        letterSpacing: '0.3px', marginBottom: '10px',
        boxShadow: `0 4px 20px ${color}55`,
      }}>
        {primary}
      </div>
      <div style={{ textAlign: 'center', fontSize: '10.5px', color: 'rgba(148,163,184,0.7)', letterSpacing: '0.3px' }}>
        {secondary}
      </div>
    </div>
  );
}

function renderSection(section, color, index) {
  switch (section.type) {
    case 'intro': return <Intro key={index} text={section.text} color={color} />;
    case 'bullets': return <Bullets key={index} heading={section.heading} items={section.items} color={color} />;
    case 'stats': return <Stats key={index} items={section.items} color={color} />;
    case 'features': return <Features key={index} items={section.items} color={color} />;
    case 'pricing': return <Pricing key={index} items={section.items} color={color} />;
    case 'quote': return <Quote key={index} text={section.text} author={section.author} color={color} />;
    case 'badges': return <Badges key={index} items={section.items} color={color} />;
    case 'cta': return <Cta key={index} primary={section.primary} secondary={section.secondary} color={color} />;
    default: return null;
  }
}

/* ─── Main Component ─────────────────────────────────────────── */
export default function StopPopup() {
  const currentStop = useStore((state) => state.currentStop);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (currentStop !== -1 && STOPS[currentStop]) {
      setData(STOPS[currentStop]);
      setMounted(true);
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    } else {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 400);
      return () => clearTimeout(t);
    }
  }, [currentStop]);

  if (!mounted || !data) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        right: '20px',
        transform: `translateY(-50%) translateX(${visible ? '0' : '40px'})`,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)',
        zIndex: 100,
        pointerEvents: 'none',
        width: '360px',
        maxWidth: 'calc(50vw - 24px)',
        height: '95vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', inset: '-24px', borderRadius: '36px',
        background: `radial-gradient(ellipse at center, ${data.glow} 0%, transparent 70%)`,
        filter: 'blur(16px)', pointerEvents: 'none',
      }} />

      {/* Card */}
      <div style={{
        position: 'relative', display: 'flex', flexDirection: 'column',
        background: 'rgba(6, 10, 26, 0.88)',
        backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
        border: `1px solid ${data.color}40`,
        borderRadius: '20px',
        boxShadow: `0 0 0 1px ${data.color}18, 0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)`,
        overflow: 'hidden',
        flex: 1,
        minHeight: 0,
        pointerEvents: 'auto',
      }}>
        {/* Shimmer accent */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          background: `linear-gradient(90deg, transparent 0%, ${data.color} 50%, transparent 100%)`,
          backgroundSize: '200% auto', animation: 'shimmer 2.5s linear infinite',
        }} />

        {/* ── HEADER (fixed) ── */}
        <div style={{ padding: '22px 24px 16px', flexShrink: 0, borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            {/* Icon */}
            <div style={{
              width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
              background: `${data.color}1e`, border: `1px solid ${data.color}44`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px',
            }}>
              {data.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: '9.5px', fontWeight: 700, letterSpacing: '2.5px',
                color: data.color, fontFamily: 'monospace', marginBottom: '4px',
              }}>
                {data.tag}
              </div>
              <h2 style={{
                margin: '0 0 2px', fontSize: '18px', fontWeight: 800, color: '#fff',
                letterSpacing: '-0.4px', fontFamily: "'Space Grotesk', system-ui, sans-serif", lineHeight: 1.15,
              }}>
                {data.title}
              </h2>
              <p style={{
                margin: 0, fontSize: '11.5px', color: `${data.color}cc`,
                fontStyle: 'italic', lineHeight: 1.3,
              }}>
                {data.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* ── SCROLLABLE BODY ── */}
        <div
          ref={scrollRef}
          style={{
            overflowY: 'scroll',
            padding: '18px 24px 20px',
            flex: '1 1 0',
            minHeight: 0,
            scrollbarWidth: 'thin',
            scrollbarColor: `${data.color}66 rgba(255,255,255,0.05)`,
            pointerEvents: 'auto',
          }}
        >
          {data.sections.map((section, i) => renderSection(section, data.color, i))}
        </div>

        {/* ── FOOTER (fixed) ── */}
        <div style={{
          padding: '10px 24px 14px', flexShrink: 0,
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          <div style={{
            width: '7px', height: '7px', borderRadius: '50%',
            background: data.color, boxShadow: `0 0 8px ${data.color}`,
            animation: 'pulse 1.6s ease-in-out infinite',
          }} />
          <span style={{ fontSize: '10px', color: 'rgba(100,116,139,0.9)', fontFamily: 'monospace', letterSpacing: '1px' }}>
            DOCKED · LIGHTHOUSE REACHED · SAIL AWAY TO CONTINUE
          </span>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.75); }
        }
      `}</style>
    </div>
  );
}
