import React, { useState, useEffect } from "react";
import { Scissors, Sparkles, Ruler } from "lucide-react";

export default function LoadingState() {
  const steps = [
    "تصویر اور کپڑے کا باریک بینی سے معائنہ کیا جا رہا ہے...",
    "آپ کی آواز کی ہدایات اور ناپ کا حساب لگایا جا رہا ہے...",
    "درزی کٹنگ کے مطابق گز، ارض اور کٹ لسٹ تیار ہو رہی ہے...",
    "سلائی کے مراحل اور درزی کے قیمتی مشورے لکھے جا رہے ہیں...",
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev + 1) % steps.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="w-full space-y-6 my-6">
      {/* Top Banner Notice with rotating Urdu step */}
      <div className="bg-gradient-to-r from-amber-100 via-orange-100 to-amber-100 border border-amber-300 rounded-3xl p-5 shadow-sm text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-full bg-[#b6613e] text-white flex items-center justify-center animate-spin">
            <Scissors className="w-4 h-4 transform -rotate-45" />
          </div>
          <h3 className="font-urdu font-bold text-lg md:text-xl text-[#7b3f2d]">
            کرافٹ کیلک جیمنائی AI نقشہ تیار کر رہا ہے
          </h3>
        </div>

        <p className="font-urdu text-base text-stone-800 font-medium min-h-[32px] transition-all duration-500 animate-pulse">
          {steps[currentStepIndex]}
        </p>

        {/* Mini progress track */}
        <div className="w-48 h-1.5 bg-amber-200/60 rounded-full mx-auto mt-3 overflow-hidden">
          <div className="h-full bg-[#b6613e] rounded-full animate-[pulse_1.5s_ease-in-out_infinite] w-3/4" />
        </div>
      </div>

      {/* 3-Card Pulsing Skeleton Loader */}
      <div className="grid grid-cols-1 gap-6">

        {/* Skeleton Card 1: Material Estimate */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm animate-pulse space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100" />
              <div className="space-y-2">
                <div className="h-5 w-40 bg-stone-200 rounded-lg" />
                <div className="h-3.5 w-24 bg-stone-100 rounded-md" />
              </div>
            </div>
            <div className="h-7 w-20 bg-amber-100 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="h-20 bg-amber-50/60 rounded-2xl border border-amber-100 p-3 space-y-2">
              <div className="h-3 w-20 bg-stone-200 rounded" />
              <div className="h-6 w-32 bg-stone-300 rounded" />
            </div>
            <div className="h-20 bg-stone-50 rounded-2xl border border-stone-100 p-3 space-y-2">
              <div className="h-3 w-20 bg-stone-200 rounded" />
              <div className="h-6 w-28 bg-stone-300 rounded" />
            </div>
          </div>

          <div className="h-4 w-full bg-stone-100 rounded" />
          <div className="h-4 w-4/5 bg-stone-100 rounded" />
        </div>

        {/* Skeleton Card 2: Cut List */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm animate-pulse space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100" />
            <div className="space-y-2">
              <div className="h-5 w-36 bg-stone-200 rounded-lg" />
              <div className="h-3.5 w-28 bg-stone-100 rounded-md" />
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-stone-50 rounded-2xl border border-stone-100 p-3 flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-stone-200 rounded" />
                  <div className="h-3 w-48 bg-stone-100 rounded" />
                </div>
                <div className="h-8 w-16 bg-stone-200 rounded-xl" />
              </div>
            ))}
          </div>
        </div>

        {/* Skeleton Card 3: Assembly Steps */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm animate-pulse space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100" />
            <div className="space-y-2">
              <div className="h-5 w-44 bg-stone-200 rounded-lg" />
              <div className="h-3.5 w-32 bg-stone-100 rounded-md" />
            </div>
          </div>

          <div className="space-y-4 pt-2">
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-100 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-full bg-stone-200 rounded" />
                  <div className="h-4 w-3/4 bg-stone-100 rounded" />
                  <div className="h-6 w-1/2 bg-amber-50 rounded-lg border border-amber-100" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
