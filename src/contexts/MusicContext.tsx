import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';
import type { Song } from '../types';

export type RepeatMode = 'off' | 'one' | 'all';

/**
 * @interface MusicContextType
 * @description Define a forma do contexto musical.
 */
interface MusicContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  duration: number;
  progress: number;
  volume: number;
  isShuffled: boolean;
  repeatMode: RepeatMode;
  queue: Song[];
  playSong: (song: Song, playlist?: Song[]) => void;
  togglePlayPause: () => void;
  playNext: () => void;
  playPrevious: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

/**
 * @provider MusicProvider
 * @description Provedor que gerencia o estado global de música da aplicação.
 * Utiliza um elemento <audio> para tocar as músicas.
 */
export const MusicProvider = ({ children }: { children: ReactNode }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState<Song[]>([]);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.75);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>('off');
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Erro ao tocar:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.src = currentSong.audioUrl;
      audioRef.current.load();
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.error("Erro ao carregar e tocar:", e));
    }
  }, [currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const playSong = (song: Song, playlist: Song[] = []) => {
    setCurrentSong(song);
    const newQueue = playlist.length > 0 ? playlist : [song];
    setQueue(newQueue);
  };

  const togglePlayPause = () => {
    if (currentSong) setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    if (queue.length === 0) return;
    if (isShuffled) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * queue.length);
      } while (queue.length > 1 && queue[randomIndex].id === currentSong?.id);
      setCurrentSong(queue[randomIndex]);
    } else {
      const currentIndex = queue.findIndex(s => s.id === currentSong?.id);
      const nextIndex = currentIndex + 1;
      if (nextIndex < queue.length) {
        setCurrentSong(queue[nextIndex]);
      } else if (repeatMode === 'all') {
        setCurrentSong(queue[0]);
      } else {
        setIsPlaying(false);
      }
    }
  };

  const playPrevious = () => {
    if (queue.length === 0) return;
    const currentIndex = queue.findIndex(s => s.id === currentSong?.id);
    const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
    setCurrentSong(queue[prevIndex]);
  };
  
  const seek = (time: number) => {
    if (audioRef.current) audioRef.current.currentTime = time;
  };

  const toggleShuffle = () => setIsShuffled(prev => !prev);

  const toggleRepeat = () => {
    setRepeatMode(prev => {
      if (prev === 'off') return 'all';
      if (prev === 'all') return 'one';
      return 'off';
    });
  };

  const handleSongEnd = () => {
    if (repeatMode === 'one') {
      seek(0);
      setIsPlaying(true);
    } else {
      playNext();
    }
  };

  const contextValue = {
    currentSong, isPlaying, duration, progress, volume, isShuffled, repeatMode, queue,
    playSong, togglePlayPause, playNext, playPrevious, seek, setVolume, toggleShuffle, toggleRepeat,
  };

  return (
    <MusicContext.Provider value={contextValue}>
      {children}
      <audio
        ref={audioRef}
        onEnded={handleSongEnd}
        onTimeUpdate={() => setProgress(audioRef.current?.currentTime ?? 0)}
        onLoadedData={() => setDuration(audioRef.current?.duration ?? 0)}
      />
    </MusicContext.Provider>
  );
};

/**
 * @hook useMusic
 * @description Hook customizado para acessar o MusicContext.
 * Garante que o hook seja usado dentro de um MusicProvider.
 */
export const useMusic = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic deve ser usado dentro de um MusicProvider');
  }
  return context;
}; 