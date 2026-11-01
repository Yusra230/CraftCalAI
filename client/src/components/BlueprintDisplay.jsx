import React from "react";
import { Scissors, Ruler, Check, Printer } from "lucide-react";
import AssemblyCard from "./AssemblyCard";

export default function BlueprintDisplay({ blueprint }) {
  if (!blueprint) return null;

  const {
    title_ur,
    title_en,
    summary_ur,
    craft_type,
    material_estimate,
    cut_list,
    assembly_steps
  } = blueprint;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full flex flex-col space-y-7 overflow-x-hidden">

      {/* Top Banner for Blueprint */}
      <div className="w-full bg-white rounded-3xl p-5 sm:p-7 border-2 border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="w-full">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="bg-amber-100 text-[#984d33] text-sm font-urdu font-bold px-4 py-1.5 rounded-full border border-amber-300">
              {craft_type || "سلائی / کرافٹ"}
            </span>
            <span className="text-xs sm:text-sm text-stone-500 font-sans">{title_en}</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-urdu text-stone-900 leading-[2.6] break-words py-1">
            {title_ur}
          </h2>
          
          {summary_ur && (
            <div className="mt-3 bg-amber-50/70 p-4 sm:p-5 rounded-2xl border border-amber-200/80">
              <p className="font-urdu text-base sm:text-lg text-stone-800 leading-[2.8] py-1">
                {summary_ur}
              </p>
            </div>
          )}
        </div>

        <button
          onClick={handlePrint}
          className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-sm sm:text-base font-urdu font-bold transition active:scale-95 border-2 border-stone-300 shadow-sm leading-[2.2]"
          title="نقشہ پرنٹ کریں"
        >
          <Printer className="w-5 h-5 text-stone-700" />
          <span>پرنٹ کریں / محفوظ کریں</span>
        </button>
      </div>

      {/* CARD 1: Material Estimate (ضروری کپڑا اور سامان) - Single column on mobile */}
      <div className="w-full flex flex-col bg-white rounded-3xl p-5 sm:p-7 border-3 border-amber-300 shadow-md">
        
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-200 pb-4 mb-5 gap-3">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-[#b6613e] flex items-center justify-center shadow-inner shrink-0">
              <Ruler className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold font-urdu text-stone-900 leading-[2.4]">
                ضروری کپڑا اور سامان
              </h3>
              <p className="text-sm font-urdu text-stone-600 mt-1 leading-[2.4]">
                درزی کے ناپ کے مطابق کل تخمینہ
              </p>
            </div>
          </div>

          {material_estimate.wastage_buffer_percent && (
            <span className="self-start sm:self-auto bg-emerald-100 text-emerald-900 text-sm font-urdu font-bold px-4 py-2 rounded-full border border-emerald-300 shadow-sm leading-[2.2]">
              اضافی مارجن: {material_estimate.wastage_buffer_percent}%
            </span>
          )}
        </div>

        {/* Fabric Breakdown Boxes */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          
          <div className="flex-1 bg-amber-50/90 rounded-2xl p-5 border-2 border-amber-200">
            <span className="text-sm font-urdu text-stone-600 block mb-1 leading-[2.4]">
              کل درکار کپڑا / اون (Total Yardage):
            </span>
            <div className="text-2xl sm:text-3xl font-bold font-urdu text-[#984d33] leading-[2.4] py-1">
              {material_estimate.total_yardage}
            </div>
            <p className="text-sm sm:text-base font-urdu text-stone-800 mt-2 leading-[2.6]">
              بنیادی مٹیریل: <span className="font-bold">{material_estimate.primary_material}</span>
            </p>
          </div>

          <div className="flex-1 bg-stone-50 rounded-2xl p-5 border-2 border-stone-200">
            <span className="text-sm font-urdu text-stone-600 block mb-1 leading-[2.4]">
              کپڑے کا عرض / سوئی ناپ (Width / Hook Requirement):
            </span>
            <div className="text-xl sm:text-2xl font-bold font-urdu text-stone-800 leading-[2.4] py-1">
              {material_estimate.width_requirement || "معیاری عرض (Standard Width)"}
            </div>
            <p className="text-xs sm:text-sm text-stone-500 font-sans mt-1">
              Standard Arz / Gauge Requirement
            </p>
          </div>

        </div>

        {/* Secondary materials / notions */}
        {material_estimate.secondary_materials && material_estimate.secondary_materials.length > 0 && (
          <div>
            <h4 className="text-base sm:text-lg font-bold font-urdu text-stone-900 mb-3 leading-[2.6]">
              دیگر درکار اشیاء (استر، بکرم، زپ، یا رنگ):
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {material_estimate.secondary_materials.map((item, idx) => (
                <span
                  key={idx}
                  className="bg-stone-100 text-stone-900 font-urdu font-medium text-sm sm:text-base px-4 py-2 rounded-2xl border border-stone-300 flex items-center gap-2 leading-[2.4]"
                >
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </span>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* CARD 2: Cut List (کٹنگ لسٹ / کٹنگ پیسز) - Single column on mobile */}
      <div className="w-full flex flex-col bg-white rounded-3xl p-5 sm:p-7 border-3 border-stone-200 shadow-md">
        
        {/* Card Header */}
        <div className="flex items-center gap-4 border-b border-stone-200 pb-4 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shadow-inner shrink-0">
            <Scissors className="w-7 h-7 transform -rotate-45" />
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold font-urdu text-stone-900 leading-[2.4]">
              کٹنگ لسٹ (Cut List)
            </h3>
            <p className="text-sm font-urdu text-stone-600 mt-1 leading-[2.4]">
              سلائی مارجن شامل کر کے ٹکڑوں کی تفصیلی کٹنگ
            </p>
          </div>
        </div>

        {/* Cut List Rows */}
        <div className="space-y-4">
          {cut_list.map((cut, idx) => (
            <div
              key={idx}
              className="bg-stone-50/90 hover:bg-stone-100/90 rounded-2xl p-4 sm:p-5 border-2 border-stone-200 transition flex flex-col md:flex-row md:items-center justify-between gap-4 overflow-hidden"
            >
              <div className="space-y-2 w-full">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-sans font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <h4 className="font-urdu font-bold text-lg sm:text-xl text-stone-900 leading-[2.6]">
                    {cut.piece_name_ur}
                  </h4>
                  {cut.piece_name_en && (
                    <span className="text-xs sm:text-sm text-stone-400 font-sans">
                      ({cut.piece_name_en})
                    </span>
                  )}
                </div>

                {cut.notes && (
                  <p className="font-urdu text-sm sm:text-base text-stone-700 leading-[2.8] pr-10">
                    💡 {cut.notes}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2.5 self-start md:self-center shrink-0 pr-10 md:pr-0">
                <span className="bg-white px-4 py-2 rounded-2xl border border-stone-300 font-urdu font-bold text-sm sm:text-base text-[#984d33] shadow-sm leading-[2.2]">
                  ناپ: {cut.dimensions}
                </span>

                <span className="bg-blue-100 text-blue-900 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-urdu font-bold leading-[2.2]">
                  تعداد: {cut.quantity} عدد
                </span>

                {cut.cut_type && (
                  <span className="bg-amber-100 text-amber-900 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-urdu font-semibold leading-[2.2]">
                    {cut.cut_type}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* CARD 3: Photorealistic Visual Assembly Steps (AssemblyCard) */}
      <AssemblyCard
        assemblySteps={assembly_steps}
        craftType={craft_type}
      />

    </div>
  );
}
