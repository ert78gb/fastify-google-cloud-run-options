import loggerOptions from '@ert78gb/pino-google-cloud-run-options'
import {requestIdGenerator} from './request-id/request-id-generator.js'

/**
 * Returns with the default fastify options for the Google Cloud Run
 * @param {string} idGenerator - What is the id generation method when service not running on Google Cloud Run. Values: uuid, sequence
 *
 * @return {Promise<import('fastify').FastifyServerOptions>}
 */
export default async function fastifyServerOptions({idGenerator} = {}) {
	return {
		disableRequestLogging: true,
		genReqId: await requestIdGenerator({idGenerator}),
		logger: loggerOptions,
		requestIdLogLabel: 'logging.googleapis.com/trace',
		trustProxy: true,
	}
}
