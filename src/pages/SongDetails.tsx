import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlayIcon, HeartIcon } from '@heroicons/react/24/solid';
import { mockSongs } from '../utils/mockData';
import { useMusic } from '../contexts/MusicContext';
import NotFound from './NotFound';

export default function SongDetails() {
  const { songId } = useParams<{ songId: string }>();
  const { playSong } = useMusic();
  
  const song = mockSongs.find((s) => s.id === songId);

  if (!song) {
    return <NotFound />;
  }
  
  const handlePlay = () => {
    playSong(song, [song]);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="p-8"
    >
      <div className="flex flex-col md:flex-row gap-8">
        <motion.img 
          src={song.coverUrl} 
          alt={song.title} 
          className="w-full md:w-80 h-80 object-cover rounded-lg shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        />
        <div className="flex flex-col justify-center">
          <motion.h1 
            className="text-5xl font-bold"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {song.title}
          </motion.h1>
          <motion.p 
            className="text-2xl text-text-secondary mt-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {song.artist.name}
          </motion.p>
          <motion.div 
            className="flex items-center gap-4 mt-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <button onClick={handlePlay} className="btn btn-primary flex items-center gap-2">
              <PlayIcon className="w-6 h-6" />
              Tocar
            </button>
            <button className="btn btn-secondary">
              <HeartIcon className="w-6 h-6" />
              Curtir
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
} 