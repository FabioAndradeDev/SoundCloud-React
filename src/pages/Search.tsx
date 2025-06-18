import { useState, useMemo, ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import SongCard from '../components/SongCard';
import { PlaylistCard } from '../components/PlaylistCard';
import { ArtistCard } from '../components/ArtistCard';
import type { Song, Playlist, Artist } from '../types';
import { mockSongs, mockPlaylists, mockArtists } from '../utils/mockData';

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

type SearchCategory = 'songs' | 'playlists' | 'artists';

const SearchInput = ({ value, onChange }: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <div className="relative">
    <motion.input
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      type="text"
      placeholder="O que você quer ouvir?"
      value={value}
      onChange={onChange}
      className="w-full bg-surface-light rounded-full px-12 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
    />
    <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-text-secondary" />
  </div>
);

const TabButton = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
      active ? 'bg-primary text-white' : 'bg-surface-light text-text-secondary hover:text-text-primary'
    }`}
  >
    {children}
  </button>
);

const SearchResults = ({ query }: { query: string }) => {
  const [activeTab, setActiveTab] = useState<SearchCategory>('songs');

  const filteredSongs = useMemo(() => mockSongs.filter(s => s.title.toLowerCase().includes(query) || s.artist.name.toLowerCase().includes(query)), [query]);
  const filteredPlaylists = useMemo(() => mockPlaylists.filter(p => p.name.toLowerCase().includes(query)), [query]);
  const filteredArtists = useMemo(() => mockArtists.filter(a => a.name.toLowerCase().includes(query)), [query]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const tabs: { key: SearchCategory; label: string; count: number; content: ReactNode }[] = [
    {
      key: 'songs',
      label: 'Músicas',
      count: filteredSongs.length,
      content: (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredSongs.length > 0 ? (
            filteredSongs.map(song => (
              <motion.div key={song.id} variants={itemVariants}>
                <SongCard song={song} />
              </motion.div>
            ))
          ) : <p className="text-text-secondary col-span-full">Nenhuma música encontrada.</p>}
        </motion.div>
      ),
    },
    {
      key: 'playlists',
      label: 'Playlists',
      count: filteredPlaylists.length,
      content: (
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
           {filteredPlaylists.length > 0 ? (
            filteredPlaylists.map(p => (
              <motion.div key={p.id} variants={itemVariants}>
                <PlaylistCard playlist={p} />
              </motion.div>
            ))
          ) : <p className="text-text-secondary col-span-full">Nenhuma playlist encontrada.</p>}
        </motion.div>
      ),
    },
    {
      key: 'artists',
      label: 'Artistas',
      count: filteredArtists.length,
      content: (
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
           {filteredArtists.length > 0 ? (
            filteredArtists.map(a => (
              <motion.div key={a.id} variants={itemVariants}>
                <ArtistCard artist={a} />
              </motion.div>
            ))
          ) : <p className="text-text-secondary col-span-full">Nenhum artista encontrado.</p>}
        </motion.div>
      ),
    },
  ];

  const activeContent = tabs.find(tab => tab.key === activeTab)?.content;

  return (
    <div className="mt-8">
      <div className="flex items-center gap-4 mb-6">
        {tabs.map(tab => (
          <TabButton key={tab.key} active={activeTab === tab.key} onClick={() => setActiveTab(tab.key)}>
            {tab.label} ({tab.count})
          </TabButton>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25 }}
        >
          {activeContent}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const BrowseCategories = () => (
  <motion.div initial="hidden" animate="visible" variants={{
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  }}>
    <h2 className="text-2xl font-bold mb-6">Navegar por categorias</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <motion.div variants={{hidden: {opacity: 0, scale: 0.8}, visible: {opacity: 1, scale: 1}}} className="bg-gradient-to-br from-purple-600 to-indigo-800 p-6 rounded-lg font-bold text-xl cursor-pointer hover:scale-105 transition-transform">Trap</motion.div>
      <motion.div variants={{hidden: {opacity: 0, scale: 0.8}, visible: {opacity: 1, scale: 1}}} className="bg-gradient-to-br from-green-500 to-cyan-700 p-6 rounded-lg font-bold text-xl cursor-pointer hover:scale-105 transition-transform">Funk</motion.div>
      <motion.div variants={{hidden: {opacity: 0, scale: 0.8}, visible: {opacity: 1, scale: 1}}} className="bg-gradient-to-br from-red-500 to-orange-700 p-6 rounded-lg font-bold text-xl cursor-pointer hover:scale-105 transition-transform">Pop</motion.div>
      <motion.div variants={{hidden: {opacity: 0, scale: 0.8}, visible: {opacity: 1, scale: 1}}} className="bg-gradient-to-br from-yellow-500 to-amber-700 p-6 rounded-lg font-bold text-xl cursor-pointer hover:scale-105 transition-transform">Rock</motion.div>
    </div>
  </motion.div>
);

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 300);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="p-8 space-y-8"
    >
      <SearchInput value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      
      {debouncedQuery ? <SearchResults query={debouncedQuery.toLowerCase()} /> : <BrowseCategories />}
    </motion.div>
  );
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
} 