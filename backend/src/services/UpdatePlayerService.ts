import prismaCliente from '../prisma'
import { PlayerNotFound } from './erros/player-not-found'

interface updatePlayerProps {
  id: string
  name?: string
  password?: string
}

export class UpdatePlayerService {
  async execute({ id, name, password }: updatePlayerProps) {
    const playerExists = await prismaCliente.player.findFirst({
      where: {
        id
      }
    })

    if (!playerExists) {
      throw new PlayerNotFound()
    }

    const player = await prismaCliente.player.update({
      where: {
        id
      },
      data: {
        name,
        password
      }
    })

    return player
  }
}
