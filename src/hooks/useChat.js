import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

const ENDPOINT = import.meta.env.PROD ? window.location.origin : 'http://localhost:3000';

export default function useChat() {
  const [status, setStatus] = useState('landing'); // landing, waiting, chatting, ended
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState(null);
  const socketRef = useRef();

  useEffect(() => {
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const setupSocketListeners = () => {
    const socket = socketRef.current;

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('chat_start', (data) => {
      setRoomId(data.roomId);
      setStatus('chatting');
      setMessages([{ type: 'system', text: "You're connected to a stranger. Say Hi!" }]);
    });

    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, { type: 'stranger', text: data.message, time: data.timestamp }]);
    });

    socket.on('partner_left', () => {
      setMessages((prev) => [...prev, { type: 'system', text: 'Stranger has left the chat.' }]);
      setStatus('ended');
    });

    socket.on('partner_disconnected', () => {
      setMessages((prev) => [...prev, { type: 'system', text: 'Stranger has disconnected.' }]);
      setStatus('ended');
    });
  };

  const startChat = () => {
    if (socketRef.current) socketRef.current.disconnect();
    
    socketRef.current = io(ENDPOINT);
    setupSocketListeners();
    
    setMessages([]);
    setStatus('waiting');
    socketRef.current.emit('join_queue');
  };

  const sendMessage = (text) => {
    if (text.trim() && socketRef.current) {
      const msg = { type: 'me', text, time: new Date().toISOString() };
      setMessages((prev) => [...prev, msg]);
      socketRef.current.emit('send_message', { roomId, message: text });
    }
  };

  const leaveChat = () => {
    if (socketRef.current) {
      socketRef.current.emit('leave_chat', { roomId });
      socketRef.current.disconnect();
    }
    setStatus('landing');
    setMessages([]);
    setRoomId(null);
  };

  const nextChat = () => {
    leaveChat();
    // Use timeout to ensure disconnect completes before reconnect
    setTimeout(() => {
        startChat();
    }, 100);
  };

  return { status, messages, startChat, sendMessage, leaveChat, nextChat };
}
