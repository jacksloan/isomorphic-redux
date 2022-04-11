import { addTodo, deleteTodo, setState } from './todo-actions';
import type { TodoState } from './todo-reducer';
import type { TodoStore } from './todo-store';
import { v4 as uuid } from 'uuid';

// TodoStoreFacade wraps a TodoStore with simplified functionality
export class TodoStoreFacade {
    constructor(private store: TodoStore) {}

    todos = this.store.select((s) => s.todos);

    resetState(s: TodoState) {
        this.store.dispatch(setState(s));
    }

    createTodo(title: string, description: string) {
        this.store.dispatch(addTodo({ description, title, id: uuid(), done: false }));
    }

    deleteTodo = (id: string) => {
        this.store.dispatch(deleteTodo(id));
    };
}
