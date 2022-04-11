import type { QueryStore } from './query-store';

export function createStoreProxy<J extends QueryStore<any>>(
	store: J,
	host: `http://${string}:${number}` = 'http://localhost:3001'
): J {
	// parse streaming response to actions and dispatch
	const es = new EventSource(`${host}/stream`);
	es.onmessage = (ev) => store.dispatch(JSON.parse(ev.data));
	es.onerror = (e) => console.error('EventSource: error', e);

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
				const callable = typeof target[prop] === 'function';
				return !callable
					? target[prop]
					: function () {
							// eslint-disable-next-line prefer-rest-params
							return target[prop](...arguments);
					  };
			}
		}
	});
}
