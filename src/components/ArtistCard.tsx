import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlayIcon, UserIcon } from '@heroicons/react/24/solid';
import type { Artist } from '../types';
import { formatNumber } from '../utils/format';
import { motion } from 'framer-motion';
import { useMusic } from '../contexts/MusicContext';
import { mockSongs } from '../utils/mockData';

/**
 * @interface ArtistCardProps
 * @description Define as propriedades para o componente ArtistCard.
 * @param {Artist} artist - O objeto do artista a ser exibido.
 */
interface ArtistCardProps {
  artist: Artist;
}

/**
 * @component ArtistCard
 * @description Card para exibição de um artista.
 * Mostra a foto, nome e número de seguidores.
 * Permite navegar para a página do artista ou tocar suas músicas.
 */
export function ArtistCard({ artist }: ArtistCardProps) {
  const { playSong } = useMusic();
  const [imgError, setImgError] = useState(false);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const artistSongs = mockSongs.filter(s => s.artist.id === artist.id);
    if (artistSongs.length > 0) {
      playSong(artistSongs[0], artistSongs);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="group relative text-center"
    >
      <div className="card relative p-4 rounded-lg overflow-hidden cursor-pointer bg-surface transition-colors group-hover:bg-surface-light">
        <Link to={`/app/artist/${artist.id}`} className="relative block">
          <div className="relative aspect-square w-full mb-4">
            {imgError ? (
               <div className="w-full h-full bg-surface-light rounded-full flex items-center justify-center">
                <UserIcon className="w-1/2 h-1/2 text-text-secondary" />
              </div>
            ) : (
              <img
                src={artist.avatarUrl}
                alt={artist.name}
                className="w-full h-full object-cover rounded-full shadow-lg"
                onError={() => setImgError(true)}
              />
            )}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePlayClick}
              className="absolute bottom-5 right-5 bg-primary text-white p-3 rounded-full transition-all duration-300 transform group-hover:opacity-100 opacity-0 group-hover:translate-y-0 translate-y-2 shadow-xl hover:bg-primary-hover"
              aria-label={`Tocar músicas de ${artist.name}`}
            >
              <PlayIcon className="h-6 w-6" />
            </motion.button>
          </div>
          <Link to={`/app/artist/${artist.id}`} className="block mt-2">
            <h3 className="font-bold truncate text-text-primary group-hover:text-white">{artist.name}</h3>
            <p className="text-sm text-text-secondary truncate">
              {formatNumber(artist.followers)} seguidores
            </p>
          </Link>
        </Link>
      </div>
    </motion.div>
  );
} 