import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messageVariants = {
    hidden: { opacity: 0, y: 12, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } },
};

function TypingIndicator() {
    return (
        <div className="flex items-center gap-1 px-4 py-3 bg-white/[0.04] rounded-2xl rounded-bl-md border border-white/[0.04] w-fit">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.15,
                        ease: 'easeInOut',
                    }}
                    className="w-1.5 h-1.5 bg-neutral-500 rounded-full"
                />
            ))}
        </div>
    );
}

function ConnectionBanner({ status }) {
    if (status !== 'ended') return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-16 sm:top-[62px] left-0 right-0 z-20 mx-3 sm:mx-5"
        >
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 flex items-center justify-center gap-2">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                <span className="text-red-400 text-[11px] sm:text-xs font-medium">
                    Stranger disconnected
                </span>
            </div>
        </motion.div>
    );
}

export default function ChatInterface({ messages, onSend, onLeave, onNext, status }) {
    const [input, setInput] = useState('');
    const [showScrollBtn, setShowScrollBtn] = useState(false);
    const chatEndRef = useRef(null);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Show/hide scroll-to-bottom button
    useEffect(() => {
        const container = chatContainerRef.current;
        if (!container) return;
        const handleScroll = () => {
            const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
            setShowScrollBtn(!isNearBottom);
        };
        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            onSend(input);
            setInput('');
        }
    };

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="flex flex-col h-[100dvh] sm:h-[calc(100vh-2rem)] w-full sm:w-[calc(100vw-2rem)] max-w-2xl bg-[#111111]/90 sm:rounded-2xl border-0 sm:border border-white/[0.06] shadow-2xl relative overflow-hidden backdrop-blur-sm">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between px-3 sm:px-5 py-3 sm:py-4 border-b border-white/[0.06] glass safe-area-top relative z-10"
            >
                <div className="flex items-center gap-2.5 sm:gap-3">
                    <motion.div
                        whileHover={{ rotate: [0, -5, 5, 0] }}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-[14px] sm:h-[14px]">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                    </motion.div>
                    <div>
                        <span className="font-semibold text-white text-xs sm:text-sm tracking-tight">BlinkChat</span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <motion.div
                                animate={status === 'chatting' ? {
                                    scale: [1, 1.3, 1],
                                    opacity: [1, 0.7, 1],
                                } : {}}
                                transition={{ duration: 2, repeat: Infinity }}
                                className={`w-1.5 h-1.5 rounded-full ${status === 'chatting' ? 'bg-emerald-500' : 'bg-red-400'}`}
                            />
                            <p className="text-[9px] sm:text-[10px] text-neutral-500 font-medium">
                                {status === 'chatting' ? 'Connected' : 'Disconnected'}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onLeave}
                        className="text-neutral-500 hover:text-neutral-300 transition-colors text-[11px] sm:text-xs font-medium px-2.5 sm:px-3 py-1.5 rounded-lg hover:bg-white/[0.04] active:bg-white/[0.06]"
                    >
                        Leave
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(16, 185, 129, 0.15)' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 px-3 sm:px-4 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-all flex items-center gap-1.5"
                    >
                        Next
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="sm:w-3 sm:h-3">
                            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                        </svg>
                    </motion.button>
                </div>
            </motion.div>

            {/* Connection banner */}
            <ConnectionBanner status={status} />

            {/* Messages */}
            <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto px-3 sm:px-5 py-3 sm:py-4 space-y-2.5 sm:space-y-3 relative"
            >
                {/* Empty state */}
                {messages.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center h-full gap-3 text-neutral-600"
                    >
                        <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-30">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                            </svg>
                        </motion.div>
                        <p className="text-xs font-medium">Start the conversation...</p>
                    </motion.div>
                )}

                <AnimatePresence initial={false}>
                    {messages.map((msg, index) => (
                        <motion.div
                            key={index}
                            variants={messageVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            layout
                            className={`flex w-full ${msg.type === 'me' ? 'justify-end' :
                                    msg.type === 'system' ? 'justify-center' : 'justify-start'
                                }`}
                        >
                            {msg.type === 'system' ? (
                                <motion.span
                                    className="text-neutral-600 text-[10px] sm:text-[11px] font-medium py-1.5 sm:py-2 px-3 sm:px-4 bg-white/[0.02] rounded-full border border-white/[0.04]"
                                >
                                    {msg.text}
                                </motion.span>
                            ) : (
                                <motion.div
                                    whileHover={{ scale: 1.01 }}
                                    className={`max-w-[80%] sm:max-w-[75%] px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl relative group
                                        ${msg.type === 'me'
                                            ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-black rounded-br-md shadow-md shadow-emerald-500/10'
                                            : 'bg-white/[0.06] text-neutral-200 rounded-bl-md border border-white/[0.04]'}`}
                                >
                                    <p className="text-[12px] sm:text-[13px] leading-relaxed font-medium break-words">{msg.text}</p>
                                    <div className={`absolute bottom-[-1.25rem] ${msg.type === 'me' ? 'right-1' : 'left-1'} opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
                                        <span className="text-[8px] sm:text-[9px] text-neutral-600 font-medium">
                                            {msg.time ? new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                        </span>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {status === 'ended' && (
                    <motion.div
                        initial={{ y: 15, opacity: 0, scale: 0.95 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col items-center gap-3 mt-6 sm:mt-8"
                    >
                        <p className="text-neutral-600 text-xs font-medium">Chat ended</p>
                        <motion.button
                            whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(16, 185, 129, 0.25)' }}
                            whileTap={{ scale: 0.97 }}
                            onClick={onNext}
                            className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-black px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm hover:from-emerald-400 hover:to-emerald-300 transition-all shadow-lg shadow-emerald-500/20"
                        >
                            Find Someone New ✨
                        </motion.button>
                    </motion.div>
                )}
                <div ref={chatEndRef}></div>
            </div>

            {/* Scroll to bottom FAB */}
            <AnimatePresence>
                {showScrollBtn && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={scrollToBottom}
                        className="absolute bottom-20 sm:bottom-24 right-3 sm:right-5 z-20 w-8 h-8 bg-surface-elevated/90 backdrop-blur-sm border border-white/[0.08] rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:border-emerald-500/30 transition-all shadow-lg"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m6 9 6 6 6-6"/>
                        </svg>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Input */}
            <motion.form
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onSubmit={handleSubmit}
                className="px-3 sm:px-5 py-3 sm:py-4 border-t border-white/[0.06] safe-area-bottom"
            >
                <div className="relative flex items-center">
                    <input
                        type="text"
                        placeholder={status === 'ended' ? "Chat ended..." : "Type a message..."}
                        disabled={status === 'ended'}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full bg-white/[0.04] text-white placeholder-neutral-600 rounded-xl py-2.5 sm:py-3 pl-3.5 sm:pl-4 pr-11 sm:pr-12 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 focus:bg-white/[0.06] transition-all border border-white/[0.06] hover:border-white/[0.1] disabled:opacity-40 disabled:cursor-not-allowed text-sm font-medium"
                    />
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="submit"
                        disabled={!input.trim() || status === 'ended'}
                        className="absolute right-1.5 sm:right-2 p-1.5 sm:p-2 bg-emerald-500 rounded-lg text-black hover:bg-emerald-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m22 2-7 20-4-9-9-4z"/><path d="m22 2-11 11"/>
                        </svg>
                    </motion.button>
                </div>
            </motion.form>
        </div>
    );
}
