"use client";

import React, { useState, useEffect, useCallback } from "react";
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
} from "lucide-react";

interface Tip {
  icon: React.ReactNode;
  title: string;
  text: string;
  color: string; // tailwind ring / accent color class
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

  const showNextTip = useCallback(() => {
    if (dismissed) return;
    setExiting(false);
    setVisible(true);

    // Auto-hide after 7s
    const hideTimer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => {
        setVisible(false);
        setExiting(false);
        setCurrentTip((prev) => (prev + 1) % tips.length);
      }, 400);
    }, 7000);

    return () => clearTimeout(hideTimer);
  }, [dismissed]);

  useEffect(() => {
    // First tip appears after 4s
    const initialDelay = setTimeout(() => {
      showNextTip();
    }, 4000);

    return () => clearTimeout(initialDelay);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!visible && !dismissed) {
      // Next tip after 12s gap
      const nextTimer = setTimeout(() => {
        showNextTip();
      }, 12000);
      return () => clearTimeout(nextTimer);
    }
  }, [visible, dismissed, showNextTip]);

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

  if (!visible || dismissed) return null;

  const tip = tips[currentTip];

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 max-w-[320px] w-[calc(100vw-2rem)] transition-all duration-400 ${
        exiting
          ? "opacity-0 translate-y-4 scale-95"
          : "opacity-100 translate-y-0 scale-100"
      }`}
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

        {/* Content */}
        <div className="flex items-start gap-3 pr-6">
          <div
            className={`shrink-0 p-2 rounded-xl bg-white/[0.05] ${tip.color}`}
          >
            {tip.icon}
          </div>
          <div className="min-w-0">
            <p className={`text-xs font-bold uppercase tracking-wider ${tip.color} mb-1`}>
              {tip.title}
            </p>
            <p className="text-[13px] text-gray-300 leading-relaxed">
              {tip.text}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-white/[0.05]">
          <div className="flex gap-1">
            {tips.map((_, i) => (
              <div
                key={i}
                className={`w-1 h-1 rounded-full transition-colors ${
                  i === currentTip ? "bg-white/60" : "bg-white/10"
                }`}
              />
            ))}
          </div>
          <button
            onClick={handleDismissAll}
            className="text-[11px] text-gray-600 hover:text-gray-400 transition-colors"
          >
            Alle Tipps ausblenden
          </button>
        </div>
      </div>
    </div>
  );
}
