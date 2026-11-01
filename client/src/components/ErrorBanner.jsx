import React from "react";
import { AlertTriangle, RefreshCw, X } from "lucide-react";

export default function ErrorBanner({ error, onRetry, onDismiss }) {
  if (!error) return null;

  const messageUr = error.message_ur || "معذرت، حساب کتاب میں کوئی مسئلہ پیش آیا۔ براہ کرم دوبارہ کوشش کریں۔";
  const messageEn = error.message_en;

  return (
    <div className="w-full my-4 rounded-3xl bg-amber-50 border-2 border-red-300 p-5 shadow-md relative overflow-hidden transition-all duration-300">
      <div className="flex items-start gap-4">
        {/* Warning Icon */}
        <div className="w-11 h-11 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shrink-0 border border-red-200 mt-0.5 shadow-sm">
          <AlertTriangle className="w-6 h-6" />
        </div>

        {/* Content */}
        <div className="flex-1 text-right">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-urdu font-bold text-lg text-red-900 leading-snug">
              توجہ فرمائیں!
            </h4>
            <button
              onClick={onDismiss}
              className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 rounded-xl transition"
              title="بند کریں"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="font-urdu text-base text-stone-800 font-medium mt-1 leading-relaxed">
            {messageUr}
          </p>

          {messageEn && (
            <p className="text-xs text-stone-600 font-sans mt-0.5">
              {messageEn}
            </p>
          )}

          {/* Quick Guidance Tips */}
          <div className="mt-3 pt-3 border-t border-amber-200/80 flex flex-wrap items-center justify-between gap-3">
            <ul className="text-xs font-urdu text-stone-700 list-disc list-inside space-y-0.5">
              <li>تصویر سیدھی اور مناسب روشنی میں لیں۔</li>
              <li>مائیکروفون کے قریب صاف آواز میں بولیں یا نیچے دیے گئے خانے میں لکھیں۔</li>
            </ul>

            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs md:text-sm font-urdu font-medium shadow transition active:scale-95"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>دوبارہ کوشش کریں</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
