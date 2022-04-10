import { QueryStore } from '../redux';
import { v4 as uuid } from 'uuid';
import type { Observable } from 'rxjs';
import type { Todo } from './todo-model.js';
import { type TodoState, todoReducer } from './todo-reducer';
import { addTodo, deleteTodo } from './todo-actions';

export class TodoStore {
	store: QueryStore<TodoState>;
	todos: Observable<Todo[]>;

	constructor(initialState: TodoState) {
		this.store = new QueryStore(initialState, todoReducer);
		this.todos = this.store.select((s) => s.todos);
	}

	createTodo(title: string, description: string) {
		this.store.dispatch(addTodo({ description, title, id: uuid(), done: false }));
	}

	deleteTodo = (id: string) => {
		this.store.dispatch(deleteTodo(id));
	}
}
