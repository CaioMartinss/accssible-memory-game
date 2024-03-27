import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply
} from 'fastify'
import { RegisterPlayer } from './controllers/CreatePlayerController'
import { ListPlayersController } from './controllers/ListPlayerController'

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
