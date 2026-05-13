"use client";

import { useEffect, useRef } from 'react';

export default function HeroMesh({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty('--mx', `${x}px`);
      el.style.setProperty('--my', `${y}px`);
    };

    const handleLeave = () => {
      el.style.setProperty('--mx', `-9999px`);
      el.style.setProperty('--my', `-9999px`);
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerleave', handleLeave);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerleave', handleLeave);
    };
  }, []);

  return (
    <div ref={ref} className={`cursor-reveal-container ${className}`} aria-hidden>
      <div className="cursor-reveal-mesh mesh-background" />
    </div>
  );
}
