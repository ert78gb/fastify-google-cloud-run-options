import IS_GOOGLE_CLOUD_RUN from '../helpers/is-google-cloud-run.js'
import {cloudRunRequestIdGenerator} from './cloud-run-request-id-generator.js'
import {sequenceRequestIdGenerator} from './sequence-request-id-generator.js'

export async function requestIdGenerator() {
	if (IS_GOOGLE_CLOUD_RUN)
		return cloudRunRequestIdGenerator()

	return sequenceRequestIdGenerator()
}
