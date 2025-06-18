import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlayIcon, UserPlusIcon, HeartIcon } from '@heroicons/react/24/solid';
import { mockArtists, mockSongs } from '../utils/mockData';
import { useMusic } from '../contexts/MusicContext';
import SongCard from '../components/SongCard';
import NotFound from './NotFound';

export default function ArtistDetails() {
  const { artistId } = useParams<{ artistId: string }>();
  const { playSong } = useMusic();

  const artist = mockArtists.find((a) => a.id === artistId);
  const artistSongs = mockSongs.filter((s) => s.artist.id === artistId);

  if (!artist) {
    return <NotFound />;
  }
  
  const handlePlayAll = () => {
    if (artistSongs.length > 0) {
      playSong(artistSongs[0], artistSongs);
    }
  };

  const headerStyle = {
    backgroundImage: `linear-gradient(to top, rgba(18, 18, 18, 1) 10%, rgba(18, 18, 18, 0.7) 50%, transparent 100%), url(${artist.avatarUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center 25%',
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="h-[40vh] flex flex-col justify-end p-8" style={headerStyle}>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-7xl font-black tracking-tighter"
        >
          {artist.name}
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-text-secondary mt-2"
        >
          {artist.followers.toLocaleString('pt-BR')} seguidores
        </motion.p>
      </div>

      <div className="p-8">
        <div className="flex items-center gap-4 mb-12">
          <button 
            onClick={handlePlayAll}
            className="bg-primary hover:scale-105 transition-transform rounded-full p-4 disabled:bg-gray-500 disabled:cursor-not-allowed"
            disabled={artistSongs.length === 0}
            aria-label={`Tocar todas de ${artist.name}`}
          >
            <PlayIcon className="h-8 w-8 text-black" />
          </button>
          <button className="btn btn-secondary">
            <UserPlusIcon className="h-5 w-5 mr-2" />
            Seguir
          </button>
          <button className="text-text-secondary hover:text-white transition-colors">
            <HeartIcon className="h-8 w-8" />
          </button>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Músicas Populares</h2>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-2"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.05 } }
            }}
          >
            {artistSongs.length > 0 ? (
              artistSongs.map((song) => (
                <motion.div key={song.id} variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                  <SongCard song={song} />
                </motion.div>
              ))
            ) : (
              <p className="text-text-secondary col-span-full">Este artista ainda não tem músicas.</p>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
} 