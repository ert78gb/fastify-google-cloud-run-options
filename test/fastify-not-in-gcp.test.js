import tap from 'tap'
import commonTests from './_helpers/common-tests.js'
import getResponseWithLog from './_helpers/get-response.js'
import lifecycles from './_helpers/lifecycles.js'

// Be sure the environment variable is not defined
delete process.env.K_SERVICE

// dynamically load the library to apply the environment variables before the import happens
const {default: fastifyServerOptions} = await import('../lib/index.js')
lifecycles(tap)
commonTests(tap, fastifyServerOptions)

tap.test('trace id should be a number', async ({equal, match}) => {
	const {response, log} = await getResponseWithLog(fastifyServerOptions)

	equal(response.statusCode, 200)
	match(log['logging.googleapis.com/trace'], /\d*/)
})

tap.test('should support uuid as request id', async ({equal, match}) => {
	const options = await fastifyServerOptions({
		idGenerator: 'uuid'
	})
	const {response, log} = await getResponseWithLog(options)

	equal(response.statusCode, 200)
	match(log['logging.googleapis.com/trace'], /^[\dA-Fa-f-]{36}$/)
})
