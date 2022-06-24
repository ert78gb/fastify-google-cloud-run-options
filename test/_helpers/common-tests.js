import fastify from 'fastify'
import getResponseWithLog from './get-response.js'

export default function commonTests(tap, fastifyServerOptions) {
	tap.test('should instantiate a fastify instance', async ({ok}) => {
		const options = await fastifyServerOptions()
		const app = fastify(options)

		ok(app)
	})

	tap.test('should not log request/access log', async ({equal}) => {
		const {response, log} = await getResponseWithLog(fastifyServerOptions)

		equal(response.statusCode, 200)
		equal(log.message, 'message')
	})

	tap.test('log entry should contains the "logging.googleapis.com/trace" property', async ({equal,hasOwnProp}) => {
		const {response, log} = await getResponseWithLog(fastifyServerOptions)

		equal(response.statusCode, 200)
		hasOwnProp(log, 'logging.googleapis.com/trace')
	})
}
