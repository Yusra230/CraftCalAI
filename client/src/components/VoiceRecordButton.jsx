import React, { useState } from "react";
import { Mic, Square, Trash2, CheckCircle2 } from "lucide-react";

export default function VoiceRecordButton({
  isRecording,
  recordingDuration,
  audioUrl,
  onStartRecord,
  onStopRecord,
  onResetAudio,
  disabled
}) {
  // Format seconds to mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleToggleRecord = () => {
    if (disabled) return;
    if (isRecording) {
      onStopRecord();
    } else {
      onStartRecord();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full py-4 sm:py-6">
      
      {/* If Audio is already recorded */}
      {audioUrl && !isRecording ? (
        <div className="w-full bg-amber-100/90 border-2 border-amber-300 rounded-3xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow shrink-0">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold font-urdu text-stone-900 leading-[2.4]">
                آپ کی آواز ریکارڈ ہو گئی ہے ✓
              </h4>
              <p className="text-xs text-stone-600 font-sans">
                آڈیو مدت: {formatTime(recordingDuration || 3)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <audio
              src={audioUrl}
              controls
              className="h-10 w-full sm:w-48"
            />
            <button
              onClick={onResetAudio}
              className="p-3 text-stone-600 hover:text-red-600 hover:bg-red-100 rounded-2xl transition bg-white border border-stone-200 shadow-sm shrink-0"
              title="دوبارہ بولیں"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        // Elder-Friendly Massive Mic Button (w-32 h-32)
        <div className="flex flex-col items-center">
          <div className="relative flex items-center justify-center">
            {/* Pulsing ring waves when recording */}
            {isRecording && (
              <>
                <span className="absolute w-44 h-44 rounded-full bg-red-500/20 animate-ping" />
                <span className="absolute w-38 h-38 rounded-full bg-[#b6613e]/30 animate-pulse" />
              </>
            )}

            {/* Massive w-32 h-32 button */}
            <button
              type="button"
              disabled={disabled}
              onClick={handleToggleRecord}
              className={`relative z-10 w-32 h-32 sm:w-36 sm:h-36 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all duration-300 active:scale-95 border-4 border-white ${
                disabled
                  ? "bg-stone-300 text-stone-400 cursor-not-allowed"
                  : isRecording
                  ? "bg-red-600 text-white ring-8 ring-red-300 animate-pulse"
                  : "bg-gradient-to-tr from-[#7b3f2d] via-[#b6613e] to-[#c5774e] text-white hover:shadow-2xl hover:scale-105"
              }`}
            >
              {isRecording ? (
                <Square className="w-14 h-14 fill-current" />
              ) : (
                <Mic className="w-16 h-16 drop-shadow-md" />
              )}
            </button>
          </div>

          {/* Status Label & Instructions */}
          <div className="mt-5 text-center">
            {isRecording ? (
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 text-red-600 font-bold font-urdu text-lg sm:text-xl animate-pulse">
                  <span className="w-3.5 h-3.5 rounded-full bg-red-600 inline-block animate-ping" />
                  <span>آواز ریکارڈ ہو رہی ہے... ({formatTime(recordingDuration)})</span>
                </div>
                
                {/* Audio visualizer bar animation */}
                <div className="flex items-center gap-1.5 h-8">
                  <span className="w-1.5 bg-red-500 rounded-full animate-bar-1" />
                  <span className="w-1.5 bg-red-500 rounded-full animate-bar-2" />
                  <span className="w-1.5 bg-red-500 rounded-full animate-bar-3" />
                  <span className="w-1.5 bg-red-500 rounded-full animate-bar-4" />
                  <span className="w-1.5 bg-red-500 rounded-full animate-bar-5" />
                </div>
                
                <p className="text-sm font-urdu font-semibold text-stone-700 leading-[2.6]">
                  بات مکمل ہونے پر لال بٹن دوبارہ دبائیں
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center px-2">
                <span className="font-urdu font-bold text-stone-900 text-xl sm:text-2xl leading-[2.6]">
                  یہاں دبا کر اردو میں بولیں
                </span>
                <div className="py-2">
                  <p className="text-sm sm:text-base font-urdu text-stone-700 max-w-sm text-center leading-[2.8]">
                    مثال: <span className="font-bold text-[#984d33]">"بیٹا، اس کے لیے کتنا کپڑا چاہیے اور لیپ ٹاپ فٹ ہونا چاہیے؟"</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
