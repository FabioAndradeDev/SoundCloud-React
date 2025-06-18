import { useState } from 'react';

interface CreatePlaylistFormProps {
  onSubmit: (name: string) => void;
  onCancel: () => void;
}

/**
 * @component CreatePlaylistForm
 * @description Formulário para criar uma nova playlist.
 */
export function CreatePlaylistForm({ onSubmit, onCancel }: CreatePlaylistFormProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome da sua nova playlist"
        className="input w-full mb-6"
        autoFocus
      />
      <div className="flex justify-end gap-4">
        <button type="button" onClick={onCancel} className="btn btn-secondary">
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary" disabled={!name.trim()}>
          Criar Playlist
        </button>
      </div>
    </form>
  );
} 