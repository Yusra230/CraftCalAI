import React, { useRef, useState } from "react";
import { Camera, Image as ImageIcon, X, RefreshCw } from "lucide-react";

export default function ImageDropzone({ imageBase64, imagePreview, onImageSelected, onImageRemoved }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const processFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("براہ کرم تصویر والی فائل منتخب کریں (PNG, JPG, WebP)");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      const base64Clean = result.split(",")[1];
      onImageSelected({
        base64: base64Clean,
        preview: result,
        mimeType: file.type,
        fileName: file.name
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full">
      {/* Hidden file inputs */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => processFile(e.target.files?.[0])}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={cameraInputRef}
        onChange={(e) => processFile(e.target.files?.[0])}
        accept="image/*"
        capture="environment"
        className="hidden"
      />

      {imagePreview ? (
        // Preview State
        <div className="relative rounded-3xl overflow-hidden border-3 border-amber-300 bg-stone-950 shadow-lg">
          <img
            src={imagePreview}
            alt="Craft Reference"
            className="w-full h-72 sm:h-96 object-contain bg-stone-950 mx-auto"
          />

          {/* Action buttons on top of preview */}
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-stone-900/90 hover:bg-stone-900 text-stone-100 px-4 py-2 rounded-2xl backdrop-blur-md border border-white/20 transition active:scale-95 shadow-md flex items-center gap-2 text-sm font-urdu leading-[2.2]"
              title="تصویر تبدیل کریں"
            >
              <RefreshCw className="w-4 h-4 text-amber-300" />
              <span>تبدیل کریں</span>
            </button>
            <button
              onClick={onImageRemoved}
              className="bg-red-600/95 hover:bg-red-700 text-white p-3 rounded-2xl backdrop-blur-md border border-white/20 transition active:scale-95 shadow-md"
              title="تصویر ہٹائیں"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute bottom-3 right-4 left-4 text-white text-right">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-urdu font-bold bg-emerald-600 text-white shadow-md mb-1 leading-[2.2]">
              تصویر منتخب ہو گئی ہے ✓
            </span>
          </div>
        </div>
      ) : (
        // Elder-Friendly Tactile Upload Zone with Massive Camera Icon
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => cameraInputRef.current?.click()}
          className={`relative border-3 border-dashed rounded-3xl p-6 sm:p-10 text-center transition cursor-pointer ${
            isDragging
              ? "border-[#b6613e] bg-amber-100/90 scale-[1.01]"
              : "border-amber-300 hover:border-[#b6613e] bg-amber-50/60 hover:bg-amber-100/60"
          } shadow-sm active:scale-99`}
        >
          <div className="flex flex-col items-center justify-center gap-4">
            
            {/* Massive Camera Icon Button */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#984d33] to-[#c5774e] text-white flex items-center justify-center shadow-xl hover:scale-105 transition duration-300">
              <Camera className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow" />
            </div>

            <div className="py-2">
              <h3 className="text-xl sm:text-2xl font-bold font-urdu text-stone-900 leading-[2.8]">
                کپڑے یا ڈیزائن کی فوٹو کھینچیں
              </h3>
              <p className="text-sm sm:text-base font-urdu text-stone-700 mt-1 max-w-sm mx-auto leading-[2.8]">
                یہاں کیمرے سے تصویر لیں یا فون کی گیلری سے سلائی کا ڈیزائن منتخب کریں
              </p>
            </div>

            {/* Elder-Friendly Big Touch Targets */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md pt-2" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-stone-900 hover:bg-black text-white text-base sm:text-lg font-urdu font-bold rounded-2xl shadow-md transition active:scale-95 leading-[2.2]"
              >
                <Camera className="w-6 h-6 text-amber-300" />
                <span>کیمرہ کھولیں</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-[#b6613e] hover:bg-[#984d33] text-white text-base sm:text-lg font-urdu font-bold rounded-2xl shadow-md transition active:scale-95 leading-[2.2]"
              >
                <ImageIcon className="w-6 h-6 text-amber-200" />
                <span>گیلری سے منتخب کریں</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
