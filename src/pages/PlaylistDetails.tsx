import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlayIcon, HeartIcon, ClockIcon } from '@heroicons/react/24/solid';
import { mockPlaylists } from '../utils/mockData';
import { useMusic } from '../contexts/MusicContext';
import SongCard from '../components/SongCard';
import NotFound from './NotFound';

export default function PlaylistDetails() {
  const { playlistId } = useParams<{ playlistId: string }>();
  const { playSong } = useMusic();
  
  const playlist = mockPlaylists.find((p) => p.id === playlistId);

  if (!playlist) {
    return <NotFound />;
  }
  
  const handlePlayAll = () => {
    if (playlist.songs && playlist.songs.length > 0) {
      playSong(playlist.songs[0], playlist.songs);
    }
  };

  const totalDuration = playlist.songs.reduce((acc, song) => acc + song.duration, 0);
  const totalDurationFormatted = () => {
    const hours = Math.floor(totalDuration / 3600);
    const minutes = Math.floor((totalDuration % 3600) / 60);
    return `${hours > 0 ? `${hours}h ` : ''}${minutes}min`;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="flex items-end gap-6 p-8 bg-gradient-to-b from-purple-800 via-purple-900 to-background">
        <motion.img 
          src={playlist.coverUrl} 
          alt={playlist.name} 
          className="w-56 h-56 rounded-lg shadow-2xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        />
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          <p className="text-sm font-bold">Playlist</p>
          <h1 className="text-7xl font-black tracking-tighter">{playlist.name}</h1>
          <div className="flex items-center gap-2 mt-4 text-sm text-text-secondary">
            <img src={playlist.owner.avatarUrl} alt={playlist.owner.username} className="w-6 h-6 rounded-full" />
            <span>{playlist.owner.username}</span>
            <span>•</span>
            <span>{playlist.songs.length} músicas,</span>
            <span className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4" /> {totalDurationFormatted()}
            </span>
          </div>
        </motion.div>
      </div>

      <div className="p-8">
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={handlePlayAll}
            className="bg-primary hover:scale-105 transition-transform rounded-full p-4 disabled:bg-gray-500"
            disabled={playlist.songs.length === 0}
            aria-label={`Tocar a playlist ${playlist.name}`}
          >
            <PlayIcon className="h-8 w-8 text-black" />
          </button>
          <button className="text-text-secondary hover:text-white transition-colors">
            <HeartIcon className="h-8 w-8" />
          </button>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-2"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
        >
          {playlist.songs.length > 0 ? (
            playlist.songs.map((song) => (
              <motion.div key={song.id} variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                <SongCard song={song} />
              </motion.div>
            ))
          ) : (
            <p className="text-text-secondary col-span-full">Esta playlist está vazia. Adicione algumas músicas!</p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
} 