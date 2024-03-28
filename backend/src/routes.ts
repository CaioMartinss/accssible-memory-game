import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply
} from 'fastify'
import { RegisterPlayer } from './controllers/CreatePlayerController'
import { ListPlayersController } from './controllers/ListPlayerController'
import { DeletePlayer } from './controllers/DeletePlayerController'
import { UpdatePlayerController } from './controllers/UpdatePlayerController'

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  fastify.get(
    '/player',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return ListPlayersController(request, reply)
    }
  )

  fastify.post(
    '/player',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return RegisterPlayer(request, reply)
    }
  )

  fastify.put(
    '/player/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return UpdatePlayerController(request, reply)
    }
  )

  fastify.delete(
    '/player',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return DeletePlayer(request, reply)
    }
  )

  fastify.get(
    '/ranking',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return { ok: true }
    }
  )
  fastify.post(
    '/ranking',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return { ok: true }
    }
  )
}
