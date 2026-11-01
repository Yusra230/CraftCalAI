import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Calculator, RotateCcw } from "lucide-react";

import Header from "./components/Header";
import ImageDropzone from "./components/ImageDropzone";
import VoiceRecordButton from "./components/VoiceRecordButton";
import TextFallbackInput from "./components/TextFallbackInput";
import LoadingState from "./components/LoadingState";
import ErrorBanner from "./components/ErrorBanner";
import BlueprintDisplay from "./components/BlueprintDisplay";
import AudioReader from "./components/AudioReader";
import PresetsModal from "./components/PresetsModal";

import { useAudioRecorder } from "./hooks/useAudioRecorder";
import { useSpeechSynthesis } from "./hooks/useSpeechSynthesis";

export default function App() {
  // Input State
  const [imageBase64, setImageBase64] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageMimeType, setImageMimeType] = useState("image/jpeg");
  const [textPrompt, setTextPrompt] = useState("");

  // Processing State
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [blueprint, setBlueprint] = useState(null);
  const [isPresetsOpen, setIsPresetsOpen] = useState(false);

  // Hooks
  const {
    isRecording,
    audioBase64,
    audioUrl,
    mimeType: audioMimeType,
    recordingDuration,
    audioError,
    startRecording,
    stopRecording,
    resetAudio,
  } = useAudioRecorder();

  const {
    isSpeaking,
    isPaused,
    speak,
    pause,
    resume,
    stop
  } = useSpeechSynthesis();

  // Show audio recording error in main error banner if occurs
  useEffect(() => {
    if (audioError) {
      setError({
        code: "MIC_ERROR",
        message_ur: audioError,
        message_en: "Microphone error."
      });
    }
  }, [audioError]);

  const handleImageSelected = ({ base64, preview, mimeType }) => {
    setImageBase64(base64);
    setImagePreview(preview);
    setImageMimeType(mimeType);
    setError(null);
  };

  const handleImageRemoved = () => {
    setImageBase64(null);
    setImagePreview(null);
  };

  const handleResetAll = () => {
    stop();
    setImageBase64(null);
    setImagePreview(null);
    setTextPrompt("");
    resetAudio();
    setBlueprint(null);
    setError(null);
  };

  const handleSelectPreset = (preset) => {
    stop();
    setImagePreview(preset.imageUrl);
    setTextPrompt(preset.userQuery_ur);
    setBlueprint(preset.blueprint);
    setError(null);

    // Read blueprint aloud sequentially
    if (preset.blueprint?.speech_script_ur) {
      setTimeout(() => {
        speak(preset.blueprint.speech_script_ur, "ur-PK");
      }, 500);
    }

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 }
      });
    } catch (e) {}
  };

  const handleCalculateBlueprint = async () => {
    if (!imageBase64 && !imagePreview) {
      setError({
        code: "MISSING_IMAGE",
        message_ur: "براہ کرم پہلے کپڑے یا ڈیزائن کی تصویر منتخب کریں۔",
        message_en: "Please select an image of the garment or craft first."
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    stop();

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          imageBase64,
          imageMimeType,
          audioBase64: audioBase64 || null,
          audioMimeType: audioMimeType || "audio/webm",
          textPrompt: textPrompt || null,
          language: "ur"
        })
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw data.error || {
          message_ur: "حساب کتاب مکمل نہیں ہو سکا۔ براہ کرم دوبارہ کوشش کریں۔",
          message_en: "Failed to generate craft blueprint."
        };
      }

      setBlueprint(data.blueprint);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      // Automatically read aloud the generated Urdu speech script
      if (data.blueprint?.speech_script_ur) {
        speak(data.blueprint.speech_script_ur, "ur-PK");
      }

      // Smooth scroll to blueprint
      window.scrollTo({ top: 450, behavior: "smooth" });

    } catch (err) {
      console.error("Submission Error:", err);
      setError({
        code: err.code || "REQUEST_FAILED",
        message_ur: err.message_ur || "معذرت، رابطہ قائم نہیں ہو سکا۔ براہ کرم انٹرنیٹ یا سرور چیک کریں۔",
        message_en: err.message_en || "Request failed."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isSubmitReady = Boolean(imageBase64 || imagePreview);

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf7f4] text-stone-900 pb-20 font-urdu overflow-x-hidden selection:bg-amber-200" dir="rtl">
      
      {/* App Header */}
      <Header
        onOpenPresets={() => setIsPresetsOpen(true)}
        hasResult={Boolean(blueprint)}
      />

      {/* Main Single Column Container: strictly stacks as single column on mobile */}
      <main className="flex flex-col w-full px-4 space-y-7 max-w-full md:max-w-3xl mx-auto flex-1 pt-5 sm:pt-8">

        {/* Elder-Friendly Introduction banner */}
        {!blueprint && !isLoading && (
          <div className="text-center py-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 leading-[2.6] py-1">
              تصویر دکھائیں، بولیں، اور ناپ پائیں
            </h2>
            <div className="py-2">
              <p className="text-stone-700 text-sm sm:text-base md:text-lg max-w-lg mx-auto leading-[2.8]">
                کی بورڈ استعمال کرنے کی ضرورت نہیں۔ فوٹو لگائیں، مائیک دبا کر سوال پوچھیں اور فوری درزی کا نقشہ حاصل کریں۔
              </p>
            </div>
          </div>
        )}

        {/* Error Alert Banner */}
        <ErrorBanner
          error={error}
          onRetry={handleCalculateBlueprint}
          onDismiss={() => setError(null)}
        />

        {/* Input Card: Massive tactile controls designed for elders */}
        <div className="w-full flex flex-col bg-white rounded-3xl p-5 sm:p-8 border-2 border-stone-200 shadow-md space-y-7">
          
          {/* Step 1: Image Dropzone */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="flex items-center gap-3 font-urdu font-bold text-base sm:text-lg text-stone-900 leading-[2.4]">
                <span className="w-7 h-7 rounded-full bg-[#b6613e] text-white text-xs font-sans font-bold flex items-center justify-center shrink-0">
                  1
                </span>
                <span>ڈیزائن یا کپڑے کی تصویر</span>
              </span>
              {imagePreview && (
                <button
                  onClick={handleImageRemoved}
                  className="text-sm font-bold text-red-600 hover:underline font-urdu leading-[2.2]"
                >
                  تصویر ہٹائیں
                </button>
              )}
            </div>

            <ImageDropzone
              imageBase64={imageBase64}
              imagePreview={imagePreview}
              onImageSelected={handleImageSelected}
              onImageRemoved={handleImageRemoved}
            />
          </div>

          {/* Step 2: Voice Note Recording */}
          <div className="pt-4 border-t-2 border-stone-100">
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-3 font-urdu font-bold text-base sm:text-lg text-stone-900 leading-[2.4]">
                <span className="w-7 h-7 rounded-full bg-[#b6613e] text-white text-xs font-sans font-bold flex items-center justify-center shrink-0">
                  2
                </span>
                <span>اپنی آواز میں سوال پوچھیں</span>
              </span>
              <span className="text-xs sm:text-sm font-urdu text-stone-500 leading-[2.2]">
                (مائیک دبا کر بولیں)
              </span>
            </div>

            <VoiceRecordButton
              isRecording={isRecording}
              recordingDuration={recordingDuration}
              audioUrl={audioUrl}
              onStartRecord={startRecording}
              onStopRecord={stopRecording}
              onResetAudio={resetAudio}
              disabled={isLoading}
            />

            {/* Fallback Accordion for Typing */}
            <TextFallbackInput
              textPrompt={textPrompt}
              onTextChange={setTextPrompt}
              disabled={isLoading}
            />
          </div>

          {/* Big Tactile Action Button: Calculate Blueprint */}
          <div className="pt-4 border-t-2 border-stone-100 flex flex-col sm:flex-row items-center gap-4">
            <button
              type="button"
              disabled={!isSubmitReady || isLoading}
              onClick={handleCalculateBlueprint}
              className={`w-full py-5 rounded-2xl font-urdu font-bold text-lg sm:text-xl md:text-2xl shadow-xl transition-all duration-200 flex items-center justify-center gap-4 active:scale-98 leading-[2.4] ${
                isSubmitReady && !isLoading
                  ? "bg-gradient-to-r from-[#7b3f2d] via-[#b6613e] to-[#c5774e] text-white hover:shadow-2xl hover:brightness-105 cursor-pointer"
                  : "bg-stone-200 text-stone-400 cursor-not-allowed shadow-none"
              }`}
            >
              <Calculator className="w-7 h-7 sm:w-8 sm:h-8 shrink-0" />
              <span>
                {isLoading ? "حساب لگایا جا رہا ہے..." : "کپڑے اور کٹنگ لسٹ کا حساب لگائیں"}
              </span>
            </button>

            {blueprint && (
              <button
                type="button"
                onClick={handleResetAll}
                className="w-full sm:w-auto px-6 py-5 rounded-2xl font-urdu font-bold text-stone-800 bg-stone-100 hover:bg-stone-200 transition active:scale-95 flex items-center justify-center gap-2 shrink-0 border-2 border-stone-300 leading-[2.2]"
                title="نیا ڈیزائن شروع کریں"
              >
                <RotateCcw className="w-5 h-5 shrink-0" />
                <span className="text-sm sm:text-base">نیا حساب</span>
              </button>
            )}
          </div>

        </div>

        {/* Loading UI State */}
        {isLoading && <LoadingState />}

        {/* Blueprint Output Display: strictly stacks as single column */}
        {blueprint && !isLoading && (
          <div className="w-full flex flex-col space-y-7 animate-fade-in">
            {/* Audio Voice Readout Card */}
            <AudioReader
              speechScript={blueprint.speech_script_ur}
              isSpeaking={isSpeaking}
              isPaused={isPaused}
              onSpeak={speak}
              onPause={pause}
              onResume={resume}
              onStop={stop}
            />

            {/* 3 High-Contrast RTL Blueprint Cards with Photorealistic Steps */}
            <BlueprintDisplay blueprint={blueprint} />
          </div>
        )}

      </main>

      {/* Preset Modal */}
      <PresetsModal
        isOpen={isPresetsOpen}
        onClose={() => setIsPresetsOpen(false)}
        onSelectPreset={handleSelectPreset}
      />

      {/* Footer */}
      <footer className="mt-14 text-center text-sm font-urdu text-stone-600 max-w-md mx-auto px-4 leading-[2.6]">
        <p>کرافٹ کیلک AI — مقامی کاریگروں، ماؤں اور درزیوں کے لیے بنایا گیا وائس اسسٹنٹ</p>
        <p className="font-sans text-xs text-stone-500 mt-1">Multimodal Voice + Vision Powered by Gemini 1.5 Flash</p>
      </footer>

    </div>
  );
}
