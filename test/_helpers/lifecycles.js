import {BASE_PATH, HEADERS, HOST_ADDRESS, SECONDARY_HOST_ADDRESS} from 'gcp-metadata'
import nock from 'nock'

export const GCP_PROJECT = 'fastify-project'

/**
 * @param {import('tap').default} tap
 */
export default function lifecycles (tap) {

	tap.before(() => {
		nock.disableNetConnect()
	})

	tap.beforeEach(() => {
		nock(HOST_ADDRESS)
			.get(`${BASE_PATH}/instance`)
			.reply(200, '{}', HEADERS)

		nock(SECONDARY_HOST_ADDRESS)
			.get(`${BASE_PATH}/instance`)
			.reply(200, '{}', HEADERS)

		nock(HOST_ADDRESS)
			.get(`${BASE_PATH}/project/project-id`)
			.reply(200, GCP_PROJECT, HEADERS)

		nock(SECONDARY_HOST_ADDRESS)
			.get(`${BASE_PATH}/project/project-id`)
			.reply(200, GCP_PROJECT, HEADERS)
	})

	tap.afterEach(() => {
		nock.cleanAll()
	})

	tap.after(() => {
		nock.enableNetConnect()
	})
}
