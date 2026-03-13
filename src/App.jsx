import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Landing from './components/Landing';
import Waiting from './components/Waiting';
import ChatInterface from './components/ChatInterface';
import useChat from './hooks/useChat';

// Floating particles component
function FloatingParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.3 + 0.1,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute bottom-0 rounded-full bg-emerald-500 animate-particle"
          style={{
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

const pageVariants = {
  initial: { opacity: 0, scale: 0.96, filter: 'blur(8px)' },
  animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, scale: 1.02, filter: 'blur(6px)' },
};

const pageTransition = {
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1],
};

function App() {
  const { status, messages, onlineCount, startChat, sendMessage, leaveChat, nextChat } = useChat();

  return (
    <div className="flex h-[100dvh] w-screen overflow-hidden bg-[#0a0a0a] font-sans text-white relative">
      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Animated accent glows */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 10, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] sm:w-[600px] sm:h-[300px] bg-emerald-500/5 rounded-full filter blur-[120px] pointer-events-none z-0"
      />
      <motion.div
        animate={{
          x: [0, -40, 20, 0],
          y: [0, 30, -15, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-0 right-1/4 w-[300px] h-[200px] sm:w-[500px] sm:h-[300px] bg-emerald-400/3 rounded-full filter blur-[100px] pointer-events-none z-0"
      />

      {/* Floating particles */}
      <FloatingParticles />

      <main className="flex-1 flex items-center justify-center z-10 p-2 sm:p-4">
        <AnimatePresence mode="wait">
          {status === 'landing' && (
            <motion.div
              key="landing"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
              className="w-full h-full flex items-center justify-center"
            >
              <Landing onStart={startChat} onlineCount={onlineCount} />
            </motion.div>
          )}
          {status === 'waiting' && (
            <motion.div
              key="waiting"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
              className="w-full h-full flex items-center justify-center"
            >
              <Waiting />
            </motion.div>
          )}
          {(status === 'chatting' || status === 'ended') && (
            <motion.div
              key="chatting"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
              className="w-full h-full flex items-center justify-center"
            >
              <ChatInterface
                messages={messages}
                onSend={sendMessage}
                onLeave={leaveChat}
                onNext={nextChat}
                status={status}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
