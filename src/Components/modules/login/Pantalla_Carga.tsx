import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react'; // El spinner estándar en Shadcn/Web moderna

interface Props {
  isVisible: boolean;
  mensaje?: string;
}

export const PantallaCarga = ({ isVisible, mensaje = "Cargando..." }: Props) => {
  return (
    // AnimatePresence permite animar componentes cuando "desaparecen" del DOM (cuando isVisible es false)
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          // Cambiamos absoluteFillObject por "fixed inset-0" para que cubra toda la pantalla incluso si hay scroll
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
            // Tarjeta central (Sustituye al VStack)
            className="flex flex-col items-center bg-white p-8 rounded-2xl shadow-2xl border border-slate-200"
          >
            {/* Spinner nativo animado con Tailwind */}
            <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
            
            <p className="mt-4 text-base font-semibold text-slate-700 text-center">
              {mensaje}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};