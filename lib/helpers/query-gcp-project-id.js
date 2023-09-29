import gpcMetadata from 'gcp-metadata'
import IS_GOOGLE_CLOUD_RUN from './is-google-cloud-run.js'

/**
 * Query the GCP Project ID from the metadata service
 *
 * @return {Promise<string>}
 */
export async function queryGcpProjectId() {
	if (!IS_GOOGLE_CLOUD_RUN)
		return 'not-cloud-run-runtime'

	const isGpcMetadataAvailable = await gpcMetadata.isAvailable()

	if (!isGpcMetadataAvailable)
		throw new Error('GCP Metadata is not available')

	return gpcMetadata.project('project-id')
}
