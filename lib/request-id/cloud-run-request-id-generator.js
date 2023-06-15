import {randomUUID} from 'node:crypto'
import {queryGcpProjectId} from '../helpers/query-gcp-project-id.js'

export async function cloudRunRequestIdGenerator () {
	const projectId = await queryGcpProjectId()

	return function _cloudRunRequestIdGenerator(request) {
		const traceHeader = request.headers['x-cloud-trace-context']
		if (traceHeader) {
			const [trace] = traceHeader.split('/')
			return `projects/${projectId}/traces/${trace}`
		}

		const trace = randomUUID().replaceAll('-', '')
		return `projects/${projectId}/traces/${trace}`
	}
}
