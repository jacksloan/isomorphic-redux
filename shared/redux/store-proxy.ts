import type { QueryStore } from './query-store';

export function createStoreProxy<T>(
	store: QueryStore<T>,
	host = 'http://localhost:3001'
): QueryStore<T> {
	// TODO EventSource is not working
	const es = new EventSource(`http://localhost:3001/stream`);
	es.onmessage = console.log;
	es.onopen = () => console.log('Event: open');

	return new Proxy(store, {
		get(target, prop) {
			if (prop === 'dispatch') {
				return function () {
					fetch(`${host}/command`, {
						method: 'post',
						headers: {
							'Content-Type': 'application/json'
						},
						// eslint-disable-next-line prefer-rest-params
						body: JSON.stringify(arguments[0])
					});
				};
			} else {
				return function () {
					// eslint-disable-next-line prefer-rest-params
					return target[prop](...arguments);
				};
			}
		}
	});
}
