import { motion } from 'framer-motion';

export default function Waiting() {
    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center px-6">
            {/* Pulsing ring */}
            <div className="relative mb-10">
                <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.05, 0.2] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 w-16 h-16 border border-emerald-500/30 rounded-full -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
                />
                <motion.div
                    animate={{ scale: [1, 1.6, 1], opacity: [0.15, 0.02, 0.15] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                    className="absolute inset-0 w-24 h-24 border border-emerald-500/20 rounded-full -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
                />
                <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center relative z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                </div>
            </div>
            
            <h2 className="text-lg font-semibold text-white mb-1.5 tracking-tight">
                Finding someone...
            </h2>
            <p className="text-neutral-500 text-sm font-normal">
                Hang tight, connecting you to a stranger
            </p>

            <div className="mt-8 flex gap-1.5 justify-center">
                <motion.div 
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ repeat: Infinity, duration: 1.2, delay: 0 }}
                    className="w-1 h-1 bg-emerald-400 rounded-full" 
                />
                <motion.div 
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }}
                    className="w-1 h-1 bg-emerald-400 rounded-full" 
                />
                <motion.div 
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }}
                    className="w-1 h-1 bg-emerald-400 rounded-full" 
                />
            </div>
        </div>
    );
}
