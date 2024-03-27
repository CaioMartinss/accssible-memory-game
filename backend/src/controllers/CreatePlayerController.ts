import { FastifyRequest, FastifyReply } from 'fastify'
import { CreatePlayerService } from '../services/CreatePlayerService'
import z from 'zod'
import { PlayerAlreadyExistsError } from '../services/erros/player-already-exists-error'
import { PlayerDataNotFound } from '../services/erros/player-data-not-found'

export async function RegisterPlayer(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8)
  })
  const { name, email, password } = registerBodySchema.parse(request.body)

  const createPlayer = new CreatePlayerService()
  try {
    const player = await createPlayer.execute({
      name,
      email,
      password,
      score: 0
    })

    return reply.send(player)
  } catch (error) {
    if (error instanceof PlayerAlreadyExistsError) {
      return reply.code(400).send({ error: error.message })
    }
    if (error instanceof PlayerDataNotFound) {
      return reply.code(404).send({ error: error.message })
    }
    return reply.status(500).send({
      error: 'bucetinha suja'
    })
  }
}
