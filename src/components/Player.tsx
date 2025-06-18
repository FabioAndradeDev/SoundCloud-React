import { useState } from 'react';
import { PlayIcon, PauseIcon, ForwardIcon, BackwardIcon, SpeakerWaveIcon } from '@heroicons/react/24/solid';

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-surface-light border-t border-surface flex items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        <img
          src="https://picsum.photos/200"
          alt="Capa da música"
          className="w-14 h-14 rounded"
        />
        <div>
          <h3 className="text-text-primary font-medium">Nome da Música</h3>
          <p className="text-text-secondary text-sm">Artista</p>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-2">
        <div className="flex items-center space-x-4">
          <button className="text-text-secondary hover:text-text-primary">
            <BackwardIcon className="w-6 h-6" />
          </button>
          <button
            className="text-text-primary hover:text-primary"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <PauseIcon className="w-8 h-8" />
            ) : (
              <PlayIcon className="w-8 h-8" />
            )}
          </button>
          <button className="text-text-secondary hover:text-text-primary">
            <ForwardIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="flex items-center space-x-2 w-96">
          <span className="text-text-secondary text-sm">0:00</span>
          <div className="flex-1 h-1 bg-surface rounded-full">
            <div className="w-0 h-full bg-primary rounded-full"></div>
          </div>
          <span className="text-text-secondary text-sm">3:45</span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <SpeakerWaveIcon className="w-5 h-5 text-text-secondary" />
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-24"
        />
      </div>
    </div>
  );
} 