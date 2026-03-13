import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const tips = [
    "Be kind to strangers ✨",
    "Start with a friendly hello 👋",
    "Keep it fun and respectful 🤝",
    "The best chats start with curiosity 💭",
    "You never know who you'll meet 🌍",
];

export default function Waiting() {
    const [tipIndex, setTipIndex] = useState(0);
    const [dots, setDots] = useState('');

    // Rotate tips
    useEffect(() => {
        const interval = setInterval(() => {
            setTipIndex((prev) => (prev + 1) % tips.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Animated dots
    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center px-4 sm:px-6">
            {/* Radar-style concentric rings */}
            <div className="relative mb-8 sm:mb-10 flex items-center justify-center" style={{ width: 120, height: 120 }}>
                {/* Outermost ring */}
                <motion.div
                    animate={{ scale: [1, 2.2], opacity: [0.15, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
                    className="absolute w-14 h-14 border border-emerald-500/30 rounded-full"
                />
                {/* Middle ring */}
                <motion.div
                    animate={{ scale: [1, 1.8], opacity: [0.2, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeOut', delay: 0.6 }}
                    className="absolute w-14 h-14 border border-emerald-500/25 rounded-full"
                />
                {/* Inner ring */}
                <motion.div
                    animate={{ scale: [1, 1.4], opacity: [0.25, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeOut', delay: 1.2 }}
                    className="absolute w-14 h-14 border border-emerald-500/20 rounded-full"
                />

                {/* Rotating gradient ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    className="absolute w-20 h-20 rounded-full"
                    style={{
                        background: 'conic-gradient(from 0deg, transparent, rgba(16, 185, 129, 0.15), transparent)',
                    }}
                />

                {/* Center icon */}
                <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/25"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                    </svg>
                </motion.div>
            </div>

            <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg sm:text-xl font-semibold text-white mb-1.5 tracking-tight"
            >
                Finding someone{dots}
            </motion.h2>

            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-neutral-500 text-xs sm:text-sm font-normal mb-6"
            >
                Hang tight, connecting you to a stranger
            </motion.p>

            {/* Progress shimmer bar */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="w-48 sm:w-56 h-1 bg-white/[0.04] rounded-full overflow-hidden mb-8"
            >
                <motion.div
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-1/2 h-full bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent rounded-full"
                />
            </motion.div>

            {/* Rotating tips */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="h-10 flex items-center justify-center"
            >
                <motion.div
                    key={tipIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="px-4 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06]"
                >
                    <p className="text-neutral-500 text-[11px] sm:text-xs font-medium">
                        {tips[tipIndex]}
                    </p>
                </motion.div>
            </motion.div>

            {/* Animated dots */}
            <div className="mt-6 sm:mt-8 flex gap-1.5 justify-center">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        animate={{
                            scale: [1, 1.4, 1],
                            opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.2,
                            delay: i * 0.15,
                            ease: 'easeInOut',
                        }}
                        className="w-1.5 h-1.5 bg-emerald-400 rounded-full"
                    />
                ))}
            </div>
        </div>
    );
}
