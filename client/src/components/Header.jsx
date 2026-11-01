import React from "react";
import { Scissors, Sparkles, HelpCircle } from "lucide-react";

export default function Header({ onOpenPresets, hasResult }) {
  return (
    <header className="bg-gradient-to-r from-[#984d33] via-[#b6613e] to-[#7b3f2d] text-white shadow-lg sticky top-0 z-30">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Right side in RTL: Brand title & Icon */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 shadow-inner">
            <Scissors className="w-6 h-6 text-amber-200 transform -rotate-45" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-bold font-urdu tracking-tight leading-none text-white">
                کرافٹ کیلک <span className="text-amber-300 font-sans text-lg font-extrabold tracking-normal">AI</span>
              </h1>
              <span className="bg-amber-400/20 text-amber-200 text-xs px-2 py-0.5 rounded-full border border-amber-300/30 font-sans hidden sm:inline-block">
                Voice & Vision
              </span>
            </div>
            <p className="text-xs text-amber-100/90 font-urdu mt-0.5">
              درزیوں اور ماؤں کے لیے بول کر کٹنگ ناپ معلوم کرنے کا آسان ترین ذریعہ
            </p>
          </div>
        </div>

        {/* Left side in RTL: Action presets button */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPresets}
            className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 active:scale-95 text-white text-xs md:text-sm font-urdu font-medium px-3.5 py-2 rounded-xl backdrop-blur-sm border border-white/25 transition shadow-sm"
            title="تیار شدہ نمونے دیکھیں"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>نمونے (Presets)</span>
          </button>
        </div>

      </div>
    </header>
  );
}
