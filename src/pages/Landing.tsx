import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-surface to-black text-white p-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-center"
      >
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4">
          UnderSound
        </h1>
        <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto mb-12">
          Sua próxima obsessão musical está a um play de distância. Descubra, ouça e compartilhe.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex flex-col md:flex-row gap-4 w-full max-w-sm"
      >
        <Link to="/register" className="btn btn-primary w-full text-lg py-4">
          Cadastre-se grátis
        </Link>
        <Link to="/login" className="btn btn-secondary w-full text-lg py-4">
          Entrar
        </Link>
      </motion.div>
    </div>
  );
} 