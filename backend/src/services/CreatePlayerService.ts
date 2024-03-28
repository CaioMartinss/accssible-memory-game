import prismaCliente from '../prisma'
import { PlayerAlreadyExistsError } from './erros/player-already-exists-error'

interface createPlayerProps {
  name: string
  email: string
  password: string
}

export class CreatePlayerService {
  async execute({ name, email, password }: createPlayerProps) {
    const userWithSameEmail = await prismaCliente.player.findFirst({
      where: {
        email
      }
    })

    if (userWithSameEmail) {
      throw new PlayerAlreadyExistsError()
    }

    const player = await prismaCliente.player.create({
      data: {
        name,
        email,
        password
      }
    })

    return player
  }
}
