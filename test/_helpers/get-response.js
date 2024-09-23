import fastify from 'fastify'
import pino from 'pino'
import {once, sink} from './helper.js'

export default async function getResponseWithLog (fastifyServerOptions, traceHeader) {
	const options = typeof fastifyServerOptions === 'function'
		? await fastifyServerOptions()
		: fastifyServerOptions
	const stream = sink()
	const optionsClone = {...options}
	delete  optionsClone.logger
	optionsClone.loggerInstance = pino(options.logger, stream)
	const app = fastify(optionsClone)
	app.get('/', (request, reply) => {
		request.log.info('message')
		reply.send('hi')
	})

	const requestOptions = {
		method: 'GET',
		url: '/',
	}

	if (traceHeader)
		requestOptions.headers = {
			['X-Cloud-Trace-Context']: traceHeader,
		}

	const response = await app.inject(requestOptions)

	const log = await once(stream, 'data')

	return {
		log,
		response,
	}
}
