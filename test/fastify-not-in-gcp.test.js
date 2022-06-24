import tap from 'tap'
import commonTests from './_helpers/common-tests.js'
import getResponseWithLog from './_helpers/get-response.js'
import lifecycles from './_helpers/lifecycles.js'

// Be sure the environment variable is not defined
delete process.env.K_SERVICE

// dynamically load the library to apply the environment variables before the import happens
import('../lib/index.js')
	.then(module => module.default)
	.then(fastifyServerOptions => {
		lifecycles(tap)
		commonTests(tap, fastifyServerOptions)

		tap.test('trace id should be a number', async ({equal, match}) => {
			const {response, log} = await getResponseWithLog(fastifyServerOptions)

			equal(response.statusCode, 200)
			match(log['logging.googleapis.com/trace'], /\d*/)
		})
	})
