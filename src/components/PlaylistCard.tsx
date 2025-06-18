import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlayIcon, MusicalNoteIcon } from '@heroicons/react/24/solid';
import type { Playlist } from '../types';
import { useMusic } from '../contexts/MusicContext';

/**
 * @interface PlaylistCardProps
 * @description Define as propriedades para o componente PlaylistCard.
 * @param {Playlist} playlist - O objeto da playlist a ser exibido.
 */
interface PlaylistCardProps {
  playlist: Playlist;
}

/**
 * @component PlaylistCard
 * @description Card para exibição de uma playlist.
 * Mostra a capa, nome e informações da playlist.
 * Permite navegar para a página da playlist ou tocá-la diretamente.
 */
export function PlaylistCard({ playlist }: PlaylistCardProps) {
  const { playSong } = useMusic();
  const [imgError, setImgError] = useState(false);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (playlist.songs && playlist.songs.length > 0) {
      playSong(playlist.songs[0], playlist.songs);
    }
  };
  
  // ESTILOS SIMPLIFICADOS PARA DEBUG
  // Removido motion.div, group, group-hover, e transições.
  return (
    <div className="border-2 border-red-500 bg-surface-light p-4 rounded-lg"> 
      <Link to={`/app/playlist/${playlist.id}`} className="block">
        <div className="relative aspect-square w-full mb-4">
          {imgError ? (
            <div className="w-full h-full bg-surface flex items-center justify-center rounded-lg">
              <MusicalNoteIcon className="w-1/2 h-1/2 text-text-secondary" />
            </div>
          ) : (
            <img
              src={playlist.coverUrl}
              alt={playlist.name}
              className="w-full h-full object-cover rounded-lg shadow-lg"
              onError={() => setImgError(true)}
            />
          )}
          {/* Botão de play visível para debug */}
          <button
            onClick={handlePlayClick}
            className="absolute bottom-3 right-3 bg-primary text-white p-3 rounded-full shadow-xl"
            aria-label={`Tocar a playlist ${playlist.name}`}
          >
            <PlayIcon className="h-6 w-6" />
          </button>
        </div>
        <div>
          <h3 className="font-bold truncate text-white">{playlist.name}</h3>
          <p className="text-sm text-text-secondary truncate">
            de {playlist.owner.username}
          </p>
        </div>
      </Link>
    </div>
  );
} 