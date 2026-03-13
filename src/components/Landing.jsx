import { motion } from 'framer-motion';
import { useState } from 'react';

const staggerContainer = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

const fadeUp = {
    hidden: { y: 30, opacity: 0, filter: 'blur(8px)' },
    show: {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
};

const features = [
    { icon: '🔒', label: 'Anonymous', desc: 'No sign-up needed' },
    { icon: '⚡', label: 'Instant', desc: 'Connect in seconds' },
    { icon: '💨', label: 'Ephemeral', desc: 'Nothing is saved' },
];

export default function Landing({ onStart, onlineCount = 0 }) {
    const [isHovered, setIsHovered] = useState(false);
    const [ripple, setRipple] = useState(null);

    const handleClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setRipple({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
        setTimeout(() => {
            onStart();
        }, 300);
    };

    return (
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center justify-center h-full w-full text-center relative overflow-hidden px-4 sm:px-6"
        >
            {/* Animated floating orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.04, 0.08, 0.04],
                    rotate: [0, 180, 360],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-10 sm:top-20 left-1/4 w-32 h-32 sm:w-48 sm:h-48 bg-emerald-500 rounded-full filter blur-[80px]"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.03, 0.06, 0.03],
                    rotate: [360, 180, 0],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-10 sm:bottom-20 right-1/4 w-40 h-40 sm:w-64 sm:h-64 bg-emerald-400 rounded-full filter blur-[100px]"
            />

            {/* Logo with pulse ring */}
            <motion.div variants={fadeUp} className="mb-6 sm:mb-8 relative">
                {/* Pulse rings */}
                <motion.div
                    animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                    className="absolute inset-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-500/20 m-auto"
                    style={{ top: 0, left: 0, right: 0, bottom: 0 }}
                />
                <motion.div
                    animate={{ scale: [1, 1.8], opacity: [0.2, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
                    className="absolute inset-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-500/10 m-auto"
                    style={{ top: 0, left: 0, right: 0, bottom: 0 }}
                />
                <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/25"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-7 sm:h-7">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                </motion.div>
            </motion.div>

            {/* Title with gradient text */}
            <motion.h1
                variants={fadeUp}
                className="text-4xl xs:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3 z-10 tracking-tight"
            >
                Blink<span className="bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Chat</span>
            </motion.h1>

            <motion.p
                variants={fadeUp}
                className="text-neutral-500 text-sm sm:text-base mb-8 sm:mb-10 max-w-xs sm:max-w-sm z-10 font-normal leading-relaxed"
            >
                Talk to a stranger. No accounts. No history.
                <br />
                <span className="text-neutral-600 text-xs sm:text-sm">Blink and it's gone.</span>
            </motion.p>

            {/* CTA Button with ripple */}
            <motion.div variants={fadeUp}>
                <motion.button
                    whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(16, 185, 129, 0.3)' }}
                    whileTap={{ scale: 0.97 }}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    onClick={handleClick}
                    className="relative px-7 sm:px-9 py-3 sm:py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 rounded-xl text-black font-semibold text-sm
                       shadow-lg shadow-emerald-500/25 hover:shadow-emerald-400/35
                       transition-all duration-300 z-20 group overflow-hidden tracking-wide"
                >
                    {/* Shimmer overlay */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: isHovered ? ['-100%', '100%'] : '-100%' }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                    />

                    {/* Ripple */}
                    {ripple && (
                        <span
                            className="absolute bg-white/30 rounded-full"
                            style={{
                                left: ripple.x - 10,
                                top: ripple.y - 10,
                                width: 20,
                                height: 20,
                                animation: 'ripple 0.6s ease-out forwards',
                            }}
                        />
                    )}

                    <span className="relative z-10 flex items-center gap-2.5">
                        Start Chatting
                        <motion.svg
                            animate={{ x: isHovered ? 3 : 0 }}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                        </motion.svg>
                    </span>
                </motion.button>
            </motion.div>

            {/* Feature cards */}
            <motion.div
                variants={fadeUp}
                className="mt-10 sm:mt-14 grid grid-cols-3 gap-3 sm:gap-4 max-w-xs sm:max-w-md z-10 w-full"
            >
                {features.map((feat, i) => (
                    <motion.div
                        key={feat.label}
                        whileHover={{ y: -4, borderColor: 'rgba(16, 185, 129, 0.2)' }}
                        className="flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 cursor-default"
                    >
                        <span className="text-lg sm:text-xl">{feat.icon}</span>
                        <span className="text-[11px] sm:text-xs text-white font-medium">{feat.label}</span>
                        <span className="text-[9px] sm:text-[10px] text-neutral-600 hidden xs:block">{feat.desc}</span>
                    </motion.div>
                ))}
            </motion.div>

            {/* Online indicator */}
            <motion.div
                variants={fadeUp}
                className="mt-6 sm:mt-8 flex items-center gap-2.5 text-neutral-500 text-[10px] sm:text-xs z-10 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06]"
            >
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="font-semibold text-emerald-400 tabular-nums">{onlineCount}</span>
                <span>{onlineCount === 1 ? 'user' : 'users'} online now</span>
            </motion.div>

            <footer className="absolute bottom-4 sm:bottom-6 text-neutral-700 text-[9px] sm:text-[10px] tracking-widest uppercase safe-area-bottom">
                &copy; 2026 BlinkChat
            </footer>
        </motion.div>
    );
}
