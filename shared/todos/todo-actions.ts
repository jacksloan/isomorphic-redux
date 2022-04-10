import { action, payload } from 'ts-action/action';
import type { Todo } from './todo-model';

export const addTodo = action('[Todo] Add', payload<Todo>());

export const deleteTodo = action('[Todo] Delete', payload<string>());

export const loadTodos = action('[Todo] Load All');
