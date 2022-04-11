import { on, reducer } from 'ts-action';
import * as action from './todo-actions';
import type { Todo } from './todo-model';

export interface TodoState {
	todos: Todo[];
}

export const initialState: TodoState = {
	todos: []
};

export const todoReducer = reducer(
	initialState,
	on(action.addTodo, (state, { payload }) => ({
		...state,
		todos: [...state.todos, payload]
	})),
	on(action.deleteTodo, (state, { payload }) => ({
		...state,
		todos: [...state.todos.filter((t) => t.id !== payload)]
	})),
	on(action.setState, (state, { payload: { todos } }) => ({
		...state,
		todos
	}))
);
