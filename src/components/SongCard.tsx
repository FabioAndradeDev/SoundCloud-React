import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid, PlayIcon, PauseIcon } from '@heroicons/react/24/solid';
import { formatDuration, formatPlays } from '../utils/format';
import type { Song } from '../types';
import { useMusic } from '../contexts/MusicContext';

/**
 * @interface SongCardProps
 * @description Define as propriedades para o componente SongCard.
 * @param {Song} song - O objeto da música a ser exibido.
 * @param {(song: Song) => void} [onPlay] - DEPRECATED: A lógica de play agora é gerenciada pelo MusicContext.
 */
interface SongCardProps {
  song: Song;
}

/**
 * @component SongCard
 * @description Card para exibição de uma música em listas.
 * Mostra a capa, título, artista e outras informações.
 * Permite curtir e tocar a música.
 */
export default function SongCard({ song }: SongCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const { playSong, currentSong, isPlaying, togglePlayPause } = useMusic();
  
  const isThisSongPlaying = currentSong?.id === song.id && isPlaying;
  const isThisSongActive = currentSong?.id === song.id;

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Impede que o onPlay seja acionado
    setIsLiked(!isLiked);
    // TODO: Conectar com o AuthContext ou um hook de API para persistir o like
    console.log('Música curtida:', song.id, !isLiked);
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isThisSongActive) {
      togglePlayPause();
    } else {
      playSong(song);
    }
  };

  return (
    <div
      className={`group flex items-center space-x-4 p-2 rounded-lg transition-colors cursor-pointer ${isThisSongActive ? 'bg-surface-light' : 'hover:bg-surface-light'}`}
      onClick={handlePlayClick}
    >
      {/* Cover da música com botão de play sobreposto */}
      <div className="relative flex-shrink-0">
        <img
          src={song.coverUrl}
          alt={song.title}
          className="w-14 h-14 rounded object-cover"
        />
        <div 
          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {isThisSongPlaying ? (
            <PauseIcon className="w-8 h-8 text-white" />
          ) : (
            <PlayIcon className="w-8 h-8 text-white" />
          )}
        </div>
      </div>

      {/* Informações da Música */}
      <div className="flex-1 min-w-0">
        <Link
          to={`/app/song/${song.id}`}
          className={`font-medium truncate hover:text-primary block ${isThisSongActive ? 'text-primary' : 'text-text-primary'}`}
          onClick={(e) => e.stopPropagation()} // Permite navegar sem tocar a música
        >
          {song.title}
        </Link>
        <Link
          to={`/app/artist/${song.artist.id}`}
          className="text-text-secondary text-sm truncate hover:text-primary block"
          onClick={(e) => e.stopPropagation()}
        >
          {song.artist.name}
        </Link>
      </div>
      
      {/* Ações e Metadados */}
      <div className="flex items-center space-x-4 text-text-secondary">
        <span className="text-sm w-12 text-right hidden sm:block">{formatPlays(song.plays)}</span>
        <button
          onClick={handleLikeClick}
          className="text-text-secondary hover:text-primary"
        >
          {isLiked ? (
            <HeartSolid className="w-5 h-5 text-primary" />
          ) : (
            <HeartOutline className="w-5 h-5" />
          )}
        </button>
        <span className="text-sm w-10 text-right">{formatDuration(song.duration)}</span>
      </div>
    </div>
  );
} 