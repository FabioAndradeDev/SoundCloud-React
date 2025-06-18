import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpTrayIcon, PhotoIcon, MusicalNoteIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { FileDropzone } from '../components/FileDropzone';

type UploadStatus = 'idle' | 'uploading' | 'success';

export default function UploadSong() {
  const [title, setTitle] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<UploadStatus>('idle');

  const handleCoverSelect = (file: File) => {
    setCoverFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setCoverPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleAudioSelect = (file: File) => {
    setAudioFile(file);
  };

  const resetForm = () => {
    setTitle('');
    setAudioFile(null);
    setCoverFile(null);
    setCoverPreview(null);
    setStatus('idle');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !audioFile || !coverFile) {
      alert('Por favor, preencha todos os campos e selecione os arquivos.');
      return;
    }
    
    setStatus('uploading');
    // Simula o upload
    setTimeout(() => {
      console.log('Uploaded:', { title, audio: audioFile.name, cover: coverFile.name });
      setStatus('success');
    }, 2000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8">
      <div className="max-w-3xl mx-auto">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl font-bold mb-8 text-center"
        >
          Envie sua Música
        </motion.h1>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center bg-surface-light p-12 rounded-lg"
            >
              <CheckCircleIcon className="w-24 h-24 text-green-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold">Upload Concluído!</h2>
              <p className="text-text-secondary mt-2">Sua música "{title}" foi enviada e está pronta para ser ouvida.</p>
              <button onClick={resetForm} className="btn btn-primary mt-8">
                Enviar outra música
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit} 
              className="bg-surface-main p-8 rounded-xl shadow-lg space-y-6"
            >
              <div>
                <label htmlFor="title" className="label">Título da Música</label>
                <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input w-full" placeholder="Como se chama sua faixa?" required />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="label">Capa da Faixa</label>
                  <FileDropzone onFileSelect={handleCoverSelect} accept="image/*">
                    {coverPreview ? (
                      <img src={coverPreview} alt="Preview" className="h-40 w-40 object-cover rounded-lg mx-auto" />
                    ) : (
                      <div className="text-text-secondary">
                        <PhotoIcon className="w-12 h-12 mx-auto" />
                        <p className="mt-2">Arraste uma imagem ou clique para selecionar</p>
                        <p className="text-xs mt-1">{coverFile?.name || 'PNG, JPG, etc.'}</p>
                      </div>
                    )}
                  </FileDropzone>
                </div>
                
                <div>
                  <label className="label">Arquivo de Áudio</label>
                  <FileDropzone onFileSelect={handleAudioSelect} accept="audio/*">
                    <div className="text-text-secondary">
                      <MusicalNoteIcon className="w-12 h-12 mx-auto" />
                      <p className="mt-2">Arraste sua música ou clique para selecionar</p>
                      <p className="text-xs mt-1 truncate max-w-xs mx-auto">{audioFile?.name || 'MP3, WAV, etc.'}</p>
                    </div>
                  </FileDropzone>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-full flex items-center justify-center gap-2"
                disabled={status === 'uploading' || !title || !audioFile || !coverFile}
              >
                {status === 'uploading' ? (
                  <>
                    <motion.div className="w-5 h-5 border-2 border-transparent border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}/>
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <ArrowUpTrayIcon className="w-5 h-5" />
                    <span>Enviar Música</span>
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
} 