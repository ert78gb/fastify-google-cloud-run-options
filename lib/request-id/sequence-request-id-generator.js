export function sequenceRequestIdGenerator () {
	let requestId = 0

	return function sequenceRequestHandler () {
		return requestId++
	}
}
