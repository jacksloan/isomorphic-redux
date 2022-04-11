import type { Action } from 'ts-action';
import type { QueryStore } from './query-store';

export function createStoreProxy<T extends QueryStore<any>>(
	localStore: T,
	host: `http://${string}:${number}` = 'http://localhost:3001'
): T {
	// receive incoming actions and dispatch them to the in memory store
	const es = new EventSource(`${host}/stream`);
	es.onmessage = (ev) => localStore.dispatch(JSON.parse(ev.data));
	es.onerror = (e) => console.error('EventSource: error', e);

	// intercept calls to "dispatch"
	// dispatch actions to the remote store
	return new Proxy(localStore, {
		get(target, prop) {
			return prop === 'dispatch' ? createPostFunc(`${host}/command`) : target[prop];
		}
	});
}

function createPostFunc(url: string) {
	return (action: Action) =>
		fetch(url, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			// eslint-disable-next-line prefer-rest-params
			body: JSON.stringify(action)
		});
}
