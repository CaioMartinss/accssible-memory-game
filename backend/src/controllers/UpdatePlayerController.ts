import { FastifyRequest, FastifyReply } from 'fastify'
import { UpdatePlayerService } from '../services/UpdatePlayerService'
import z from 'zod'

export async function UpdatePlayerController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const updateParamsSchema = z.object({
    id: z.string()
  })

  const updateBodySchema = z.object({
    name: z.string().optional(),
    password: z.string().min(8).optional()
  })

  const { id } = updateParamsSchema.parse(request.params)
  const { name, password } = updateBodySchema.parse(request.body)
  const updatePlayer = new UpdatePlayerService()

  try {
    const player = await updatePlayer.execute({
      id,
      name,
      password
    })

    return reply.send(player)
  } catch (error) {
    return reply.status(500).send({
      error: 'Internal server error'
    })
  }
}
