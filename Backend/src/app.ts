import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import Player, { Position } from './Player'
import Players from './Players'

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: () => void;
  position: (position: Position) => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}

const app = express()
const server = http.createServer(app)
const port = 3000
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST']
  }
})


app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!!')
})

io.on('connection', (socket) => {
  console.log('User connected', 'socket.id:', socket.id)
  const player = new Player(socket.id)
  Players.add(player)

  socket.on('disconnect', () => {
    console.log('user disconnected', player.SocketId)
    Players.remove(player)
  })

  socket.on('position', (pos) => {
    const connectedClientsSize = io.of('/').sockets
    // console.log('connected clients', connectedClientsSize)
  })
})

server.listen(port, () => {
  console.log(`listening on *:${port}`)
})
