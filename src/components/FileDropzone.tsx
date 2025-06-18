import { useState, useRef, ReactNode, DragEvent } from 'react';
import { motion } from 'framer-motion';

interface FileDropzoneProps {
  onFileSelect: (file: File) => void;
  accept: string;
  children: ReactNode;
}

/**
 * @component FileDropzone
 * @description Uma área de arrastar e soltar (drag-and-drop) para upload de arquivos.
 */
export function FileDropzone({ onFileSelect, accept, children }: FileDropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: DragEvent<HTMLDivElement>, isOver: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(isOver);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    handleDrag(e, false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith(accept.replace('/*', ''))) {
      onFileSelect(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <>
      <motion.div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => handleDrag(e, true)}
        onDragLeave={(e) => handleDrag(e, false)}
        onDrop={handleDrop}
        className={`flex justify-center rounded-lg border border-dashed px-6 py-10 cursor-pointer transition-colors ${
          isDragOver ? 'border-primary bg-primary/10' : 'border-surface-border hover:border-text-secondary'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="text-center">{children}</div>
      </motion.div>
      <input
        ref={inputRef}
        type="file"
        className="sr-only"
        accept={accept}
        onChange={handleFileChange}
      />
    </>
  );
} 