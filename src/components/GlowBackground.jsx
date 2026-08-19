import React from 'react';
import { motion } from 'framer-motion';

export default function GlowBackground({ children }) {
    return (
        <div className="relative w-full overflow-hidden bg-[#010101]">

            {/* --- THE SOLID BLUE BASE --- */}
            <motion.div
                className="absolute inset-0 bg-[#065cc8]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
            ></motion.div>

            {/* --- THE GLOWING CORE (HORIZONTAL BLOOM) --- */}
            <motion.div
                className="absolute top-[97vh] left-1/2 w-[130vw] h-[35vh] origin-center pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center, #ffffff 0%, #6dccec 30%, #065cc8 70%, transparent 100%)',
                    filter: 'blur(35px)',
                }}
                initial={{ x: "-50%", y: "-50%", scaleX: 0, opacity: 0 }}
                animate={{ x: "-50%", y: "-50%", scaleX: 1, opacity: 0.95 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            ></motion.div>

            {/* --- THE GEOMETRIC MASKS --- */}
            <div className="absolute left-1/2 bg-[#010101] rounded-full pointer-events-none z-0" style={{ width: '130vw', height: '130vw', transform: 'translateX(-50%)', top: 'calc(88vh - 130vw)', filter: 'blur(60px)' }}></div>
            <div className="absolute left-1/2 bg-[#010101] rounded-full pointer-events-none z-0" style={{ width: '100vw', height: '100vw', transform: 'translateX(-50%)', top: '112vh', filter: 'blur(60px)' }}></div>
            <div className="absolute left-0 w-full h-[400vh] bg-[#010101] pointer-events-none z-0" style={{ top: 'calc(112vh + 45vw)' }}></div>

            {/* --- THE TEXTURE LAYERS --- */}
            <motion.div
                className="absolute inset-0 pointer-events-none z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
            >
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `linear-gradient(rgba(109, 204, 236, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(109, 204, 236, 0.15) 1px, transparent 1px)`, backgroundSize: '24px 24px' }}></div>
                <div className="absolute inset-0 opacity-20 mix-blend-multiply" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.8) 2px, rgba(0, 0, 0, 0.8) 4px)' }}></div>
                <div className="absolute inset-0 opacity-[0.12] mix-blend-overlay" style={{ backgroundImage: 'url(/img.png)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'grayscale(100%) contrast(150%)' }}></div>
            </motion.div>

            {/* --- NON-ANIMATED WRAPPER --- */}
            {/* Let the Hero component handle its own staggered timing! */}
            <div className="relative z-20 flex w-full flex-col text-white">
                {children}
            </div>
        </div>
    );
}