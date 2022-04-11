<script lang="ts">
	import { TodoStoreFactory, type Todo, type TodoStoreFacade } from '$shared';
	import type { Observable } from 'rxjs';
	import { onMount } from 'svelte';

	let facade: TodoStoreFacade;
	let description: string;
	let title: string;
	let todos: Observable<Todo[]>;

	onMount(() => {
		facade = TodoStoreFactory.new({ type: 'remote', host: 'http://localhost:3001' }).facade();
		todos = facade.todos;
	});
</script>

<label for="title" />
<input id="title" type="text" bind:value={title} />

<label for="description" />
<input id="description" type="textarea" bind:value={description} />

<button on:click={() => facade.createTodo(title, description)}>ADD TODO</button>

<table>
	<thead>
		<tr>
			<th>Title</th>
			<th>Description</th>
			<th>Complete</th>
		</tr>
	</thead>
	<tbody>
		{#each $todos || [] as todo}
			<tr>
				<td>{todo.title}</td>
				<td>{todo.description}</td>
				<td>{todo.done}</td>
			</tr>
		{/each}
	</tbody>
</table>
