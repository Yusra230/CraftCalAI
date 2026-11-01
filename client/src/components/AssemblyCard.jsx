import React, { useState, useEffect } from "react";
import { Layers, Lightbulb, Camera, Sparkles, RefreshCw, Maximize2, X } from "lucide-react";

export default function AssemblyCard({ assemblySteps = [], craftType = "Sewing" }) {
  const [stepImages, setStepImages] = useState({});
  const [loadingStepImages, setLoadingStepImages] = useState({});
  const [zoomedImage, setZoomedImage] = useState(null);

  const fetchDiagramForStep = async (step, forceRefresh = false) => {
    const stepNum = step.step_number;
    const prompt = step.visual_diagram_prompt_en || step.instruction_en || step.instruction_ur;

    if (!forceRefresh && (step.image_url || stepImages[stepNum])) {
      return;
    }

    setLoadingStepImages((prev) => ({ ...prev, [stepNum]: true }));

    try {
      const response = await fetch("/api/generate-step-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          stepNumber: stepNum,
          craftType
        })
      });

      const data = await response.json();
      if (data.imageUrl) {
        setStepImages((prev) => ({ ...prev, [stepNum]: data.imageUrl }));
      }
    } catch (err) {
      console.error(`Error generating photo for step ${stepNum}:`, err);
    } finally {
      setLoadingStepImages((prev) => ({ ...prev, [stepNum]: false }));
    }
  };

  useEffect(() => {
    assemblySteps.forEach((step) => {
      if (step.image_url) {
        setStepImages((prev) => ({ ...prev, [step.step_number]: step.image_url }));
      } else {
        fetchDiagramForStep(step);
      }
    });
  }, [assemblySteps, craftType]);

  return (
    <div className="w-full bg-white rounded-3xl p-4 sm:p-7 border-2 border-emerald-400 shadow-md">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 border-b border-stone-200 pb-4 mb-6">
        <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shadow-inner shrink-0">
          <Layers className="w-7 h-7" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-2xl sm:text-3xl font-bold font-urdu text-stone-900 leading-[2.4]">
              سلائی اور جوڑنے کے تصویری مراحل
            </h3>
            <span className="hidden sm:inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full font-sans font-bold">
              <Camera className="w-3.5 h-3.5" /> Real Photos
            </span>
          </div>
          <p className="text-sm sm:text-base font-urdu text-stone-600 mt-1 leading-[2.6]">
            ہر مرحلے کی حقیقی تصویر اور آسان ترین اردو رہنمائی
          </p>
        </div>
      </div>

      {/* Steps List */}
      <div className="space-y-8">
        {assemblySteps.map((step) => {
          const stepNum = step.step_number;
          const currentImage = stepImages[stepNum] || step.image_url;
          const isLoading = loadingStepImages[stepNum];

          return (
            <div
              key={stepNum}
              className="rounded-3xl border-2 border-stone-200 bg-stone-50/90 overflow-hidden shadow-sm transition hover:shadow-md"
            >
              
              {/* Top: Photorealistic Image in aspect-[4/3] container with object-cover */}
              <div className="relative w-full aspect-[4/3] bg-stone-200 overflow-hidden">
                {isLoading ? (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-r from-amber-50 via-emerald-50 to-amber-50 animate-pulse p-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center animate-bounce shadow">
                      <Camera className="w-7 h-7" />
                    </div>
                    <span className="font-urdu font-bold text-base sm:text-lg text-emerald-900 leading-[2.4]">
                      تصویر لوڈ ہو رہی ہے...
                    </span>
                    <p className="text-xs sm:text-sm font-urdu text-stone-600 max-w-xs leading-[2.2]">
                      استاد درزی کے ہاتھوں کی اصلی ورکشاپ تصویر تیار کی جا رہی ہے
                    </p>
                  </div>
                ) : currentImage ? (
                  <div className="relative w-full h-full group">
                    <img
                      src={currentImage}
                      alt={`Step ${stepNum} Crafting Step`}
                      className="w-full h-full object-cover cursor-pointer transition duration-300 group-hover:scale-102"
                      onClick={() => setZoomedImage(currentImage)}
                      loading="lazy"
                    />
                    
                    {/* Step number badge over image */}
                    <div className="absolute top-3 right-3 bg-stone-900/85 backdrop-blur-md text-white px-3.5 py-1.5 rounded-2xl flex items-center gap-2 shadow-lg border border-white/20">
                      <span className="w-6 h-6 rounded-full bg-emerald-500 text-white font-sans font-bold flex items-center justify-center text-xs">
                        {stepNum}
                      </span>
                      <span className="font-urdu font-bold text-sm">مرحلہ {stepNum}</span>
                    </div>

                    {/* Zoom icon button */}
                    <button
                      type="button"
                      onClick={() => setZoomedImage(currentImage)}
                      className="absolute bottom-3 left-3 bg-stone-900/80 hover:bg-stone-900 text-white p-2.5 rounded-xl backdrop-blur-md flex items-center gap-1.5 text-xs font-urdu transition shadow-lg active:scale-95"
                      title="بڑی تصویر دیکھیں"
                    >
                      <Maximize2 className="w-4 h-4 text-amber-300" />
                      <span className="hidden sm:inline">بڑی تصویر</span>
                    </button>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                    <p className="font-urdu text-sm text-stone-600 mb-3 leading-[2.4]">
                      تصویر لوڈ نہیں ہو سکی
                    </p>
                    <button
                      type="button"
                      onClick={() => fetchDiagramForStep(step, true)}
                      className="px-4 py-2 rounded-2xl bg-emerald-600 text-white text-sm font-urdu font-bold flex items-center gap-2 shadow active:scale-95"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>دوبارہ کوشش کریں</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Instructions Container with vertical padding py-3 and leading-[2.8] */}
              <div className="p-4 sm:p-6 space-y-3">
                
                {/* Step instruction in large, unclipped Nastaliq font */}
                <div className="py-2">
                  <p className="font-urdu text-lg sm:text-xl font-bold text-stone-900 leading-[2.8] text-right">
                    {step.instruction_ur}
                  </p>
                </div>

                {step.instruction_en && (
                  <p className="text-xs sm:text-sm text-stone-500 font-sans text-right">
                    {step.instruction_en}
                  </p>
                )}

                {/* Pro tip badge */}
                {step.tip && (
                  <div className="flex items-start gap-3 bg-amber-100/70 text-amber-950 text-sm sm:text-base font-urdu p-4 rounded-2xl border border-amber-300 mt-3">
                    <Lightbulb className="w-5 h-5 text-amber-700 shrink-0 mt-1" />
                    <span className="leading-[2.6]">
                      <strong className="font-bold text-amber-900">استاد درزی کا مشورہ:</strong> {step.tip}
                    </span>
                  </div>
                )}

              </div>

            </div>
          );
        })}
      </div>

      {/* Full-Screen Zoom Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/90 backdrop-blur-md animate-fade-in"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative max-w-4xl w-full bg-stone-900 rounded-3xl overflow-hidden shadow-2xl p-2 border border-stone-700" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-stone-950/80 text-white hover:bg-stone-900 transition"
              title="بند کریں"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={zoomedImage}
              alt="Zoomed Crafting Photo"
              className="w-full max-h-[85vh] object-contain rounded-2xl bg-stone-950"
            />
          </div>
        </div>
      )}

    </div>
  );
}
