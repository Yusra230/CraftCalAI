import React, { useState } from "react";
import { ChevronDown, ChevronUp, Keyboard, Sparkles, X } from "lucide-react";

export default function TextFallbackInput({ textPrompt, onTextChange, disabled }) {
  const [isOpen, setIsOpen] = useState(false);

  const quickChips = [
    "13 ضرب 9 انچ کا لیپ ٹاپ فٹ ہونا چاہیے",
    "کیا 2 گز کپڑے میں فل آستین بن جائیں گی؟",
    "زیرو ویسٹ: 8 سینٹی میٹر مربع ٹکڑوں کا حساب لگائیں",
    "بچے کے ناپ (6 تا 8 سال) کے مطابق ناپ چاہیے",
  ];

  return (
    <div className="w-full mt-2 border border-stone-200 rounded-2xl bg-white/80 shadow-sm overflow-hidden transition">
      {/* Accordion Header */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full px-4 py-3 flex items-center justify-between text-right hover:bg-stone-50 transition"
      >
        <div className="flex items-center gap-2 text-stone-700">
          <Keyboard className="w-4 h-4 text-[#b6613e]" />
          <span className="font-urdu font-medium text-sm text-stone-800">
            یا لکھ کر بتائیں (اگر مائیک نہ چل رہا ہو یا ڈیسک ٹاپ پر ہوں)
          </span>
          {textPrompt && textPrompt.trim() && (
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
          )}
        </div>
        <div className="text-stone-400">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Accordion Body */}
      {isOpen && (
        <div className="p-4 pt-2 border-t border-stone-100 bg-amber-50/30">
          <div className="relative">
            <textarea
              rows={3}
              value={textPrompt}
              onChange={(e) => onTextChange(e.target.value)}
              placeholder="مثلاً: 'بیٹا، اس ڈیزائن کے لیے کتنا کپڑا لگے گا اور 13 انچ کا لیپ ٹاپ فٹ آنا چاہیے...' یا انگریزی میں لکھیں"
              className="w-full p-3 rounded-xl border border-stone-300 focus:border-[#b6613e] focus:ring-2 focus:ring-[#b6613e]/20 text-stone-900 font-urdu text-sm placeholder:text-stone-600 outline-none resize-none bg-white transition leading-relaxed text-right"
              dir="auto"
              disabled={disabled}
            />
            {textPrompt && (
              <button
                type="button"
                onClick={() => onTextChange("")}
                className="absolute top-2.5 left-2.5 p-1 rounded-md text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition"
                title="صاف کریں"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick-fill suggestion chips */}
          <div className="mt-3">
            <div className="flex items-center gap-1.5 text-xs text-stone-500 font-urdu mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>فوری سوالات (کلک کر کے شامل کریں):</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {quickChips.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onTextChange(chip)}
                  className="text-xs font-urdu bg-white hover:bg-amber-100/70 border border-stone-200 hover:border-amber-300 text-stone-700 px-2.5 py-1 rounded-lg transition active:scale-95 shadow-2xs"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
