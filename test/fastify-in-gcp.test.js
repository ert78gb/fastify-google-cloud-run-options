import tap from 'tap'
import commonTests from './_helpers/common-tests.js'
import getResponseWithLog from './_helpers/get-response.js'
import lifecycles, {GCP_PROJECT} from './_helpers/lifecycles.js'

// Be sure the environment variable has value
process.env.K_SERVICE = 'fastify-service'

// dynamically load the library to apply the environment variables before the import happens
import('../lib/index.js')
	.then(module => module.default)
	.then(fastifyServerOptions => {
		lifecycles(tap)
		commonTests(tap, fastifyServerOptions)

		tap.test(`"logging.googleapis.com/trace" should starts with "projects/${GCP_PROJECT}/traces/"`, async ({
			equal,
			match,
		}) => {
			const {response, log} = await getResponseWithLog(fastifyServerOptions)

			equal(response.statusCode, 200)
			match(log['logging.googleapis.com/trace'], new RegExp(`^projects\\/${GCP_PROJECT}\\/traces\\/`))
		})

		tap.test('trace id should be an auto generated 32 characters log hexadecimal string if x-cloud-trace-context header not provided', async ({
			equal,
			match,
		}) => {
			const {response, log} = await getResponseWithLog(fastifyServerOptions)

			equal(response.statusCode, 200)
			const traceId = log['logging.googleapis.com/trace'].split('/').pop()
			match(traceId, /^[\dA-Fa-f]{32}$/)
		})

		tap.test('trace id should be the x-cloud-trace-context header if provided', async ({equal, match}) => {
			const traceHeader = 'trace-header-value'
			const {response, log} = await getResponseWithLog(fastifyServerOptions, traceHeader)

			equal(response.statusCode, 200)
			const traceId = log['logging.googleapis.com/trace'].split('/').pop()
			match(traceId, traceHeader)
		})
	})
