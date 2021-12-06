import Player from '../Player'

class Players {
  public static connected: Player[]

  public static add(player: Player): void {
    if (!this.connected) {
      this.connected = []
    }

    this.connected.push(player)
  }

  public static removeBySocketId(socketId: string): void {
    this.connected = this.connected.filter(p => {
      if (p.SocketId !== socketId) {
        return p
      }
    })
  }
  public static remove(player: Player): void {
    this.connected = this.connected.filter(p => {
      if (p.SocketId !== player.SocketId) {
        return p
      }
    })
  }
}

export default Players
