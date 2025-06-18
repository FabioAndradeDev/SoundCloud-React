import {
  PlayIcon,
  PauseIcon,
  ForwardIcon,
  BackwardIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ArrowPathRoundedSquareIcon,
  ArrowUturnLeftIcon,
} from '@heroicons/react/24/solid';
import type { Song } from '../types';
import { formatDuration } from '../utils/format';
import { useMusic } from '../contexts/MusicContext';
import { useState } from 'react';

/**
 * @interface MusicPlayerProps
 * @description Define as propriedades que o componente MusicPlayer espera receber.
 * Essas props agora são obtidas diretamente do MusicContext.
 */
interface MusicPlayerProps {
  // As props são gerenciadas pelo MusicContext e MainLayout
}

/**
 * @component MusicPlayer
 * @description Player de música fixo na parte inferior da tela.
 * Lida com a exibição da música atual, controles de reprodução e barra de progresso.
 * Conecta-se ao MusicContext para obter seu estado.
 */
export default function MusicPlayer({}: MusicPlayerProps) {
  const {
    currentSong,
    isPlaying,
    progress,
    duration,
    volume,
    isShuffled,
    repeatMode,
    togglePlayPause,
    playNext,
    playPrevious,
    seek,
    setVolume,
    toggleShuffle,
    toggleRepeat,
  } = useMusic();
  const [isVolumeSliderVisible, setIsVolumeSliderVisible] = useState(false);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!duration) return;
    const progressContainer = e.currentTarget;
    const clickPosition = e.clientX - progressContainer.getBoundingClientRect().left;
    const newProgress = (clickPosition / progressContainer.offsetWidth) * duration;
    seek(newProgress);
  };
  
  // Renderiza um estado placeholder se nenhuma música estiver carregada
  if (!currentSong) {
    return (
      <div className="bg-surface-light p-4 flex items-center justify-between border-t border-surface-light/10 text-text-secondary">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded bg-surface"></div>
          <div>
            <p className="font-semibold text-text-disabled">Nenhuma música tocando</p>
            <p className="text-sm text-text-disabled">-</p>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <BackwardIcon className="h-6 w-6 text-text-disabled" />
          <div className="bg-surface rounded-full p-2">
            <PlayIcon className="h-8 w-8 text-text-disabled" />
          </div>
          <ForwardIcon className="h-6 w-6 text-text-disabled" />
        </div>
        <div className="flex items-center space-x-4">
          <SpeakerWaveIcon className="h-5 w-5 text-text-disabled" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-light p-4 grid grid-cols-3 items-center border-t border-surface-light/10">
      {/* Informações da Música (Esquerda) */}
      <div className="flex items-center space-x-4">
        <img src={currentSong.coverUrl} alt={currentSong.title} className="w-14 h-14 rounded" />
        <div>
          <p className="font-semibold text-text-primary">{currentSong.title}</p>
          <p className="text-sm text-text-secondary">{currentSong.artist.name}</p>
        </div>
      </div>

      {/* Controles Principais e Barra de Progresso (Centro) */}
      <div className="flex flex-col items-center space-y-1">
        <div className="flex items-center space-x-6">
          <button 
            title="Aleatório"
            onClick={toggleShuffle}
            className={isShuffled ? 'text-primary' : 'text-text-secondary hover:text-white'}
          >
            <ArrowPathRoundedSquareIcon className="h-5 w-5" />
          </button>
          <BackwardIcon
            onClick={playPrevious}
            className="h-6 w-6 text-text-secondary hover:text-white transition-colors cursor-pointer"
          />
          <button
            onClick={togglePlayPause}
            className="bg-white rounded-full p-2 cursor-pointer shadow-lg hover:scale-105 transition-transform"
          >
            {isPlaying ? (
              <PauseIcon className="h-8 w-8 text-black" />
            ) : (
              <PlayIcon className="h-8 w-8 text-black" />
            )}
          </button>
          <ForwardIcon
            onClick={playNext}
            className="h-6 w-6 text-text-secondary hover:text-white transition-colors cursor-pointer"
          />
          <button
            title="Repetir"
            onClick={toggleRepeat}
            className={repeatMode !== 'off' ? 'text-primary' : 'text-text-secondary hover:text-white'}
          >
            <div className="relative">
              <ArrowUturnLeftIcon className="h-5 w-5" />
              {repeatMode === 'one' && (
                <span className="absolute -bottom-1 -right-1 text-xs font-bold">1</span>
              )}
            </div>
          </button>
        </div>
        <div className="w-full max-w-md flex items-center space-x-2 text-xs text-text-secondary">
          <span>{formatDuration(progress)}</span>
          <div className="w-full bg-surface rounded-full h-1 cursor-pointer" onClick={handleSeek}>
            <div
              className="bg-primary h-1 rounded-full"
              style={{ width: `${(progress / duration) * 100}%` }}
            ></div>
          </div>
          <span>{formatDuration(duration)}</span>
        </div>
      </div>

      {/* Controles de Volume e Outros (Direita) */}
      <div 
        className="flex items-center justify-end space-x-2"
        onMouseEnter={() => setIsVolumeSliderVisible(true)}
        onMouseLeave={() => setIsVolumeSliderVisible(false)}
      >
        {isVolumeSliderVisible && (
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-24 h-1 bg-surface rounded-lg appearance-none cursor-pointer"
          />
        )}
        <button onClick={() => setVolume(volume > 0 ? 0 : 0.75)} className="text-text-secondary hover:text-white">
          {volume === 0 ? (
            <SpeakerXMarkIcon className="h-5 w-5" />
          ) : (
            <SpeakerWaveIcon className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
} 