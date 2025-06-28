import { useState, useEffect, useRef, use } from "react";

import { playlist } from "./playlistData";
export const useAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [currentPlaylist, setPlaylist] = useState(playlist);

  const audioRef = useRef(new Audio());

  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => setCurrentTime(audio.currentTime);

    const updateDuration = () => setDuration(audio.duration);

    const handleEnded = () => {
      if (repeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        handleNext();
      }
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [repeat]);

  useEffect(() => {
    const updateProgress = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
      animationFrameId = requestAnimationFrame(updateProgress);
    };

    let animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    if (playlist.length > 0 && playlist[currentTrackIndex]?.audioSrc) {
      // For local files, we use the imported path directly
      audioRef.current.src = playlist[currentTrackIndex].audioSrc;
      if (isPlaying) {
        audioRef.current
          .play()
          .catch((e) => console.error("Playback failed:", e));
      }
    }
  }, [currentTrackIndex, playlist]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current
        .play()
        .catch((e) => console.error("Playback failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (shuffle) {
      const nextIndex = Math.floor(Math.random() * playlist.length);
      setCurrentTrackIndex(nextIndex);
    } else {
      setCurrentTrackIndex((prevIndex) =>
        prevIndex === playlist.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handlePrevious = () => {
    if (currentTime > 3) {
      audioRef.current.currentTime = 0;
    } else {
      setCurrentTrackIndex((prevIndex) =>
        prevIndex === 0 ? playlist.length - 1 : prevIndex - 1
      );
    }
  };

  const handleTimeUpdate = (e) => {
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleShuffle = () => setShuffle(!shuffle);
  const toggleRepeat = () => setRepeat(!repeat);

  return {
    isPlaying,
    currentTime,
    setCurrentTrackIndex,
    duration,
    currentTrack: playlist[currentTrackIndex] || {},
    shuffle,
    repeat,
    togglePlay,
    handleNext,
    handlePrevious,
    handleTimeUpdate,
    toggleShuffle,
    toggleRepeat,
    audioRef,
  };
};
