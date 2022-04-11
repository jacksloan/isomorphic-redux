import { QueryStore } from '../redux';
import { type TodoState, todoReducer } from './todo-reducer';

// a basic store for Todos
export class TodoStore extends QueryStore<TodoState> {
	constructor() {
		super({ todos: [] }, todoReducer);
	}
}
