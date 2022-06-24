import loggerOptions from '@ert78gb/pino-google-cloud-run-options'
import {requestIdGenerator} from './request-id/request-id-generator.js'

/**
 * Returns with the default fastify options for the Google Cloud Run
 *
 * @return {Promise<import('fastify').FastifyServerOptions>}
 */
export default async function fastifyServerOptions() {
	return {
		disableRequestLogging: true,
		genReqId: await requestIdGenerator(),
		logger: loggerOptions,
		requestIdLogLabel: 'logging.googleapis.com/trace',
		trustProxy: true,
	}
}
