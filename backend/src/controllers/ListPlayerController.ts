import { FastifyRequest, FastifyReply } from 'fastify'
import { ListPlayersService } from '../services/ListPlayersService'
import { PlayerDataNotFound } from '../services/erros/player-data-not-found'

export async function ListPlayersController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const listPlayers = new ListPlayersService()
    const players = await listPlayers.execute()

    return reply.send(players)
  } catch (error) {
    if (error instanceof PlayerDataNotFound) {
      return reply.code(404).send({ error: error.message })
    }
    return reply.status(500).send()
  }
}
