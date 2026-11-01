import { useState, useEffect, useRef, useCallback } from "react";

export function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hasSupport, setHasSupport] = useState(false);
  const [urduVoiceFound, setUrduVoiceFound] = useState(false);

  // References for sequential chunk playback
  const chunksRef = useRef([]);
  const currentIndexRef = useRef(0);
  const currentUtteranceRef = useRef(null);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setHasSupport(true);

      const checkVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        const urdu = voices.some((v) => v.lang.startsWith("ur") || v.lang.startsWith("ar"));
        setUrduVoiceFound(urdu);
      };

      checkVoices();
      window.speechSynthesis.onvoiceschanged = checkVoices;
    }
  }, []);

  const stop = useCallback(() => {
    isPlayingRef.current = false;
    chunksRef.current = [];
    currentIndexRef.current = 0;
    currentUtteranceRef.current = null;

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    }
  }, []);

  const playNextChunk = useCallback(() => {
    if (!isPlayingRef.current) return;

    if (currentIndexRef.current >= chunksRef.current.length) {
      // Completed all sentences in the script
      isPlayingRef.current = false;
      setIsSpeaking(false);
      setIsPaused(false);
      currentUtteranceRef.current = null;
      return;
    }

    const currentText = chunksRef.current[currentIndexRef.current];
    if (!currentText || currentText.trim().length === 0) {
      currentIndexRef.current += 1;
      playNextChunk();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(currentText.trim());
    currentUtteranceRef.current = utterance;

    // Slower, respectful cadence for elderly artisans
    utterance.lang = "ur-PK";
    utterance.rate = 0.85;
    utterance.pitch = 1.0;

    // Voice match
    const voices = window.speechSynthesis.getVoices();
    const exactMatch = voices.find((v) => v.lang.toLowerCase() === "ur-pk");
    const prefixMatch = voices.find((v) => v.lang.toLowerCase().startsWith("ur"));
    const arabicFallback = voices.find((v) => v.lang.toLowerCase().startsWith("ar"));
    const selectedVoice = exactMatch || prefixMatch || arabicFallback;

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    // Sequential trigger: onend plays the next chunk in sequence
    utterance.onend = () => {
      if (!isPlayingRef.current) return;
      currentIndexRef.current += 1;
      playNextChunk();
    };

    utterance.onerror = (e) => {
      console.warn("SpeechSynthesis utterance error on chunk:", e);
      if (!isPlayingRef.current) return;
      currentIndexRef.current += 1;
      playNextChunk();
    };

    window.speechSynthesis.speak(utterance);
  }, []);

  const speak = useCallback((text, lang = "ur-PK") => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      console.warn("Speech Synthesis not supported in this browser.");
      return;
    }

    // Stop and reset any ongoing speech
    stop();

    if (!text || text.trim().length === 0) return;

    // Split using regex on Urdu and English punctuation: /[۔؟!\n,،]+/
    const parsedChunks = text
      .split(/[۔؟!\n,،]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (parsedChunks.length === 0) return;

    chunksRef.current = parsedChunks;
    currentIndexRef.current = 0;
    isPlayingRef.current = true;

    // Begin sequential playback from the first sentence
    playNextChunk();
  }, [stop, playNextChunk]);

  const pause = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, []);

  const resume = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isPlayingRef.current = false;
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return {
    isSpeaking,
    isPaused,
    hasSupport,
    urduVoiceFound,
    speak,
    stop,
    pause,
    resume
  };
}
