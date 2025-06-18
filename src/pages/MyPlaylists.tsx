import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusIcon } from '@heroicons/react/24/solid';
import { PlaylistCard } from '../components/PlaylistCard';
import { Modal } from '../components/Modal';
import { CreatePlaylistForm } from '../components/CreatePlaylistForm';
import { useAuth } from '../contexts/AuthContext';
import { mockPlaylists } from '../utils/mockData';
import type { Playlist } from '../types';

export default function MyPlaylists() {
  const { user } = useAuth();
  // Filtra as playlists para mostrar apenas as do usuário logado e as que ele criou
  const [playlists, setPlaylists] = useState<Playlist[]>(() => 
    mockPlaylists.filter(p => p.owner.id === user?.id)
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreatePlaylist = (name: string) => {
    if (!user) return;

    const newPlaylist: Playlist = {
      id: `playlist-${Date.now()}`,
      name,
      coverUrl: `https://source.boringavatars.com/beam/400/${encodeURIComponent(name)}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`,
      owner: user,
      songs: [],
      likes: 0,
      createdAt: new Date().toISOString(),
    };

    setPlaylists(prev => [newPlaylist, ...prev]);
    setIsModalOpen(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8"
    >
      <div className="flex justify-between items-center mb-8">
        <motion.h1 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-4xl font-bold"
        >
          Minhas Playlists
        </motion.h1>
        <motion.button
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Nova Playlist</span>
        </motion.button>
      </div>

      {playlists.length > 0 ? (
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.05 } }
          }}
        >
          {playlists.map((playlist) => (
            <motion.div key={playlist.id} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <PlaylistCard key={playlist.id} playlist={playlist} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="text-center py-20">
          <p className="text-text-secondary text-lg">Você ainda não tem nenhuma playlist.</p>
          <p className="text-text-secondary">Que tal criar uma agora?</p>
        </motion.div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Criar nova playlist">
        <CreatePlaylistForm 
          onSubmit={handleCreatePlaylist}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </motion.div>
  );
} 