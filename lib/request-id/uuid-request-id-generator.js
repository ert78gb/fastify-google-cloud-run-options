import {randomUUID} from 'node:crypto'

export function uuidRequestIdGenerator () {
	return function uuidRequestHandler () {
		return randomUUID()
	}
}
