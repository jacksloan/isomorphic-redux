import { createStoreProxy } from '../redux';
import { TodoStore } from './todo-store';
import { TodoStoreFacade } from './todo-store-facade';

interface LocalConfig {
	type: 'local';
}
interface RemoteConfig {
	type: 'remote';
	host: `http://${string}:${number}`;
}

type Config = LocalConfig | RemoteConfig;

// TodoStoreFactory provides a single entrypoint for creating stores
export class TodoStoreFactory {
	private constructor(private _store: TodoStore) {}

	public static new(config: Config): TodoStoreFactory {
		switch (config.type) {
			case 'local':
				return new TodoStoreFactory(new TodoStore());
			case 'remote':
				return new TodoStoreFactory(createStoreProxy(new TodoStore(), config.host));
			default:
				throw new Error('invalid config type');
		}
	}

	facade(): TodoStoreFacade {
		return new TodoStoreFacade(this._store);
	}

	simple(): TodoStore {
		return this._store;
	}
}
