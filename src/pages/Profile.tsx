import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/solid';
import { useAuth } from '../contexts/AuthContext';
import { PlaylistCard } from '../components/PlaylistCard';
import SongCard from '../components/SongCard';
import { mockPlaylists, mockSongs } from '../utils/mockData';

export default function Profile() {
  const { user, updateUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'songs' | 'stats'>('songs');
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user?.username || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setAvatarUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    if (!user) return;
    updateUser({ username, avatarUrl });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setUsername(user?.username || '');
    setAvatarUrl(user?.avatarUrl || '');
    setAvatarFile(null);
    setIsEditing(false);
  };

  if (!user) {
    return <div className="p-8 text-center">Carregando perfil...</div>;
  }

  const userPlaylists = mockPlaylists.filter(p => p.owner.id === user.id);
  const userLikedSongs = mockSongs.slice(0, 3);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0 }} 
      className="p-8"
    >
      <div className="flex items-start justify-between gap-8 mb-12">
        <div className="flex items-center gap-8">
          <div className="relative group">
            <img 
              src={avatarUrl} 
              alt={username} 
              className="w-40 h-40 rounded-full object-cover shadow-lg"
            />
            {isEditing && (
              <div 
                onClick={() => avatarInputRef.current?.click()} 
                className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <PencilIcon className="w-8 h-8 text-white" />
                <input ref={avatarInputRef} type="file" className="sr-only" accept="image/*" onChange={handleAvatarChange} />
              </div>
            )}
          </div>
          <div className="flex-1">
            {isEditing ? (
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                className="text-5xl font-bold bg-transparent border-b-2 border-surface-light focus:border-primary outline-none"
              />
            ) : (
              <h1 className="text-5xl font-bold">{user.username}</h1>
            )}
            <p className="text-text-secondary mt-2">{user.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {isEditing ? (
            <div className="flex gap-2">
              <button onClick={handleSaveChanges} className="btn btn-primary p-3"><CheckIcon className="w-5 h-5"/></button>
              <button onClick={handleCancel} className="btn btn-secondary p-3"><XMarkIcon className="w-5 h-5"/></button>
            </div>
          ) : (
            <>
              <button onClick={() => setIsEditing(true)} className="btn btn-secondary flex items-center gap-2">
                <PencilIcon className="w-5 h-5" />
                <span>Editar Perfil</span>
              </button>
              <button onClick={logout} className="btn btn-secondary flex items-center gap-2 bg-red-800/50 hover:bg-red-500 transition-colors">
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                <span>Sair</span>
              </button>
            </>
          )}
        </div>
      </div>
      
      <section>
        <h2 className="text-2xl font-bold mb-6">Minhas Playlists</h2>
        {userPlaylists.length > 0 ? (
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {userPlaylists.map(p => (
              <motion.div key={p.id} variants={itemVariants}>
                <PlaylistCard playlist={p} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-text-secondary">Você ainda não criou nenhuma playlist.</p>
        )}
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Músicas Curtidas</h2>
        {userLikedSongs.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {userLikedSongs.map(s => (
              <motion.div key={s.id} variants={itemVariants}>
                <SongCard song={s} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-text-secondary">Você ainda não curtiu nenhuma música.</p>
        )}
      </section>
    </motion.div>
  );
} 