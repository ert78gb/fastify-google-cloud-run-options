import fastify from 'fastify'
import tap from 'tap'

tap.test('fastify', async t => {
	t.test('should be exit', async ({equal}) => {
		const app = fastify()
		app.get('/', (request, reply) => {
			reply.send('hi')
		})

		const requestOptions = {
			method: 'GET',
			url: '/',
		}

		const response = await app.inject(requestOptions)

		equal(response.statusCode, 200)
	})
})
