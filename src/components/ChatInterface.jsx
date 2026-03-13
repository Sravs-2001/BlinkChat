import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatInterface({ messages, onSend, onLeave, onNext, status }) {
    const [input, setInput] = useState('');
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            onSend(input);
            setInput('');
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-2rem)] w-[calc(100vw-2rem)] max-w-2xl bg-[#111111] rounded-2xl border border-white/[0.06] shadow-2xl relative overflow-hidden">
            
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                    </div>
                    <div>
                        <span className="font-semibold text-white text-sm tracking-tight">BlinkChat</span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                            <p className="text-[10px] text-neutral-500 font-medium">Connected</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={onLeave}
                        className="text-neutral-500 hover:text-neutral-300 transition-colors text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-white/[0.04]"
                    >
                        Leave
                    </button>
                    <button
                        onClick={onNext}
                        className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5"
                    >
                        Next
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
                <AnimatePresence initial={false}>
                    {messages.map((msg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className={`flex w-full ${msg.type === 'me' ? 'justify-end' :
                                    msg.type === 'system' ? 'justify-center' : 'justify-start'
                                }`}
                        >
                            {msg.type === 'system' ? (
                                <span className="text-neutral-600 text-[11px] font-medium py-2 px-4">
                                    {msg.text}
                                </span>
                            ) : (
                                <div
                                    className={`max-w-[75%] px-4 py-2.5 rounded-2xl relative group
                        ${msg.type === 'me'
                                            ? 'bg-emerald-500 text-black rounded-br-md'
                                            : 'bg-white/[0.06] text-neutral-200 rounded-bl-md border border-white/[0.04]'}`}
                                >
                                    <p className="text-[13px] leading-relaxed font-medium break-words">{msg.text}</p>
                                    <div className={`absolute bottom-[-1.25rem] ${msg.type === 'me' ? 'right-1' : 'left-1'} opacity-0 group-hover:opacity-100 transition-opacity`}>
                                        <span className="text-[9px] text-neutral-600 font-medium">
                                            {new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
                
                {status === 'ended' && (
                    <motion.div 
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="flex justify-center mt-8"
                    >
                        <button
                            onClick={onNext}
                            className="bg-emerald-500 text-black px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-emerald-400 active:scale-[0.98] transition-all shadow-lg shadow-emerald-500/20"
                        >
                            Find Someone New
                        </button>
                    </motion.div>
                )}
                <div ref={chatEndRef}></div>
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="px-5 py-4 border-t border-white/[0.06]">
                <div className="relative flex items-center">
                    <input
                        type="text"
                        placeholder={status === 'ended' ? "Chat ended..." : "Type a message..."}
                        disabled={status === 'ended'}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full bg-white/[0.04] text-white placeholder-neutral-600 rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-all border border-white/[0.06] disabled:opacity-40 disabled:cursor-not-allowed text-sm font-medium"
                    />
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={!input.trim() || status === 'ended'}
                        className="absolute right-2 p-2 bg-emerald-500 rounded-lg text-black hover:bg-emerald-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                        </svg>
                    </motion.button>
                </div>
            </form>
        </div>
    );
}
