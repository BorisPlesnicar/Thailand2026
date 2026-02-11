"use client";

import { useState, useEffect, Fragment } from "react";

export default function Countdown() {
  const targetDate = new Date("2026-06-21T10:25:00+02:00").getTime();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const labels = ["Tage", "Stunden", "Minuten", "Sekunden"];

  if (now === null) {
    return (
      <div className="flex items-center justify-center gap-3 sm:gap-6">
        {labels.map((label, i) => (
          <Fragment key={label}>
            <div className="flex flex-col items-center">
              <span className="text-5xl sm:text-7xl md:text-8xl font-bold tabular-nums tracking-tight text-white/10">
                00
              </span>
              <span className="mt-3 text-[10px] sm:text-xs text-gray-600 uppercase tracking-[0.2em] font-medium">
                {label}
              </span>
            </div>
            {i < labels.length - 1 && (
              <span className="text-3xl sm:text-5xl font-light text-white/10 -mt-5 sm:-mt-6">
                :
              </span>
            )}
          </Fragment>
        ))}
      </div>
    );
  }

  const diff = Math.max(0, targetDate - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  const blocks = [
    { value: days, label: "Tage" },
    { value: hours, label: "Stunden" },
    { value: minutes, label: "Minuten" },
    { value: seconds, label: "Sekunden" },
  ];

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-6">
      {blocks.map((block, i) => (
        <Fragment key={block.label}>
          <div className="flex flex-col items-center">
            <span className="text-5xl sm:text-7xl md:text-8xl font-bold tabular-nums tracking-tight bg-gradient-to-b from-white via-white to-gray-500 bg-clip-text text-transparent">
              {String(block.value).padStart(2, "0")}
            </span>
            <span className="mt-3 text-[10px] sm:text-xs text-gray-500 uppercase tracking-[0.2em] font-medium">
              {block.label}
            </span>
          </div>
          {i < blocks.length - 1 && (
            <span className="text-3xl sm:text-5xl font-light text-white/15 -mt-5 sm:-mt-6">
              :
            </span>
          )}
        </Fragment>
      ))}
    </div>
  );
}
