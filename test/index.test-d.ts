import { FastifyServerOptions } from 'fastify';
import { expectType } from 'tsd'
import fastifyServerOptions from '../lib'

expectType<() => Promise<FastifyServerOptions>>(fastifyServerOptions)
