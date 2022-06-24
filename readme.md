# Fastify Google Cloud Run options

Require: Node >=14.17.0

The package contains default configuration of the [fastify](https://github.com/fastify/fastify) in the
Google [Cloud Run](https://cloud.google.com/run).

Cloud Run automatically logs the request. The request contains
the [httpRequest](https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#httprequest) information so not
needed to log it by fastify.

Google Cloud Log Explorer group the logs by `trace` property. The `trace` property is the equivalent with the `reqId` of
fastify.

The lib contains the following options

- `disableRequestLogging: true` disable fastify request logging
- `requestIdLogLabel: 'logging.googleapis.com/trace'` rename the requestId log label
- read the `trace` value from the `X-Cloud-Trace-Context` request header
- uses the pino logger options from
	the [@ert78gb/pino-google-cloud-run-options](https://github.com/ert78gb/pino-google-cloud-run-options) package

```javascript
import fastifyServerOptions from '@ert78gb/fastify-google-cloud-run-options'
import fastify from 'fastify'

// It is an asynchronous function because it reads the GCP_PROJECT ID from the GCP metaserver 
const options = await fastifyServerOptions();
const app = fastify(options)

// OR you can extend the options
const options = await fastifyServerOptions();
const app = fastify({
  ...options
  // custom settings
})
```

If the app runs in development mode (not in the Cloud Run runtime) then the requestId is a sequence number. 
```json5
{
  "logging.googleapis.com/trace": 1,
  //...
}
```
