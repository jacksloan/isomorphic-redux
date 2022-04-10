import { on, reducer } from 'ts-action';
import { addTodo, deleteTodo } from './todo-actions';
import type { Todo } from './todo-model';

export interface TodoState {
	todos: Todo[];
}

export const initialState: TodoState = {
	todos: []
};

export const todoReducer = reducer(
	initialState,
	on(addTodo, (state, { payload }) => ({
		...state,
		todos: [...state.todos, payload]
	})),
	on(deleteTodo, (state, { payload }) => ({
		...state,
		todos: [...state.todos.filter((t) => t.id !== payload)]
	}))
);
