
import { io, Socket } from 'socket.io-client'
import { Position } from '../types/Position.types'

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: () => void;
  position: (pos: Position) => void;
}

class SocketClient {
  // private static manager: Manager
  private static socket: Socket<ServerToClientEvents, ClientToServerEvents>

  public static init(): void {
    SocketClient.socket = io('ws://localhost:3000')
  }

  public static open(): void {
    this.socket.open()
  }

  public static emitPosition(pos: Position): void {
    this.socket.emit('position', pos)
  }
}

export default SocketClient
