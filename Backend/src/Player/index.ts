export type Position = {
  x: number,
  y: number
}

class Player {
  private position
  private socketId

  constructor(socketId: string) {
    this.socketId = socketId
  }

  set Position(position: Position) {
    this.position = position
  }
  get Position(): Position {
    return this.position
  }

  get SocketId(): string {
    return this.socketId
  }
}

export default Player
