import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const port = 3000
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST']
  }
})

app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!!')
})

// app.listen(port, function (): void {
//   return console.log(`server is listening on ${port}`);
// });

io.on('connection', (socket) => {
  console.log('User connected', 'socket.id:', socket.id)
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
  socket.on('position', (pos) => {
    console.log('user position', pos)
  })
})

server.listen(port, () => {
  console.log(`listening on *:${port}`)
})
