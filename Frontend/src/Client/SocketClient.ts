
import { io, Socket } from 'socket.io-client'

class SocketClient {
  // private static manager: Manager
  private static socket: Socket

  public static init(): void {
    SocketClient.socket = io('ws://localhost:3000')
  }

  public static open(): void {
    this.socket.open()
  }

  public static emitPosition(pos): void {
    this.socket.emit('position', pos)
  }
}

export default SocketClient
