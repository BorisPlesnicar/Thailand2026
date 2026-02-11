"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  X,
  Lightbulb,
  Droplets,
  Pill,
  Sun,
  Banknote,
  Plug,
  ShieldAlert,
  Utensils,
  MapPin,
  Smartphone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Tip {
  icon: React.ReactNode;
  title: string;
  text: string;
  color: string;
}

const tips: Tip[] = [
  {
    icon: <Droplets className="w-4 h-4" />,
    title: "Wasser",
    text: "Kein Leitungswasser trinken! Immer Flaschen kaufen — auch zum Zähneputzen.",
    color: "text-cyan-400",
  },
  {
    icon: <Sun className="w-4 h-4" />,
    title: "Sonnenschutz",
    text: "LSF 50+ einpacken. Tropensonne ist extrem stark — auch bei Bewölkung.",
    color: "text-amber-400",
  },
  {
    icon: <Banknote className="w-4 h-4" />,
    title: "Geld",
    text: "1 € ≈ 37 THB. Am besten vor Ort am ATM abheben — Wechselstuben meiden.",
    color: "text-emerald-400",
  },
  {
    icon: <Pill className="w-4 h-4" />,
    title: "Reiseapotheke",
    text: "Durchfallmittel, Elektrolyte, Pflaster & Mückenspray nicht vergessen.",
    color: "text-rose-400",
  },
  {
    icon: <Plug className="w-4 h-4" />,
    title: "Strom",
    text: "Thailand nutzt Stecker-Typ A/B/C (220V). EU-Stecker passen oft — Adapter sicherheitshalber mitnehmen.",
    color: "text-violet-400",
  },
  {
    icon: <ShieldAlert className="w-4 h-4" />,
    title: "Versicherung",
    text: "Reiseschutz ist inkludiert. Versicherungsdocs als PDF am Handy griffbereit haben!",
    color: "text-emerald-400",
  },
  {
    icon: <Utensils className="w-4 h-4" />,
    title: "Street Food",
    text: "Street Food ist sicher wenn der Stand viel Kundschaft hat. Probiert Pad Thai & Mango Sticky Rice!",
    color: "text-orange-400",
  },
  {
    icon: <MapPin className="w-4 h-4" />,
    title: "Transport",
    text: "Roller mieten ist günstig (~200 THB/Tag). Internationaler Führerschein empfohlen!",
    color: "text-blue-400",
  },
  {
    icon: <Smartphone className="w-4 h-4" />,
    title: "SIM-Karte",
    text: "Am Flughafen eine Thai-SIM holen (AIS/DTAC). 15 Tage unlimited Data ab ~300 THB.",
    color: "text-pink-400",
  },
  {
    icon: <Lightbulb className="w-4 h-4" />,
    title: "Tempel-Etikette",
    text: "In Tempeln Schuhe ausziehen & Schultern/Knie bedecken. Zeigt Respekt!",
    color: "text-yellow-400",
  },
];

export default function TravelTips() {
  const [currentTip, setCurrentTip] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [paused, setPaused] = useState(false);
  const autoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Reset auto-advance timer
  const resetAutoTimer = useCallback(() => {
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    if (dismissed || !visible || paused) return;

    autoTimerRef.current = setTimeout(() => {
      goNext();
    }, 8000);
  }, [dismissed, visible, paused]); // eslint-disable-line react-hooks/exhaustive-deps

  // Navigate to next tip
  const goNext = useCallback(() => {
    setDirection("right");
    setCurrentTip((prev) => (prev + 1) % tips.length);
  }, []);

  // Navigate to previous tip
  const goPrev = useCallback(() => {
    setDirection("left");
    setCurrentTip((prev) => (prev - 1 + tips.length) % tips.length);
  }, []);

  // Jump to specific tip
  const goTo = useCallback((index: number) => {
    setDirection(index > currentTip ? "right" : "left");
    setCurrentTip(index);
  }, [currentTip]);

  // Show popup initially after 4s
  useEffect(() => {
    const initialDelay = setTimeout(() => {
      setVisible(true);
    }, 4000);
    return () => clearTimeout(initialDelay);
  }, []);

  // Auto-advance timer
  useEffect(() => {
    resetAutoTimer();
    return () => {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    };
  }, [currentTip, visible, dismissed, paused, resetAutoTimer]);

  // Keyboard navigation
  useEffect(() => {
    if (!visible || dismissed) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        goNext();
      } else if (e.key === "ArrowLeft") {
        goPrev();
      } else if (e.key === "Escape") {
        handleDismiss();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [visible, dismissed, goNext, goPrev]); // eslint-disable-line react-hooks/exhaustive-deps

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swiped left → next
        goNext();
      } else {
        // Swiped right → prev
        goPrev();
      }
    }
  };

  const handleDismiss = () => {
    setExiting(true);
    setTimeout(() => {
      setVisible(false);
      setExiting(false);
    }, 300);
  };

  const handleDismissAll = () => {
    setExiting(true);
    setTimeout(() => {
      setVisible(false);
      setExiting(false);
      setDismissed(true);
    }, 300);
  };

  const handleReopen = () => {
    setDismissed(false);
    setVisible(true);
  };

  // When dismissed: show small toggle button
  if (dismissed) {
    return (
      <button
        onClick={handleReopen}
        className="fixed bottom-4 right-4 z-50 p-3 rounded-full backdrop-blur-2xl bg-zinc-900/80 border border-white/[0.08] shadow-xl shadow-black/30 hover:bg-zinc-800/90 hover:scale-105 transition-all duration-300 group"
        aria-label="Reisetipps anzeigen"
      >
        <Lightbulb className="w-4 h-4 text-amber-400 group-hover:text-amber-300 transition-colors" />
      </button>
    );
  }

  if (!visible) return null;

  const tip = tips[currentTip];

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 max-w-[340px] w-[calc(100vw-2rem)] transition-all duration-400 ${
        exiting
          ? "opacity-0 translate-y-4 scale-95"
          : "opacity-100 translate-y-0 scale-100"
      }`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative backdrop-blur-2xl bg-zinc-900/90 border border-white/[0.08] rounded-2xl p-4 shadow-2xl shadow-black/40">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Schließen"
        >
          <X className="w-3.5 h-3.5 text-gray-500" />
        </button>

        {/* Content with slide animation via key */}
        <div
          key={currentTip}
          className={`flex items-start gap-3 pr-6 animate-fade-slide-in`}
          style={{
            // inline keyframe as fallback
            animation: `fadeSlide 0.3s ease-out`,
          }}
        >
          <div
            className={`shrink-0 p-2 rounded-xl bg-white/[0.05] ${tip.color}`}
          >
            {tip.icon}
          </div>
          <div className="min-w-0">
            <p
              className={`text-xs font-bold uppercase tracking-wider ${tip.color} mb-1`}
            >
              {tip.title}
            </p>
            <p className="text-[13px] text-gray-300 leading-relaxed">
              {tip.text}
            </p>
          </div>
        </div>

        {/* Footer with nav controls */}
        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-white/[0.05]">
          {/* Left/Right arrows + dots */}
          <div className="flex items-center gap-2">
            <button
              onClick={goPrev}
              className="p-1 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Vorheriger Tipp"
            >
              <ChevronLeft className="w-3.5 h-3.5 text-gray-500" />
            </button>

            <div className="flex gap-1">
              {tips.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    i === currentTip
                      ? "bg-white/70 scale-125"
                      : "bg-white/15 hover:bg-white/30"
                  }`}
                  aria-label={`Tipp ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              className="p-1 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Nächster Tipp"
            >
              <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
            </button>
          </div>

          {/* Counter + Dismiss */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-gray-600 font-mono">
              {currentTip + 1}/{tips.length}
            </span>
            <button
              onClick={handleDismissAll}
              className="text-[11px] text-gray-600 hover:text-gray-400 transition-colors"
            >
              Ausblenden
            </button>
          </div>
        </div>
      </div>

      {/* Inline keyframe for slide animation */}
      <style jsx>{`
        @keyframes fadeSlide {
          from {
            opacity: 0;
            transform: translateX(${direction === "right" ? "12px" : "-12px"});
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
