<script lang="ts">
	import { TodoStore, createStoreProxy, addTodo } from '$shared';
	import { onMount } from 'svelte';
	import { v4 as uuid } from 'uuid';

	let dispatch = () => {};

	onMount(() => {
		const store = createStoreProxy(new TodoStore({ todos: [] }));

		dispatch = function () {
			store.dispatch(addTodo({ description: '123', title: 'First', done: false, id: uuid() }));
		};
	});
</script>

<button on:click={dispatch}> Dispatch Action </button>
