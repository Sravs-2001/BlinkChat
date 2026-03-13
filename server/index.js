import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

// Serve static files from the custom build directory
app.use(express.static(path.join(__dirname, '../dist')));

const PORT = process.env.PORT || 3000;

let waitingQueue = [];

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('join_queue', () => {
    if (waitingQueue.find(user => user.id === socket.id)) return; 

    waitingQueue.push(socket);
    console.log(`User ${socket.id} joined queue. Queue size: ${waitingQueue.length}`);

    if (waitingQueue.length >= 2) {
      const user1 = waitingQueue.shift();
      const user2 = waitingQueue.shift();
      const roomId = uuidv4();

      user1.join(roomId);
      user2.join(roomId);

      io.to(roomId).emit('chat_start', { roomId });
      console.log(`Paired ${user1.id} and ${user2.id} in room ${roomId}`);
    }
  });

  socket.on('send_message', (data) => {
    const { roomId, message } = data;
    socket.to(roomId).emit('receive_message', { 
      message, 
      senderId: socket.id,
      timestamp: new Date().toISOString()
    });
  });

  socket.on('leave_chat', ({ roomId }) => {
    socket.leave(roomId);
    socket.to(roomId).emit('partner_left');
    console.log(`User ${socket.id} left room ${roomId}`);
  });

  socket.on('disconnect', () => {
    waitingQueue = waitingQueue.filter(user => user.id !== socket.id);
    console.log(`User disconnected: ${socket.id}`);
  });

  socket.on('disconnecting', () => {
    const rooms = socket.rooms;
    rooms.forEach((roomId) => {
        if (roomId !== socket.id) {
            socket.to(roomId).emit('partner_disconnected');
        }
    });
  });
});

// Handle React routing, return all requests to React app
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
