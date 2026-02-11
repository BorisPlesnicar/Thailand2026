import Image from "next/image";
import {
  Plane,
  MapPin,
  Shield,
  Heart,
  Lightbulb,
  Phone,
  Home,
  Users,
  Calendar,
  Clock,
  ExternalLink,
  Check,
  AlertTriangle,
  CreditCard,
  ChevronDown,
  Globe,
  Sun,
  Wifi,
  ShieldCheck,
} from "lucide-react";
import Countdown from "./components/Countdown";
import TravelerCard from "./components/TravelerCard";
import TravelTips from "./components/TravelTips";
import PackingList from "./components/PackingList";

/* ─── Data ─────────────────────────────────────────────────────────── */

const travelers = [
  {
    nickname: "Boris",
    realName: "Boris Plesnicar",
    image: "/travelers/boris.jpeg",
    gradient: "bg-gradient-to-br from-emerald-500 to-teal-700",
  },
  {
    nickname: "Maxl",
    realName: "Maximilian Huber",
    image: "/travelers/maxl.jpeg",
    gradient: "bg-gradient-to-br from-cyan-500 to-blue-700",
  },
  {
    nickname: "Schaider",
    realName: "Michael Schaider",
    image: "/travelers/schaider.jpeg",
    gradient: "bg-gradient-to-br from-violet-500 to-purple-700",
  },
  {
    nickname: "Hahni",
    realName: "Simon Hahn",
    image: "/travelers/hahni.jpeg",
    gradient: "bg-gradient-to-br from-amber-500 to-orange-700",
  },
  {
    nickname: "Ole",
    realName: "Jan-Ole Baumgartner",
    image: "/travelers/ole.jpeg",
    gradient: "bg-gradient-to-br from-rose-500 to-pink-700",
  },
  {
    nickname: "Pichler",
    realName: "Laurenz Pichler",
    image: "/travelers/pichler.jpeg",
    gradient: "bg-gradient-to-br from-teal-500 to-cyan-700",
  },
  {
    nickname: "Jan",
    realName: "Jan Tiefenbacher",
    image: "/travelers/jan.jpeg",
    gradient: "bg-gradient-to-br from-blue-500 to-indigo-700",
  },
  {
    nickname: "MoG",
    realName: "Moritz Graschopf",
    image: "/travelers/Mog.jpeg",
    gradient: "bg-gradient-to-br from-lime-500 to-emerald-700",
  },
  {
    nickname: "Kainz",
    realName: "Colin Kainz",
    image: "/travelers/kainz.jpeg",
    gradient: "bg-gradient-to-br from-orange-500 to-red-700",
  },
];

/* ── (zigzag offsets removed — compact grid now) ── */

/* ─── Helpers ──────────────────────────────────────────────────────── */

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl sm:rounded-3xl bg-white/[0.03] p-6 sm:p-8 transition-all duration-500 hover:bg-white/[0.05] ${className}`}
    >
      {children}
    </div>
  );
}

function SectionIntro({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="text-center mb-14 sm:mb-20 max-w-3xl mx-auto">
      <p className="text-emerald-400 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] mb-4">
        {label}
      </p>
      <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5">
        {title}
      </h2>
      {description && (
        <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

function ImageBreak({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-[30vh] sm:h-[45vh] overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        quality={85}
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-transparent to-[#030712]" />
    </div>
  );
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-[15px] text-gray-300 leading-relaxed">
      <Check className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
      <span>{children}</span>
    </li>
  );
}

function WarnItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-[15px] text-gray-300 leading-relaxed">
      <AlertTriangle className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
      <span>{children}</span>
    </li>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────── */

export default function Page() {
  return (
    <div className="min-h-screen bg-[#030712] text-gray-100 overflow-x-hidden">
      {/* ═══ NAV ═════════════════════════════════════════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#030712]/60 backdrop-blur-2xl border-b border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between">
          <a href="#" className="font-semibold text-sm tracking-wide">
            🌴 5BHITM
          </a>
          <div className="hidden sm:flex gap-7 text-[13px] text-gray-400 font-medium">
            {[
              ["#crew", "Crew"],
              ["#flights", "Flüge"],
              ["#accommodation", "Unterkunft"],
              ["#entry", "Einreise"],
              ["#health", "Gesundheit"],
              ["#packing", "Packliste"],
              ["#tips", "Tipps"],
              ["#contacts", "Kontakte"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="hover:text-white transition-colors duration-300"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ═══ HERO ════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=85"
          alt="Tropical beach"
          fill
          className="object-cover scale-105"
          priority
          quality={90}
          sizes="100vw"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-[#030712]/60" />
        <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-[#030712] via-[#030712]/80 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#030712]/60 to-transparent" />

        {/* Glow orbs */}
        <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-emerald-500/[0.04] rounded-full blur-[150px] animate-float" />
        <div className="absolute bottom-1/4 -right-40 w-[400px] h-[400px] bg-cyan-500/[0.04] rounded-full blur-[120px] animate-float-slow" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 flex flex-col items-center max-w-5xl">
          <p className="animate-fade-in-up text-emerald-400/90 font-semibold tracking-[0.35em] uppercase text-[11px] sm:text-xs mb-8">
            Maturareise 2026
          </p>

          <h1 className="animate-fade-in-up-delay text-[4.5rem] sm:text-[7rem] md:text-[9rem] lg:text-[11rem] font-extrabold tracking-tighter leading-[0.85] mb-6">
            <span className="bg-gradient-to-b from-white via-white/90 to-white/40 bg-clip-text text-transparent">
              Koh Samui
            </span>
          </h1>

          <p className="animate-fade-in-up-delay text-gray-400 text-base sm:text-xl font-light tracking-wide mb-1">
            Thailand
          </p>
          <p className="animate-fade-in-up-delay-2 text-gray-600 text-xs sm:text-sm font-medium tracking-widest uppercase mb-16 sm:mb-20">
            21. Juni – 4. Juli 2026
          </p>

          <div className="animate-fade-in-up-delay-2">
            <Countdown />
          </div>

          {/* Quick Stats */}
          <div className="animate-fade-in-up-delay-3 flex gap-12 sm:gap-20 mt-20 sm:mt-24">
            {[
              ["9", "Personen"],
              ["13", "Tage"],
              ["2", "Buchungen"],
            ].map(([value, label]) => (
              <div key={label} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  {value}
                </p>
                <p className="text-gray-500 text-[10px] sm:text-xs mt-1.5 uppercase tracking-[0.2em] font-medium">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <a
          href="#crew"
          className="absolute bottom-8 z-10 animate-bounce opacity-30 hover:opacity-70 transition-opacity"
        >
          <ChevronDown className="w-6 h-6" />
        </a>
      </section>

      {/* ═══ CREW / REISENDE ═════════════════════════════════════════ */}
      <section id="crew" className="py-28 sm:py-40 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionIntro
            label="Die Crew"
            title="9 Legends, 1 Insel"
            description="Die Mannschaft der 5BHITM auf dem Weg nach Koh Samui."
          />

          {/* Compact connected grid */}
          <div className="relative max-w-3xl mx-auto">
            {/* Subtle connecting lines behind the grid */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
              preserveAspectRatio="none"
            >
              <line x1="50%" y1="0" x2="50%" y2="100%" stroke="rgba(52,211,153,0.06)" strokeWidth="1" />
              <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgba(52,211,153,0.06)" strokeWidth="1" />
            </svg>

            {/* Top row: 5 travelers */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-6 sm:gap-4 justify-items-center mb-8">
              {travelers.slice(0, 5).map((t) => (
                <TravelerCard
                  key={t.nickname}
                  nickname={t.nickname}
                  realName={t.realName}
                  imagePath={t.image}
                  gradient={t.gradient}
                  size="md"
                />
              ))}
            </div>

            {/* Connecting bar */}
            <div className="flex items-center justify-center mb-8">
              <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-emerald-400/20" />
              <div className="px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06]">
                <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-[0.2em]">5BHITM</span>
              </div>
              <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-emerald-400/20 to-transparent" />
            </div>

            {/* Bottom row: 4 travelers, centered */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-6 sm:gap-4 justify-items-center max-w-[80%] sm:max-w-[75%] mx-auto">
              {travelers.slice(5).map((t) => (
                <TravelerCard
                  key={t.nickname}
                  nickname={t.nickname}
                  realName={t.realName}
                  imagePath={t.image}
                  gradient={t.gradient}
                  size="md"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ IMAGE BREAK ═════════════════════════════════════════════ */}
      <ImageBreak
        src="https://images.unsplash.com/photo-1504214208698-ea1916a2195a?auto=format&fit=crop&w=2000&q=80"
        alt="Longtail Boats Thailand"
      />

      {/* ═══ FLIGHTS ═════════════════════════════════════════════════ */}
      <section id="flights" className="py-28 sm:py-40 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionIntro
            label="Flugdetails"
            title="Eure Flüge"
            description="Alle 9 Personen fliegen mit Scoot Airlines (Low-Cost-Tochter von Singapore Airlines) — mit Umstieg in Singapur."
          />

          {/* ── Airline Info ── */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-10 text-[13px] text-gray-500">
            <span className="flex items-center gap-1.5">
              <Plane className="w-3.5 h-3.5" /> Scoot Airlines (Budget)
            </span>
            <span>Economy Class</span>
            <span>2 Buchungen · 9 Passagiere</span>
          </div>

          {/* ── HINFLUG ── */}
          <Card className="mb-5">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <p className="text-xs font-bold text-emerald-400 uppercase tracking-[0.2em]">
                Hinflug — So, 21. Juni → Mo, 22. Juni
              </p>
            </div>

            {/* 3-Airport Route Visual */}
            <div className="flex items-start gap-0 mb-6">
              {/* VIE */}
              <div className="flex flex-col items-center text-center shrink-0 w-[72px] sm:w-[90px]">
                <p className="text-2xl sm:text-3xl font-bold tracking-tight">VIE</p>
                <p className="text-[11px] text-gray-500 mt-0.5">Wien</p>
                <p className="font-mono text-white text-lg sm:text-xl font-semibold mt-3">10:25</p>
                <p className="text-[10px] text-gray-500">So, 21. Juni</p>
              </div>

              {/* Leg 1: VIE → SIN */}
              <div className="flex-1 flex flex-col items-center pt-1 px-1 sm:px-2">
                <p className="text-[10px] text-gray-600 font-mono mb-1">TR61</p>
                <div className="w-full flex items-center gap-1">
                  <div className="h-px flex-1 bg-emerald-500/40" />
                  <Plane className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <div className="h-px flex-1 bg-emerald-500/40" />
                </div>
                <p className="text-[10px] text-gray-600 mt-1">~11h</p>
              </div>

              {/* SIN */}
              <div className="flex flex-col items-center text-center shrink-0 w-[80px] sm:w-[100px]">
                <p className="text-2xl sm:text-3xl font-bold tracking-tight text-amber-300">SIN</p>
                <p className="text-[11px] text-amber-400/60 mt-0.5">Singapur</p>
                <div className="mt-3 px-2 py-1 rounded-lg bg-amber-500/[0.08] border border-amber-500/15">
                  <p className="text-[10px] text-amber-300/80 font-medium">Umstieg</p>
                </div>
              </div>

              {/* Leg 2: SIN → USM */}
              <div className="flex-1 flex flex-col items-center pt-1 px-1 sm:px-2">
                <p className="text-[10px] text-gray-600 font-mono mb-1">TR640</p>
                <div className="w-full flex items-center gap-1">
                  <div className="h-px flex-1 bg-emerald-500/40" />
                  <Plane className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <div className="h-px flex-1 bg-emerald-500/40" />
                </div>
                <p className="text-[10px] text-gray-600 mt-1">~2h</p>
              </div>

              {/* USM */}
              <div className="flex flex-col items-center text-center shrink-0 w-[72px] sm:w-[90px]">
                <p className="text-2xl sm:text-3xl font-bold tracking-tight">USM</p>
                <p className="text-[11px] text-gray-500 mt-0.5">Koh Samui</p>
                <p className="font-mono text-white text-lg sm:text-xl font-semibold mt-3">07:45</p>
                <p className="text-[10px] text-gray-500">Mo, 22. Juni</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 pt-5 border-t border-white/[0.04] text-[13px] text-gray-500">
              <span>Gesamtdauer: <strong className="text-white">16h 20min</strong></span>
              <span className="text-white/10">|</span>
              <span>1 Stopp in <strong className="text-amber-300/80">Singapur (SIN)</strong></span>
              <span className="text-white/10">|</span>
              <span>Changi Airport</span>
            </div>
          </Card>

          {/* ── RÜCKFLUG ── */}
          <Card className="mb-6">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <p className="text-xs font-bold text-cyan-400 uppercase tracking-[0.2em]">
                Rückflug — Fr, 3. Juli → Sa, 4. Juli
              </p>
            </div>

            {/* 3-Airport Route Visual */}
            <div className="flex items-start gap-0 mb-6">
              {/* USM */}
              <div className="flex flex-col items-center text-center shrink-0 w-[72px] sm:w-[90px]">
                <p className="text-2xl sm:text-3xl font-bold tracking-tight">USM</p>
                <p className="text-[11px] text-gray-500 mt-0.5">Koh Samui</p>
                <p className="font-mono text-white text-lg sm:text-xl font-semibold mt-3">19:45</p>
                <p className="text-[10px] text-gray-500">Fr, 3. Juli</p>
              </div>

              {/* Leg 1: USM → SIN */}
              <div className="flex-1 flex flex-col items-center pt-1 px-1 sm:px-2">
                <p className="text-[10px] text-gray-600 font-mono mb-1">TR649</p>
                <div className="w-full flex items-center gap-1">
                  <div className="h-px flex-1 bg-cyan-500/40" />
                  <Plane className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <div className="h-px flex-1 bg-cyan-500/40" />
                </div>
                <p className="text-[10px] text-gray-600 mt-1">~2h</p>
              </div>

              {/* SIN */}
              <div className="flex flex-col items-center text-center shrink-0 w-[80px] sm:w-[100px]">
                <p className="text-2xl sm:text-3xl font-bold tracking-tight text-amber-300">SIN</p>
                <p className="text-[11px] text-amber-400/60 mt-0.5">Singapur</p>
                <div className="mt-3 px-2 py-1 rounded-lg bg-amber-500/[0.08] border border-amber-500/15">
                  <p className="text-[10px] text-amber-300/80 font-medium">Umstieg</p>
                </div>
              </div>

              {/* Leg 2: SIN → VIE */}
              <div className="flex-1 flex flex-col items-center pt-1 px-1 sm:px-2">
                <p className="text-[10px] text-gray-600 font-mono mb-1">TR60</p>
                <div className="w-full flex items-center gap-1">
                  <div className="h-px flex-1 bg-cyan-500/40" />
                  <Plane className="w-3.5 h-3.5 text-cyan-400 shrink-0 rotate-180" />
                  <div className="h-px flex-1 bg-cyan-500/40" />
                </div>
                <p className="text-[10px] text-gray-600 mt-1">~11h</p>
              </div>

              {/* VIE */}
              <div className="flex flex-col items-center text-center shrink-0 w-[72px] sm:w-[90px]">
                <p className="text-2xl sm:text-3xl font-bold tracking-tight">VIE</p>
                <p className="text-[11px] text-gray-500 mt-0.5">Wien</p>
                <p className="font-mono text-white text-lg sm:text-xl font-semibold mt-3">09:10</p>
                <p className="text-[10px] text-gray-500">Sa, 4. Juli</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 pt-5 border-t border-white/[0.04] text-[13px] text-gray-500">
              <span>Gesamtdauer: <strong className="text-white">18h 25min</strong></span>
              <span className="text-white/10">|</span>
              <span>1 Stopp in <strong className="text-amber-300/80">Singapur (SIN)</strong></span>
              <span className="text-white/10">|</span>
              <span>Changi Airport</span>
            </div>
          </Card>

          {/* ── Scoot & Changi Info ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <Card>
              <div className="flex items-center gap-2.5 mb-4">
                <Plane className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold tracking-tight">Über Scoot Airlines</h3>
              </div>
              <ul className="space-y-2">
                <WarnItem>
                  <strong>Low-Cost Airline</strong> — kein Essen/Trinken
                  inklusive, muss man im Voraus oder an Bord kaufen
                </WarnItem>
                <WarnItem>
                  <strong>Kein Entertainment</strong> — Filme, Serien etc.
                  selbst aufs Handy/Tablet laden!
                </WarnItem>
                <CheckItem>
                  Tochtergesellschaft von Singapore Airlines — trotzdem sichere
                  und zuverlässige Airline
                </CheckItem>
                <CheckItem>
                  USB-Ladeanschluss am Sitz vorhanden
                </CheckItem>
              </ul>
            </Card>

            <Card>
              <div className="flex items-center gap-2.5 mb-4">
                <Globe className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold tracking-tight">Changi Airport Singapur</h3>
              </div>
              <ul className="space-y-2">
                <CheckItem>
                  Einer der besten Flughäfen der Welt — riesig und modern
                </CheckItem>
                <CheckItem>
                  <strong>Gratis WiFi</strong> im gesamten Flughafen
                </CheckItem>
                <CheckItem>
                  Kostenlose Ladestationen, Ruhezonen & Lounges
                </CheckItem>
                <CheckItem>
                  Viele Restaurants, Shops und sogar ein Butterfly Garden & Pool
                </CheckItem>
                <WarnItem>
                  Beim Umstieg nicht das Terminal verlassen — ihr braucht
                  kein Singapur-Visum solange ihr im Transit bleibt
                </WarnItem>
              </ul>
            </Card>
          </div>

          {/* ── Booking Groups ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-5">
            {/* Booking 1 */}
            <Card>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold tracking-tight">Buchung 1</h3>
                <span className="text-[11px] font-mono bg-white/[0.06] px-3 py-1.5 rounded-full text-gray-400">
                  W7QNWV
                </span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-gray-500" />
                  <p className="text-sm text-gray-300">
                    Boris, Maxl, Schaider
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <p className="text-sm text-gray-300">
                    Sitze Hinflug Leg 1 (VIE→SIN): 16A, 16B, 16C
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-white/[0.03] p-4 mb-5">
                <p className="text-[11px] text-gray-500 font-semibold mb-2.5 uppercase tracking-[0.15em]">
                  Gepäck pro Richtung (für alle 3 zusammen)
                </p>
                <ul className="space-y-1.5 text-sm text-gray-400">
                  <li>3× kleine Tasche (muss unter Vordersitz passen)</li>
                  <li>3× Handgepäck (23×38×54 cm, max 8 kg)</li>
                  <li className="text-amber-400/90 font-medium">
                    ⚠ Nur 1× Aufgabegepäck (max 20 kg) — für alle 3 zusammen!
                  </li>
                </ul>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  Gesamt
                </p>
                <div className="text-right">
                  <p className="font-bold text-xl tracking-tight">
                    € 2.280,35
                  </p>
                  <p className="text-[11px] text-gray-500">~€ 760 / Person</p>
                </div>
              </div>
            </Card>

            {/* Booking 2 */}
            <Card>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold tracking-tight">Buchung 2</h3>
                <span className="text-[11px] font-mono bg-white/[0.06] px-3 py-1.5 rounded-full text-gray-400">
                  ICLLMD
                </span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-gray-500" />
                  <p className="text-sm text-gray-300">
                    Hahni, Ole, Pichler, Jan, MoG, Kainz
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <p className="text-sm text-gray-300">
                    Sitze: werden von Airline zugewiesen
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-white/[0.03] p-4 mb-5">
                <p className="text-[11px] text-gray-500 font-semibold mb-2.5 uppercase tracking-[0.15em]">
                  Gepäck pro Richtung (für alle 6 zusammen)
                </p>
                <ul className="space-y-1.5 text-sm text-gray-400">
                  <li className="text-gray-600">
                    Keine kleinen Taschen inbegriffen
                  </li>
                  <li>4× Handgepäck (23×38×54 cm, max 10 kg)</li>
                  <li className="text-amber-400/90 font-medium">
                    ⚠ Nur 1× Aufgabegepäck (max 20 kg) — für alle 6 zusammen!
                  </li>
                </ul>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  Gesamt
                </p>
                <div className="text-right">
                  <p className="font-bold text-xl tracking-tight">
                    € 2.957,56
                  </p>
                  <p className="text-[11px] text-gray-500">~€ 493 / Person</p>
                </div>
              </div>
            </Card>
          </div>

          {/* ── Alerts ── */}
          <div className="space-y-3">
            <div className="rounded-2xl bg-amber-500/[0.05] border border-amber-500/10 p-5 flex items-start gap-3.5">
              <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-amber-300 mb-1">
                  Begrenztes Aufgabegepäck
                </p>
                <p className="text-[13px] text-amber-200/50 leading-relaxed">
                  Jede Buchung hat nur 1 aufgegebenes Gepäckstück (20 kg) für
                  alle Reisenden zusammen. Überlegt, ob ihr zusätzliches Gepäck
                  dazubuchen wollt — sonst muss (fast) alles ins Handgepäck.
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-amber-500/[0.05] border border-amber-500/10 p-5 flex items-start gap-3.5">
              <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-amber-300 mb-1">
                  Wichtig für den Flug
                </p>
                <ul className="space-y-1 text-[13px] text-amber-200/50 leading-relaxed">
                  <li>• Eigene Snacks & Getränke für den Flug einpacken (oder an Bord kaufen)</li>
                  <li>• Filme/Serien/Musik vorher aufs Handy oder Tablet laden</li>
                  <li>• Nackenpolster & warmen Pulli mitnehmen (Klimaanlage!)</li>
                  <li>• Powerbank für lange Reisezeit griffbereit haben</li>
                </ul>
              </div>
            </div>

            {/* Reiseschutz Detail */}
            <div className="rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/10 p-6">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-emerald-300">
                    Reiseschutz inkludiert — Beide Buchungen
                  </p>
                  <p className="text-[11px] text-emerald-400/50 mt-0.5">
                    Versicherungszertifikate an borplepay@gmail.com &
                    janole2333@gmail.com gesendet
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2.5">
                {[
                  "Reiserücktritt & Reiseabbruch",
                  "Medizinische Notfallversorgung im Ausland",
                  "Notfall-Rücktransport",
                  "Gepäckverlust & Gepäckverspätung",
                  "Flugverspätung & verpasster Anschluss",
                  "Persönliche Haftpflicht",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-[13px] text-emerald-200/60"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-400/70 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ IMAGE BREAK ═════════════════════════════════════════════ */}
      <ImageBreak
        src="https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=2000&q=80"
        alt="Thai Temple"
      />

      {/* ═══ ACCOMMODATION ═══════════════════════════════════════════ */}
      <section id="accommodation" className="py-28 sm:py-40 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionIntro
            label="Unterkunft"
            title="Euer Zuhause auf Samui"
            description="11 Nächte in einem gemeinsamen Airbnb — direkt auf der Insel."
          />

          <Card className="relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <Home className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                      Airbnb Koh Samui
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500">
                    Eure Villa für die gesamte Reise
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  {[
                    {
                      icon: Calendar,
                      color: "text-emerald-400",
                      label: "Check-in",
                      value: "22. Juni 2026",
                    },
                    {
                      icon: Calendar,
                      color: "text-cyan-400",
                      label: "Check-out",
                      value: "3. Juli 2026",
                    },
                    {
                      icon: Clock,
                      color: "text-gray-500",
                      label: "Dauer",
                      value: "11 Nächte",
                    },
                    {
                      icon: Users,
                      color: "text-gray-500",
                      label: "Gäste",
                      value: "9 Personen",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-2.5"
                    >
                      <item.icon className={`w-4 h-4 ${item.color}`} />
                      <div>
                        <p className="text-[11px] text-gray-500">
                          {item.label}
                        </p>
                        <p className="text-sm font-medium">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="https://www.airbnb.de/rooms/1564206056823537129?viralityEntryPoint=1&s=76"
            target="_blank"
            rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-white text-black font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:bg-gray-100 hover:scale-[1.02] active:scale-[0.98] text-sm shrink-0"
              >
                Airbnb ansehen
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </Card>
        </div>
      </section>

      {/* ═══ IMAGE BREAK ═════════════════════════════════════════════ */}
      <ImageBreak
        src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=2000&q=80"
        alt="Thailand tropical beach"
      />

      {/* ═══ ENTRY REQUIREMENTS ══════════════════════════════════════ */}
      <section id="entry" className="py-28 sm:py-40 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionIntro
            label="Einreise"
            title="Was ihr wissen müsst"
            description="Einreisebestimmungen für österreichische Staatsbürger nach Thailand."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-8">
            <Card>
              <div className="flex items-center gap-2.5 mb-5">
                <Shield className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold tracking-tight">Visum</h3>
              </div>
              <ul className="space-y-3">
                <CheckItem>
                  <strong>Kein Visum nötig</strong> für österreichische
                  Staatsbürger bei Einreise per Flugzeug
                </CheckItem>
                <CheckItem>
                  Automatische Aufenthaltserlaubnis von{" "}
                  <strong>60 Tagen</strong> bei Einreise
                </CheckItem>
                <CheckItem>
                  Reisepass muss ab Einreisedatum mindestens{" "}
                  <strong>6 Monate gültig</strong> sein
                </CheckItem>
                <CheckItem>
                  Bestätigtes Rückflugticket muss vorliegen
                </CheckItem>
              </ul>
            </Card>

            <Card>
              <div className="flex items-center gap-2.5 mb-5">
                <Globe className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold tracking-tight">
                  Thailand Digital Arrival Card
                </h3>
              </div>
              <ul className="space-y-3 mb-5">
                <WarnItem>
                  <strong>Pflicht!</strong> Alle Reisenden müssen die TDAC vor
                  Ankunft online einreichen
                </WarnItem>
                <CheckItem>Komplett kostenlos</CheckItem>
                <CheckItem>
                  Innerhalb von <strong>3 Tagen vor Abflug</strong> ausfüllen
                </CheckItem>
                <CheckItem>
                  Genehmigung erfolgt sofort (0–5 Minuten)
                </CheckItem>
              </ul>
              <a
                href="https://tdac.in.th/de"
            target="_blank"
            rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors duration-300 font-semibold"
              >
                Jetzt TDAC ausfüllen
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </Card>
          </div>

          <Card>
            <div className="flex items-center gap-2.5 mb-6">
              <Check className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-bold tracking-tight">
                Checkliste vor dem Abflug
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5">
              {[
                "Reisepass Gültigkeit prüfen (mind. bis Dez. 2026)",
                "Thailand Digital Arrival Card (TDAC) ausfüllen",
                "Reiseversicherung ✓ bereits inkludiert",
                "Impfungen auffrischen (siehe Gesundheit)",
                "Bargeld wechseln oder Kreditkarte vorbereiten",
                "Sonnencreme SPF 50+ einpacken",
                "Mückenschutz (mit DEET) einpacken",
                "Reiseapotheke zusammenstellen",
                "Internationalen Führerschein beantragen",
                "Kopien aller Dokumente digital sichern",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm">
                  <div className="w-[18px] h-[18px] rounded-md border-2 border-white/15 mt-0.5 shrink-0" />
                  <span className="text-gray-400 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* ═══ HEALTH ══════════════════════════════════════════════════ */}
      <section id="health" className="py-28 sm:py-40 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionIntro
            label="Gesundheit"
            title="Impfungen & Tipps"
            description="Keine Impfungen sind verpflichtend — aber einige werden dringend empfohlen."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            <Card>
              <h3 className="text-lg font-bold tracking-tight mb-5">
                Empfohlene Impfungen
              </h3>
              <ul className="space-y-4">
                {[
                  {
                    name: "Hepatitis A",
                    note: "Dringend empfohlen",
                    strong: true,
                  },
                  { name: "Hepatitis B", note: "Empfohlen", strong: false },
                  {
                    name: "Tetanus / Diphtherie / Pertussis",
                    note: "Auffrischen falls > 10 Jahre",
                    strong: true,
                  },
                  {
                    name: "Typhus",
                    note: "Empfohlen bei Street Food",
                    strong: false,
                  },
                  {
                    name: "Tollwut (Rabies)",
                    note: "Bei engem Tierkontakt",
                    strong: false,
                  },
                ].map((v) => (
                  <li key={v.name} className="flex items-start gap-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-[7px] shrink-0 ${
                        v.strong ? "bg-emerald-400" : "bg-gray-600"
                      }`}
                    />
                    <div>
                      <p className="text-[15px] font-medium text-gray-200">
                        {v.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{v.note}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-xl bg-emerald-500/[0.06] p-4">
                <p className="text-sm text-emerald-300/70">
                  ✅ <strong>Kein Malaria-Risiko</strong> auf Koh Samui — keine
                  Prophylaxe nötig
                </p>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-bold tracking-tight mb-5">
                Gesundheitstipps
              </h3>
              <ul className="space-y-3">
                <WarnItem>
                  <strong>Kein Leitungswasser trinken!</strong> Immer
                  abgefülltes Wasser kaufen
                </WarnItem>
                <WarnItem>
                  <strong>Sonnenschutz SPF 50+</strong> — die Tropensonne ist
                  extrem stark
                </WarnItem>
                <CheckItem>
                  Mückenschutz mit DEET (mind. 30%) verwenden, besonders abends
                </CheckItem>
                <CheckItem>
                  Reiseapotheke: Durchfallmittel, Schmerzmittel, Pflaster,
                  Elektrolyte
                </CheckItem>
                <CheckItem>
                  Vorsicht bei Street Food — auf Hygiene achten
                </CheckItem>
                <CheckItem>
                  Ausreichend trinken: mind. 2–3 Liter pro Tag
                </CheckItem>
                <CheckItem>
                  Beim Roller fahren: <strong>immer Helm tragen!</strong>
                </CheckItem>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* ═══ PACKING LIST ═════════════════════════════════════════════ */}
      <section id="packing" className="py-28 sm:py-40 px-6">
        <div className="max-w-3xl mx-auto">
          <SectionIntro
            label="Packliste"
            title="Alles dabei?"
            description="Interaktive Checkliste — hak ab was du schon eingepackt hast. Wird automatisch gespeichert."
          />
          <PackingList />
        </div>
      </section>

      {/* ═══ IMAGE BREAK ═════════════════════════════════════════════ */}
      <ImageBreak
        src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=2000&q=80"
        alt="Sunset Beach"
      />

      {/* ═══ TIPS ════════════════════════════════════════════════════ */}
      <section id="tips" className="py-28 sm:py-40 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionIntro
            label="Praktisches"
            title="Gut zu wissen"
            description="Alles Wichtige rund um Geld, Wetter, Transport und mehr auf Koh Samui."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Card>
              <CreditCard className="w-5 h-5 text-emerald-400 mb-4" />
              <h3 className="font-bold text-base mb-3 tracking-tight">
                Währung & Geld
              </h3>
              <ul className="space-y-2 text-sm text-gray-400 leading-relaxed">
                <li>
                  Thai Baht (THB) ·{" "}
                  <span className="text-white font-medium">
                    1 € ≈ 37–39 THB
                  </span>
                </li>
                <li>ATMs überall — Gebühr ca. 220 THB (~6 €)</li>
                <li>Kreditkarten in vielen Geschäften akzeptiert</li>
                <li>Für Märkte & Street Food: Bargeld nötig</li>
              </ul>
            </Card>

            <Card>
              <Sun className="w-5 h-5 text-amber-400 mb-4" />
              <h3 className="font-bold text-base mb-3 tracking-tight">
                Wetter Juni / Juli
              </h3>
              <ul className="space-y-2 text-sm text-gray-400 leading-relaxed">
                <li>
                  Temperatur:{" "}
                  <span className="text-white font-medium">28–33 °C</span>
                </li>
                <li>Hohe Luftfeuchtigkeit (~80 %)</li>
                <li>Green Season — kurze Regenschauer möglich</li>
                <li>Wassertemperatur: ~29 °C 🌊</li>
              </ul>
            </Card>

            <Card>
              <MapPin className="w-5 h-5 text-cyan-400 mb-4" />
              <h3 className="font-bold text-base mb-3 tracking-tight">
                Transport
              </h3>
              <ul className="space-y-2 text-sm text-gray-400 leading-relaxed">
                <li>
                  Roller:{" "}
                  <span className="text-white font-medium">
                    200–300 THB/Tag
                  </span>
                </li>
                <li className="text-amber-300 font-medium">
                  ⚠ Internationalen Führerschein mitnehmen
                </li>
                <li>Songthaew (lokale Sammeltaxis)</li>
                <li>Grab-App funktioniert auf Samui</li>
              </ul>
            </Card>

            <Card>
              <Wifi className="w-5 h-5 text-emerald-400 mb-4" />
              <h3 className="font-bold text-base mb-3 tracking-tight">
                Strom & Internet
              </h3>
              <ul className="space-y-2 text-sm text-gray-400 leading-relaxed">
                <li>
                  Steckdosen Typ A/B/C/O —{" "}
                  <span className="text-white font-medium">
                    Typ C (AT) passt
                  </span>
                </li>
                <li>220 V / 50 Hz (wie in Österreich)</li>
                <li>SIM am Flughafen: AIS, TrueMove, DTAC</li>
                <li>Tourist-SIM: ~300–600 THB</li>
              </ul>
            </Card>

            <Card>
              <Clock className="w-5 h-5 text-cyan-400 mb-4" />
              <h3 className="font-bold text-base mb-3 tracking-tight">
                Zeit & Kultur
              </h3>
              <ul className="space-y-2 text-sm text-gray-400 leading-relaxed">
                <li>
                  Zeitverschiebung:{" "}
                  <span className="text-white font-medium">+5 Stunden</span>{" "}
                  (MESZ)
                </li>
                <li>Schuhe ausziehen in Tempeln & Häusern</li>
                <li>Königsfamilie immer respektieren</li>
                <li>Trinkgeld: nicht Pflicht, ~10–20 THB</li>
              </ul>
            </Card>

            <Card>
              <AlertTriangle className="w-5 h-5 text-amber-400 mb-4" />
              <h3 className="font-bold text-base mb-3 tracking-tight">
                Sicherheit
              </h3>
              <ul className="space-y-2 text-sm text-gray-400 leading-relaxed">
                <li>Thailand ist generell sicher für Touristen</li>
                <li>Wertsachen im Safe lassen</li>
                <li>Roller = häufigste Unfallursache</li>
                <li className="text-red-300 font-medium">
                  Niemals Drogen — extrem strenge Gesetze
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* ═══ CONTACTS ════════════════════════════════════════════════ */}
      <section id="contacts" className="py-28 sm:py-40 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionIntro
            label="Kontakte"
            title="Wichtige Nummern"
            description="Notfallnummern, Krankenhäuser und Botschaften — hofft ihr nicht zu brauchen."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
            <Card>
              <h3 className="font-bold text-base mb-4 text-red-300 tracking-tight">
                Notfälle
              </h3>
              <ul className="space-y-3 text-sm">
                {[
                  ["Polizei", "191"],
                  ["Tourist Police", "1155"],
                  ["Samui Emergency", "699"],
                  ["Rettung", "1669"],
                ].map(([name, number]) => (
                  <li
                    key={name}
                    className="flex justify-between items-center"
                  >
                    <span className="text-gray-400">{name}</span>
                    <span className="font-mono text-white font-medium">
                      {number}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card>
              <h3 className="font-bold text-base mb-4 tracking-tight">
                Krankenhäuser
              </h3>
              <ul className="space-y-3.5 text-sm">
                <li>
                  <p className="text-gray-200 font-medium">
                    Samui International Hospital
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Chaweng ·{" "}
                    <span className="font-mono text-gray-400">
                      077 422 272
                    </span>
                  </p>
                </li>
                <li>
                  <p className="text-gray-200 font-medium">
                    Samui Hospital Nathon
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Nathon ·{" "}
                    <span className="font-mono text-gray-400">
                      077 421 230
                    </span>
                  </p>
                </li>
                <li>
                  <p className="text-gray-200 font-medium">
                    Immigration Office
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    <span className="font-mono text-gray-400">
                      077 421 069
                    </span>
                  </p>
                </li>
              </ul>
            </Card>

            <Card>
              <h3 className="font-bold text-base mb-4 tracking-tight">
                Botschaften
              </h3>
              <ul className="space-y-3.5 text-sm">
                <li>
                  <p className="text-gray-200 font-medium">
                    🇦🇹 Österr. Botschaft Bangkok
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    <span className="font-mono text-gray-400">
                      +66 2 105 6710
                    </span>
                  </p>
                </li>
                <li>
                  <p className="text-gray-200 font-medium">
                    🇦🇹 24h Notfall-Hotline
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    <span className="font-mono text-gray-400">
                      +43 1 90115 4411
                    </span>
                  </p>
                </li>
                <li>
                  <p className="text-gray-200 font-medium">
                    🇩🇪 Deutsche Botschaft (EU)
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    <span className="font-mono text-gray-400">
                      +66 2 287 9000
                    </span>
                  </p>
                </li>
              </ul>
            </Card>
          </div>

          <Card>
            <h3 className="font-bold text-base mb-5 tracking-tight">
              Buchungskontakte
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-emerald-500/10">
                  <Phone className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-0.5">
                    Buchung 1 — Boris
                  </p>
                  <p className="text-xs text-gray-400 font-mono">
                    +43 664 467 8382
                  </p>
                  <p className="text-xs text-gray-500">borplepay@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-cyan-500/10">
                  <Phone className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-0.5">
                    Buchung 2 — Ole
                  </p>
                  <p className="text-xs text-gray-400 font-mono">
                    +43 670 605 7595
                  </p>
                  <p className="text-xs text-gray-500">janole2333@gmail.com</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* ═══ TRAVEL TIPS POPUP ═════════════════════════════════════ */}
      <TravelTips />

      {/* ═══ FOOTER ══════════════════════════════════════════════════ */}
      <footer className="py-16 px-6 border-t border-white/[0.04]">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm text-gray-600 font-medium">
            🌴 5BHITM Maturareise 2026
          </p>
          <p className="text-xs text-gray-700 mt-1">Koh Samui, Thailand</p>
        </div>
      </footer>
    </div>
  );
}
