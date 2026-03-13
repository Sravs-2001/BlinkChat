import { useState, useEffect } from 'react';
import Landing from './components/Landing';
import Waiting from './components/Waiting';
import ChatInterface from './components/ChatInterface';
import useChat from './hooks/useChat';

function App() {
  const { status, messages, startChat, sendMessage, leaveChat, nextChat } = useChat();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0a0a0a] font-sans text-white relative">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      ></div>

      {/* Accent glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/5 rounded-full filter blur-[120px] pointer-events-none z-0"></div>

      <main className="flex-1 flex items-center justify-center z-10 p-4">
        {status === 'landing' && <Landing onStart={startChat} />}
        {status === 'waiting' && <Waiting />}
        {(status === 'chatting' || status === 'ended') && (
          <ChatInterface
            messages={messages}
            onSend={sendMessage}
            onLeave={leaveChat}
            onNext={nextChat}
            status={status}
          />
        )}
      </main>
    </div>
  );
}

export default App;
