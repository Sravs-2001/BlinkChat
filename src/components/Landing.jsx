import { motion } from 'framer-motion';

export default function Landing({ onStart }) {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full text-center relative overflow-hidden px-6">
            
            {/* Floating orbs */}
            <div className="absolute top-20 left-1/4 w-48 h-48 bg-emerald-500/5 rounded-full filter blur-[80px] animate-float"></div>
            <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-emerald-400/3 rounded-full filter blur-[100px] animate-float" style={{ animationDelay: '3s' }}></div>

            {/* Logo / Icon */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mb-8"
            >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                </div>
            </motion.div>

            {/* Title */}
            <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl md:text-6xl font-bold text-white mb-3 z-10 tracking-tight"
            >
                Blink<span className="text-emerald-400">Chat</span>
            </motion.h1>

            <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-neutral-500 text-base mb-10 max-w-sm z-10 font-normal leading-relaxed"
            >
                Talk to a stranger. No accounts. No history.
                <br />
                <span className="text-neutral-600 text-sm">Blink and it's gone.</span>
            </motion.p>

            <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                onClick={onStart}
                className="relative px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 rounded-xl text-black font-semibold text-sm
                   shadow-lg shadow-emerald-500/25 hover:shadow-emerald-400/30
                   transition-all duration-200 z-20 group overflow-hidden tracking-wide"
            >
                <span className="relative z-10 flex items-center gap-2.5">
                    Start Chatting
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                    </svg>
                </span>
            </motion.button>

            {/* Trust indicators */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-12 flex items-center gap-6 text-neutral-600 text-xs z-10"
            >
                <span className="flex items-center gap-1.5">
                    <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
                    Anonymous
                </span>
                <span className="flex items-center gap-1.5">
                    <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
                    Ephemeral
                </span>
                <span className="flex items-center gap-1.5">
                    <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
                    Real-time
                </span>
            </motion.div>

            <footer className="absolute bottom-6 text-neutral-700 text-[10px] tracking-widest uppercase">
                &copy; 2026 BlinkChat
            </footer>
        </div>
    );
}
