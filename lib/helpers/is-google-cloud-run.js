// Cloud Run set the service name in the K_SERVICE environment variable
// If you want to simulate the Cloud Run environment then set the K_SERVICE
const IS_GOOGLE_CLOUD_RUN = process.env.K_SERVICE !== undefined

export default IS_GOOGLE_CLOUD_RUN
