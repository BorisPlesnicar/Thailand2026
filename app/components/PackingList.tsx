"use client";

import { useState, useEffect, useRef } from "react";
import {
  Check,
  Luggage,
  Shirt,
  Pill,
  Zap,
  FileText,
  Sun,
  ChevronDown,
  Share2,
  Link2,
  Plus,
  Trash2,
  Copy,
} from "lucide-react";

interface PackItem {
  id: string;
  label: string;
  essential?: boolean;
  custom?: boolean;
}

interface PackCategory {
  title: string;
  icon: React.ReactNode;
  color: string;
  items: PackItem[];
}

const defaultCategories: PackCategory[] = [
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
const CUSTOM_ITEMS_KEY = "maturareise-custom-items";

// Encode checked IDs into a compact base64-like string for URL sharing
function encodeChecked(checked: Record<string, boolean>, allIds: string[]): string {
  const bits = allIds.map((id) => (checked[id] ? "1" : "0")).join("");
  // Convert binary string to base36 for compactness
  let result = "";
  for (let i = 0; i < bits.length; i += 6) {
    const chunk = bits.slice(i, i + 6).padEnd(6, "0");
    result += parseInt(chunk, 2).toString(36);
  }
  return result;
}

function decodeChecked(encoded: string, allIds: string[]): Record<string, boolean> {
  // Convert base36 back to binary
  let bits = "";
  for (const char of encoded) {
    bits += parseInt(char, 36).toString(2).padStart(6, "0");
  }
  const result: Record<string, boolean> = {};
  allIds.forEach((id, i) => {
    if (bits[i] === "1") result[id] = true;
  });
  return result;
}

export default function PackingList() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [customItems, setCustomItems] = useState<PackItem[]>([]);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    () => Object.fromEntries(defaultCategories.map((c) => [c.title, true]))
  );
  const [newItemText, setNewItemText] = useState("");
  const [addingItem, setAddingItem] = useState(false);
  const [shareToast, setShareToast] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Build full categories with custom items appended to "Sonstiges"
  const categories = defaultCategories.map((cat) => {
    if (cat.title === "Sonstiges") {
      return { ...cat, items: [...cat.items, ...customItems] };
    }
    return cat;
  });

  const allIds = categories.flatMap((c) => c.items.map((i) => i.id));
  const totalItems = allIds.length;
  const checkedCount = allIds.filter((id) => checked[id]).length;
  const progress = totalItems > 0 ? (checkedCount / totalItems) * 100 : 0;

  // Load from localStorage + URL hash on mount
  useEffect(() => {
    try {
      // Load custom items first
      const savedCustom = localStorage.getItem(CUSTOM_ITEMS_KEY);
      if (savedCustom) {
        setCustomItems(JSON.parse(savedCustom));
      }

      // Check URL hash for shared state
      const hash = window.location.hash;
      if (hash.startsWith("#pack=")) {
        const encoded = hash.slice(6);
        const baseIds = defaultCategories.flatMap((c) => c.items.map((i) => i.id));
        const decoded = decodeChecked(encoded, baseIds);
        setChecked(decoded);
        // Clean URL hash
        history.replaceState(null, "", window.location.pathname);
      } else {
        // Load from localStorage
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) setChecked(JSON.parse(saved));
      }
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
    } catch {
      /* ignore */
    }
  }, [checked, loaded]);

  // Save custom items to localStorage
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(CUSTOM_ITEMS_KEY, JSON.stringify(customItems));
    } catch {
      /* ignore */
    }
  }, [customItems, loaded]);

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCategory = (title: string) => {
    setOpenCategories((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const resetAll = () => {
    setChecked({});
  };

  // Add custom item
  const addCustomItem = () => {
    const text = newItemText.trim();
    if (!text) return;
    const id = `custom-${Date.now()}`;
    setCustomItems((prev) => [...prev, { id, label: text, custom: true }]);
    setNewItemText("");
    setAddingItem(false);
  };

  // Remove custom item
  const removeCustomItem = (id: string) => {
    setCustomItems((prev) => prev.filter((i) => i.id !== id));
    setChecked((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  // Generate shareable link
  const generateShareLink = () => {
    const baseIds = defaultCategories.flatMap((c) => c.items.map((i) => i.id));
    const encoded = encodeChecked(checked, baseIds);
    const url = `${window.location.origin}${window.location.pathname}#pack=${encoded}`;
    return url;
  };

  // Copy link to clipboard
  const copyLink = async () => {
    const url = generateShareLink();
    try {
      await navigator.clipboard.writeText(url);
      showToast("Link kopiert!");
    } catch {
      // Fallback
      prompt("Link kopieren:", url);
    }
  };

  // Share via WhatsApp
  const shareWhatsApp = () => {
    const missing = categories
      .flatMap((c) => c.items)
      .filter((i) => i.essential && !checked[i.id])
      .map((i) => i.label);

    let text = `🏝️ *Packliste Koh Samui* — ${checkedCount}/${totalItems} eingepackt (${Math.round(progress)}%)\n\n`;

    if (missing.length > 0) {
      text += `⚠️ *Noch wichtig:*\n${missing.map((m) => `• ${m}`).join("\n")}\n\n`;
    }

    text += `📋 Meine Liste: ${generateShareLink()}`;

    window.open(
      `https://wa.me/?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  // Copy as text
  const copyAsText = async () => {
    let text = `🏝️ Packliste Koh Samui — ${checkedCount}/${totalItems}\n\n`;
    for (const cat of categories) {
      const items = cat.items;
      const catDone = items.filter((i) => checked[i.id]).length;
      text += `${cat.title} (${catDone}/${items.length}):\n`;
      for (const item of items) {
        text += `  ${checked[item.id] ? "✅" : "⬜"} ${item.label}${item.essential ? " ⚠️" : ""}\n`;
      }
      text += "\n";
    }
    try {
      await navigator.clipboard.writeText(text);
      showToast("Packliste kopiert!");
    } catch {
      /* ignore */
    }
  };

  const showToast = (message: string) => {
    setShareToast(message);
    setTimeout(() => setShareToast(null), 2500);
  };

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-6">
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

      {/* Action bar: Share, Copy, Add */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={copyLink}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[12px] font-medium text-gray-400 hover:text-white hover:bg-white/[0.07] transition-all"
        >
          <Link2 className="w-3.5 h-3.5" />
          Link teilen
        </button>
        <button
          onClick={shareWhatsApp}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/[0.12] text-[12px] font-medium text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/[0.14] transition-all"
        >
          <Share2 className="w-3.5 h-3.5" />
          WhatsApp
        </button>
        <button
          onClick={copyAsText}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[12px] font-medium text-gray-400 hover:text-white hover:bg-white/[0.07] transition-all"
        >
          <Copy className="w-3.5 h-3.5" />
          Als Text kopieren
        </button>
        <button
          onClick={() => {
            setAddingItem(true);
            setTimeout(() => inputRef.current?.focus(), 100);
          }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[12px] font-medium text-gray-400 hover:text-white hover:bg-white/[0.07] transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          Item hinzufügen
        </button>
      </div>

      {/* Add item inline */}
      {addingItem && (
        <div className="mb-6 flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addCustomItem();
              if (e.key === "Escape") setAddingItem(false);
            }}
            placeholder="z.B. Sonnencreme nachkaufen..."
            className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-emerald-500/30 transition-colors"
          />
          <button
            onClick={addCustomItem}
            className="px-4 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 text-sm font-semibold hover:bg-emerald-500/30 transition-colors"
          >
            Hinzufügen
          </button>
          <button
            onClick={() => setAddingItem(false)}
            className="px-3 py-2.5 rounded-xl bg-white/[0.04] text-gray-500 text-sm hover:text-gray-300 transition-colors"
          >
            ✕
          </button>
        </div>
      )}

      {/* Info hint */}
      <div className="mb-6 rounded-xl bg-blue-500/[0.04] border border-blue-500/[0.08] px-4 py-3 flex items-start gap-2.5">
        <span className="text-blue-400 text-sm mt-0.5">💡</span>
        <p className="text-[12px] text-blue-300/60 leading-relaxed">
          Deine Haken werden <strong className="text-blue-300/80">automatisch im Browser gespeichert</strong> und bleiben auch nach dem Schließen erhalten.
          Per <strong className="text-blue-300/80">&quot;Link teilen&quot;</strong> kannst du deinen Fortschritt an andere schicken — ganz ohne Account oder Datenbank.
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        {categories.map((cat) => {
          const catChecked = cat.items.filter((i) => checked[i.id]).length;
          const isOpen = openCategories[cat.title];
          const allDone = catChecked === cat.items.length && cat.items.length > 0;

          return (
            <div
              key={cat.title}
              className={`rounded-2xl border overflow-hidden transition-colors duration-300 ${
                allDone
                  ? "bg-emerald-500/[0.03] border-emerald-500/10"
                  : "bg-white/[0.02] border-white/[0.05]"
              }`}
            >
              {/* Category header */}
              <button
                onClick={() => toggleCategory(cat.title)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className={allDone ? "text-emerald-400" : cat.color}>
                    {allDone ? <Check className="w-4 h-4" /> : cat.icon}
                  </span>
                  <span className={`font-semibold text-sm tracking-tight ${allDone ? "text-emerald-300/80" : ""}`}>
                    {cat.title}
                  </span>
                  <span className={`text-[11px] font-mono ${allDone ? "text-emerald-400/60" : "text-gray-600"}`}>
                    {catChecked}/{cat.items.length}
                  </span>
                  {allDone && (
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      ✓ Fertig
                    </span>
                  )}
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
                      <div
                        key={item.id}
                        className={`flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all duration-200 ${
                          isChecked
                            ? "bg-emerald-500/[0.06]"
                            : "hover:bg-white/[0.03]"
                        }`}
                      >
                        <button
                          onClick={() => toggle(item.id)}
                          className="flex items-center gap-3 flex-1 min-w-0"
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
                        </button>

                        {/* Essential badge or delete for custom */}
                        {item.custom ? (
                          <button
                            onClick={() => removeCustomItem(item.id)}
                            className="shrink-0 p-1 rounded-lg hover:bg-red-500/10 text-gray-600 hover:text-red-400 transition-colors"
                            aria-label="Löschen"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          item.essential &&
                          !isChecked && (
                            <span className="ml-auto shrink-0 text-[9px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                              Wichtig
                            </span>
                          )
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Toast notification */}
      {shareToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-emerald-500/90 text-white text-sm font-semibold shadow-xl shadow-emerald-500/20 animate-bounce">
          {shareToast}
        </div>
      )}
    </div>
  );
}
