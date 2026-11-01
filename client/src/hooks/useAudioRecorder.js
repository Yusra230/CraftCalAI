import { useState, useRef, useCallback, useEffect } from "react";

export function useAudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioBase64, setAudioBase64] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [mimeType, setMimeType] = useState("audio/webm");
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioError, setAudioError] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const streamRef = useRef(null);

  // Supported mime type detection for cross-browser support (Chrome/Firefox/Safari)
  const getSupportedMimeType = () => {
    if (typeof MediaRecorder === "undefined") return "";
    const types = [
      "audio/webm;codecs=opus",
      "audio/webm",
      "audio/mp4",
      "audio/ogg;codecs=opus",
      "audio/wav"
    ];
    for (const t of types) {
      if (MediaRecorder.isTypeSupported(t)) {
        return t;
      }
    }
    return "";
  };

  const startRecording = useCallback(async () => {
    setAudioError(null);
    audioChunksRef.current = [];

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("مائیکروفون اس براؤزر میں دستیاب نہیں ہے (Microphone not supported).");
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const chosenMime = getSupportedMimeType() || "audio/webm";
      setMimeType(chosenMime);

      const mediaRecorder = new MediaRecorder(stream, chosenMime ? { mimeType: chosenMime } : undefined);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const fullBlob = new Blob(audioChunksRef.current, { type: chosenMime });
        setAudioBlob(fullBlob);

        const url = URL.createObjectURL(fullBlob);
        setAudioUrl(url);

        // Convert blob to base64 string
        const reader = new FileReader();
        reader.onloadend = () => {
          const resultStr = reader.result;
          // Extract purely base64 content
          const base64Data = resultStr.split(",")[1];
          setAudioBase64(base64Data);
        };
        reader.readAsDataURL(fullBlob);

        // Stop all tracks to release hardware mic
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }
      };

      mediaRecorder.start(100); // 100ms chunks for smooth recording
      setIsRecording(true);
      setRecordingDuration(0);

      timerRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);

    } catch (err) {
      console.error("Microphone access error:", err);
      let friendlyError = "مائیکروفون تک رسائی ممکن نہیں ہو سکی۔ براہ کرم براؤزر میں اجازت چیک کریں۔";
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        friendlyError = "مائیکروفون کی اجازت نہیں ملی۔ براہ کرم ایڈریس بار میں کیمرہ/مائیک کی اجازت آن کریں۔";
      }
      setAudioError(friendlyError);
      setIsRecording(false);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRecording(false);
  }, []);

  const resetAudio = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    setIsRecording(false);
    setAudioBlob(null);
    setAudioBase64(null);
    setAudioUrl(null);
    setRecordingDuration(0);
    setAudioError(null);
  }, [audioUrl]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return {
    isRecording,
    audioBlob,
    audioBase64,
    audioUrl,
    mimeType,
    recordingDuration,
    audioError,
    startRecording,
    stopRecording,
    resetAudio,
    setAudioError
  };
}
