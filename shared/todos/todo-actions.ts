import { action, payload } from 'ts-action/action';
import type { Todo } from './todo-model';
import type { TodoState } from './todo-reducer';

export const addTodo = action('[Todo] Add', payload<Todo>());

export const deleteTodo = action('[Todo] Delete', payload<string>());

export const setState = action('[Todo] Set State', payload<TodoState>());
