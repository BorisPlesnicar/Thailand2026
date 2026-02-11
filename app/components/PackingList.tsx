"use client";

import { useState, useEffect } from "react";
import {
  Check,
  Luggage,
  Shirt,
  Pill,
  Zap,
  FileText,
  Sun,
  ChevronDown,
} from "lucide-react";

interface PackItem {
  id: string;
  label: string;
  essential?: boolean;
}

interface PackCategory {
  title: string;
  icon: React.ReactNode;
  color: string;
  items: PackItem[];
}

const categories: PackCategory[] = [
  {
    title: "Dokumente",
    icon: <FileText className="w-4 h-4" />,
    color: "text-blue-400",
    items: [
      { id: "reisepass", label: "Reisepass (mind. 6 Monate gültig!)", essential: true },
      { id: "kopie-reisepass", label: "Kopie Reisepass (digital & Papier)" },
      { id: "flugtickets", label: "Flugtickets / Buchungsbestätigung", essential: true },
      { id: "airbnb", label: "Airbnb-Buchungsbestätigung" },
      { id: "versicherung", label: "Versicherungsdokumente (PDF am Handy)", essential: true },
      { id: "kreditkarte", label: "Kreditkarte / Bankkarte" },
      { id: "fuehrerschein", label: "Internationaler Führerschein (falls Roller)" },
      { id: "notfallnummern", label: "Notfallnummern ausgedruckt" },
    ],
  },
  {
    title: "Kleidung",
    icon: <Shirt className="w-4 h-4" />,
    color: "text-violet-400",
    items: [
      { id: "shorts", label: "Shorts / kurze Hosen (5-6×)" },
      { id: "tshirts", label: "T-Shirts / Tops (6-7×)" },
      { id: "badehose", label: "Badehose / Bikini (2×)" },
      { id: "flipflops", label: "Flip-Flops / Sandalen" },
      { id: "sneakers", label: "Leichte Sneakers (für Ausflüge)" },
      { id: "regenjacke", label: "Dünne Regenjacke / Windbreaker" },
      { id: "longsleeve", label: "1× Longsleeve (Flug / Tempel)" },
      { id: "kappe", label: "Kappe / Sonnenhut" },
      { id: "sonnenbrille", label: "Sonnenbrille" },
    ],
  },
  {
    title: "Gesundheit & Hygiene",
    icon: <Pill className="w-4 h-4" />,
    color: "text-rose-400",
    items: [
      { id: "sonnencreme", label: "Sonnencreme LSF 50+", essential: true },
      { id: "mueckenspray", label: "Mückenspray (DEET-basiert)", essential: true },
      { id: "durchfall", label: "Durchfallmittel (Imodium)" },
      { id: "elektrolyte", label: "Elektrolyt-Pulver" },
      { id: "pflaster", label: "Pflaster & Desinfektionsmittel" },
      { id: "schmerztabletten", label: "Schmerztabletten (Ibuprofen/Paracetamol)" },
      { id: "zahnbuerste", label: "Zahnbürste & Zahnpasta" },
      { id: "duschgel", label: "Duschgel / Shampoo (Reisegröße)" },
      { id: "deo", label: "Deodorant" },
      { id: "aftershave", label: "After-Sun Lotion" },
    ],
  },
  {
    title: "Technik",
    icon: <Zap className="w-4 h-4" />,
    color: "text-amber-400",
    items: [
      { id: "handy", label: "Handy + Ladekabel", essential: true },
      { id: "powerbank", label: "Powerbank (mind. 10.000 mAh)", essential: true },
      { id: "adapter", label: "Reiseadapter (Typ A/B/C)" },
      { id: "kopfhoerer", label: "Kopfhörer (Flug!)" },
      { id: "kamera", label: "Kamera / GoPro (optional)" },
      { id: "filme", label: "Filme & Serien offline geladen (Scoot = kein Entertainment!)", essential: true },
    ],
  },
  {
    title: "Sonstiges",
    icon: <Sun className="w-4 h-4" />,
    color: "text-emerald-400",
    items: [
      { id: "rucksack", label: "Tagesrucksack (für Ausflüge)" },
      { id: "trinkflasche", label: "Trinkflasche (nachfüllbar)" },
      { id: "snacks", label: "Snacks für den Flug" },
      { id: "nackenpolster", label: "Nackenpolster (11h Flug!)" },
      { id: "beutel", label: "Zip-Beutel für Flüssigkeiten (Handgepäck)" },
      { id: "taschentuecher", label: "Taschentücher / Feuchttücher" },
      { id: "bargeld", label: "Etwas Euro-Bargeld zum Tauschen" },
    ],
  },
];

const STORAGE_KEY = "maturareise-packing-list";

export default function PackingList() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    () => Object.fromEntries(categories.map((c) => [c.title, true]))
  );

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setChecked(JSON.parse(saved));
    } catch {
      /* ignore */
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
    } catch {
      /* ignore */
    }
  }, [checked]);

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCategory = (title: string) => {
    setOpenCategories((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const totalItems = categories.reduce((s, c) => s + c.items.length, 0);
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const progress = totalItems > 0 ? (checkedCount / totalItems) * 100 : 0;

  const resetAll = () => {
    setChecked({});
  };

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <Luggage className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-semibold text-white">
              {checkedCount}/{totalItems} eingepackt
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-emerald-400">
              {Math.round(progress)}%
            </span>
            {checkedCount > 0 && (
              <button
                onClick={resetAll}
                className="text-[11px] text-gray-600 hover:text-gray-400 transition-colors"
              >
                Zurücksetzen
              </button>
            )}
          </div>
        </div>
        <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        {progress === 100 && (
          <p className="text-center text-sm text-emerald-400 font-semibold mt-3 animate-pulse">
            🎉 Alles eingepackt — ready for Koh Samui!
          </p>
        )}
      </div>

      {/* Categories */}
      <div className="space-y-3">
        {categories.map((cat) => {
          const catChecked = cat.items.filter((i) => checked[i.id]).length;
          const isOpen = openCategories[cat.title];

          return (
            <div
              key={cat.title}
              className="rounded-2xl bg-white/[0.02] border border-white/[0.05] overflow-hidden"
            >
              {/* Category header */}
              <button
                onClick={() => toggleCategory(cat.title)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className={cat.color}>{cat.icon}</span>
                  <span className="font-semibold text-sm tracking-tight">
                    {cat.title}
                  </span>
                  <span className="text-[11px] text-gray-600 font-mono">
                    {catChecked}/{cat.items.length}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Items */}
              {isOpen && (
                <div className="px-5 pb-4 space-y-1">
                  {cat.items.map((item) => {
                    const isChecked = !!checked[item.id];

                    return (
                      <button
                        key={item.id}
                        onClick={() => toggle(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all duration-200 ${
                          isChecked
                            ? "bg-emerald-500/[0.06]"
                            : "hover:bg-white/[0.03]"
                        }`}
                      >
                        {/* Checkbox */}
                        <div
                          className={`shrink-0 w-5 h-5 rounded-md border transition-all duration-200 flex items-center justify-center ${
                            isChecked
                              ? "bg-emerald-500 border-emerald-500"
                              : "border-white/[0.12] bg-white/[0.02]"
                          }`}
                        >
                          {isChecked && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>

                        {/* Label */}
                        <span
                          className={`text-[13px] leading-tight transition-all duration-200 ${
                            isChecked
                              ? "text-gray-500 line-through"
                              : "text-gray-300"
                          }`}
                        >
                          {item.label}
                        </span>

                        {/* Essential badge */}
                        {item.essential && !isChecked && (
                          <span className="ml-auto shrink-0 text-[9px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                            Wichtig
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
