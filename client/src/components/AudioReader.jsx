import React from "react";
import { Volume2, VolumeX, Pause, Play, RotateCcw } from "lucide-react";

export default function AudioReader({
  speechScript,
  isSpeaking,
  isPaused,
  onSpeak,
  onPause,
  onResume,
  onStop
}) {
  if (!speechScript) return null;

  return (
    <div className="w-full bg-gradient-to-br from-amber-100/90 via-orange-50 to-amber-100/80 border-3 border-amber-400 rounded-3xl p-5 sm:p-7 shadow-md mb-6 transition">
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
        
        {/* Prominent Speaker Icon Button (Elder-Friendly Tactile Design) */}
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative shrink-0">
            {isSpeaking && !isPaused && (
              <span className="absolute -inset-2 rounded-full bg-amber-400/50 animate-ping" />
            )}
            
            <button
              type="button"
              onClick={isSpeaking ? (isPaused ? onResume : onPause) : () => onSpeak(speechScript)}
              className={`relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 active:scale-95 border-4 border-white ${
                isSpeaking
                  ? "bg-gradient-to-tr from-[#984d33] to-[#c5774e] text-white ring-4 ring-amber-300"
                  : "bg-gradient-to-tr from-[#b6613e] to-[#c5774e] text-white hover:scale-105"
              }`}
              title={isSpeaking ? (isPaused ? "آواز دوبارہ چلائیں" : "روکیں") : "پڑھ کر سنائیں"}
            >
              {isSpeaking ? (
                isPaused ? <Play className="w-10 h-10 fill-current ml-1" /> : <Pause className="w-10 h-10 fill-current" />
              ) : (
                <Volume2 className="w-12 h-12 text-white drop-shadow" />
              )}
            </button>
          </div>

          <div className="flex-1 py-1">
            <div className="flex items-center gap-2">
              <h3 className="font-urdu font-bold text-xl sm:text-2xl text-stone-900 leading-[2.6]">
                آواز میں سنیں (Listen)
              </h3>
              {isSpeaking && !isPaused && (
                <div className="flex items-center gap-1 h-6">
                  <span className="w-1.5 bg-[#b6613e] rounded-full animate-bar-1" />
                  <span className="w-1.5 bg-[#b6613e] rounded-full animate-bar-2" />
                  <span className="w-1.5 bg-[#b6613e] rounded-full animate-bar-3" />
                  <span className="w-1.5 bg-[#b6613e] rounded-full animate-bar-4" />
                </div>
              )}
            </div>
            <p className="text-sm sm:text-base font-urdu text-stone-700 leading-[2.6]">
              اسپیکر کا بٹن دبائیں تاکہ درزی کا نقشہ بول کر سنایا جائے
            </p>
          </div>
        </div>

        {/* Action button: Stop or Replay */}
        {isSpeaking && (
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end pt-2 sm:pt-0">
            <button
              type="button"
              onClick={() => onSpeak(speechScript)}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white border border-stone-300 text-stone-800 text-sm font-urdu font-bold hover:bg-amber-100 transition shadow-sm leading-[2.2]"
            >
              <RotateCcw className="w-4 h-4" />
              <span>دوبارہ سنیں</span>
            </button>
            <button
              type="button"
              onClick={onStop}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-red-600 text-white text-sm font-urdu font-bold hover:bg-red-700 transition shadow-sm leading-[2.2]"
            >
              <VolumeX className="w-4 h-4" />
              <span>آواز بند کریں</span>
            </button>
          </div>
        )}

      </div>

      {/* Spoken Text Quote in large unclipped Nastaliq font */}
      <div className="mt-5 pt-4 border-t-2 border-amber-300/80 bg-white/80 p-5 rounded-2xl shadow-inner">
        <p className="font-urdu text-lg sm:text-xl text-stone-900 leading-[3] text-right py-2">
          "{speechScript}"
        </p>
      </div>

    </div>
  );
}
