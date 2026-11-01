import React from "react";
import { X, Sparkles, ArrowRight, Play } from "lucide-react";
import { samplePresets } from "../data/samplePresets.js";

export default function PresetsModal({ isOpen, onClose, onSelectPreset }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl border border-stone-200 flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-gradient-to-r from-amber-50 to-orange-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#b6613e] text-white flex items-center justify-center shadow">
              <Sparkles className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <h3 className="font-urdu font-bold text-lg text-stone-900 leading-tight">
                تیار شدہ نمونے (Sample Presets)
              </h3>
              <p className="text-xs font-urdu text-stone-500">
                بغیر مائیک یا تصویر کے فوری ٹیسٹ کرنے کے لیے کسی ایک کو منتخب کریں
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Presets List */}
        <div className="p-5 overflow-y-auto space-y-4">
          {samplePresets.map((preset) => (
            <div
              key={preset.id}
              onClick={() => {
                onSelectPreset(preset);
                onClose();
              }}
              className="group border border-stone-200 hover:border-[#b6613e] bg-stone-50/60 hover:bg-amber-50/40 rounded-2xl p-4 transition-all duration-200 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-xs"
            >
              <img
                src={preset.imageUrl}
                alt={preset.title_en}
                className="w-full sm:w-24 h-24 rounded-xl object-cover border border-stone-200 shrink-0"
              />

              <div className="flex-1 text-right">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs bg-amber-100 text-[#984d33] font-urdu font-semibold px-2.5 py-0.5 rounded-full">
                    {preset.category}
                  </span>
                  <span className="text-xs text-stone-400 font-sans">{preset.title_en}</span>
                </div>

                <h4 className="font-urdu font-bold text-base text-stone-900 group-hover:text-[#984d33] transition leading-snug">
                  {preset.title_ur}
                </h4>

                <p className="font-urdu text-xs text-stone-600 mt-1 italic leading-relaxed">
                  🗣️ "{preset.userQuery_ur}"
                </p>
              </div>

              <button
                type="button"
                className="self-end sm:self-center shrink-0 flex items-center gap-1.5 px-3.5 py-2 bg-[#b6613e] group-hover:bg-[#984d33] text-white text-xs font-urdu font-medium rounded-xl shadow transition active:scale-95"
              >
                <span>یہ آزمائیں</span>
                <Play className="w-3.5 h-3.5 fill-current" />
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-100 text-center">
          <p className="text-xs font-urdu text-stone-500">
            آپ خود بھی اوپر کیمرے سے تصویر کھینچ کر اور مائیک سے بول کر حساب لگا سکتے ہیں
          </p>
        </div>

      </div>
    </div>
  );
}
