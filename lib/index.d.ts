import { FastifyServerOptions } from 'fastify'

export interface Options {
	idGenerator?: 'uuid' | 'sequence'
}

export default function fastifyServerOptions(options?: Options): Promise<FastifyServerOptions>
