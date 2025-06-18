import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import SongCard from '../components/SongCard';
import { PlaylistCard } from '../components/PlaylistCard';
import { ArtistCard } from '../components/ArtistCard';
import { mockSongs, mockPlaylists, mockArtists } from '../utils/mockData';
import { useAuth } from '../contexts/AuthContext';

/**
 * @component Section
 * @description Um componente genérico para renderizar uma seção de conteúdo na Home.
 * @param {object} props - Propriedades do componente.
 * @param {string} props.title - O título da seção.
 * @param {ReactNode} props.children - O conteúdo (grid de cards) a ser renderizado.
 */
function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { delay: 0.1 } }
      }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-bold text-text-primary">{title}</h2>
      {children}
    </motion.section>
  );
}

/**
 * @page Home
 * @description A página inicial da aplicação. Exibe seções de conteúdo
 * como "Feito para você", "Músicas em alta" e "Artistas populares".
 */
export default function Home() {
  const { user } = useAuth();

  // Filtros de exemplo
  const recentlyPlayed = mockSongs.slice(0, 5);
  const popularPlaylists = mockPlaylists.slice(0, 5);
  const featuredArtists = mockArtists.slice(0, 5);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="p-8 space-y-12">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-white"
      >
        Olá, <span className="text-primary">{user?.username || 'visitante'}</span>!
      </motion.h1>

      <Section title="Ouvidas recentemente">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {recentlyPlayed.map((song) => (
            <motion.div key={song.id} variants={itemVariants}>
              <SongCard song={song} />
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <Section title="Playlists em alta">
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {popularPlaylists.map((playlist) => (
            <motion.div key={playlist.id} variants={itemVariants}>
              <PlaylistCard playlist={playlist} />
            </motion.div>
          ))}
        </motion.div>
      </Section>
      
      <Section title="Artistas em destaque">
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {featuredArtists.map((artist) => (
            <motion.div key={artist.id} variants={itemVariants}>
              <ArtistCard artist={artist} />
            </motion.div>
          ))}
        </motion.div>
      </Section>
    </div>
  );
} 