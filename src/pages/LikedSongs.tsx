import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { HeartIcon, PlayIcon, ClockIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../contexts/AuthContext';
import { useMusic } from '../contexts/MusicContext';
import SongCard from '../components/SongCard';
import { mockSongs } from '../utils/mockData';
import { formatTime } from '../utils/formatters';

export default function LikedSongs() {
  const { user } = useAuth();
  const { playSong } = useMusic();

  // Apenas como exemplo, vamos usar uma fatia das músicas mockadas como "curtidas"
  const likedSongs = useMemo(() => mockSongs.slice(0, 4), []);

  const totalDuration = useMemo(() => {
    const totalSeconds = likedSongs.reduce((acc, song) => acc + song.duration, 0);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours > 0 ? `${hours} h ` : ''}${minutes} min`;
  }, [likedSongs]);

  const handlePlayAll = () => {
    if (likedSongs.length > 0) {
      playSong(likedSongs[0], likedSongs);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8"
    >
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-end gap-6 mb-12"
      >
        <div className="flex-shrink-0 w-48 h-48 rounded-md shadow-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
          <HeartIcon className="w-24 h-24 text-white" />
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-bold">Playlist</p>
          <h1 className="text-6xl font-black tracking-tighter">Músicas Curtidas</h1>
          <div className="flex items-center gap-4 text-sm text-text-secondary">
            <img src={user?.avatarUrl} alt={user?.username} className="w-6 h-6 rounded-full" />
            <span className="font-bold">{user?.username}</span>
            <span>•</span>
            <span>{likedSongs.length} músicas,</span>
            <span className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4" />
              {totalDuration}
            </span>
          </div>
        </div>
      </motion.div>
      
      <div className="space-y-4">
        <button 
          onClick={handlePlayAll} 
          className="bg-primary text-white rounded-full p-4 hover:scale-105 transition-transform"
          aria-label="Tocar todas as músicas curtidas"
        >
          <PlayIcon className="w-8 h-8" />
        </button>

        <div className="flex flex-col gap-2 mt-6">
          {likedSongs.length > 0 ? (
            likedSongs.map((song, index) => (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <SongCard song={song} />
              </motion.div>
            ))
          ) : (
            <p className="text-text-secondary mt-4">Você ainda não curtiu nenhuma música.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
} 