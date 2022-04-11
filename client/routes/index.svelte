<script lang="ts">
    import { TodoStoreFactory, type Todo, type TodoStoreFacade } from '$shared';
    import type { Observable } from 'rxjs';
    import { onMount } from 'svelte';
    import { randBook, randCatchPhrase } from '@ngneat/falso';

    let facade: TodoStoreFacade;
    let description: string;
    let title: string;
    let todos: Observable<Todo[]>;

    function newTitle() {
        title = randBook().title;
    }

    function newDescription() {
        description = randCatchPhrase();
    }

    function createTodo() {
        facade.createTodo(title, description);
        newTitle();
        newDescription();
    }

    onMount(() => {
        newDescription();
        newTitle();
        facade = TodoStoreFactory.new({ type: 'remote', host: 'http://localhost:3001' }).facade();
        todos = facade.todos;
    });
</script>

<div class="px-4 flex flex-row items-center gap-2 h-24">
    <div class="form-control w-80">
        <label for="title" class="label">
            <span class="label-text">Title</span>
        </label>
        <input
            id="title"
            class="input input-sm input-bordered w-full max-w-xs"
            type="text"
            bind:value={title}
            on:keyup={(e) => (e.key === 'Enter' ? createTodo() : () => {})}
        />
    </div>

    <div class="form-control w-80">
        <label for="description" class="label">
            <span class="label-text">Description</span>
        </label>
        <input
            class="input input-sm input-bordered w-full max-w-xs"
            id="description"
            type="textarea"
            on:keyup={(e) => (e.key === 'Enter' ? createTodo() : () => {})}
            bind:value={description}
        />
    </div>

    <div class="h-full flex flex-row items-end justify-center content-end" />
</div>

<div class="p-4 overflow-x-auto">
    <table class="table w-full table-compact">
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
</div>
