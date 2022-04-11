<script lang="ts">
    import List from './List.svelte';
    export let lists: Array<{ name: string; items: string[] }> = [
        {
            name: 'Do Things',
            items: [
                'Do thing One',
                'Do thing Two',
                'Do thing Three',
                'Do thing Four',
                'Do thing Five',
                'Do thing Six'
            ]
        },
        {
            name: 'Make Things',
            items: [
                'Make thing 1',
                'Make thing 2',
                'Make thing 3',
                'Make thing 4',
                'Make thing 5',
                'Make thing 6'
            ]
        }
    ];
</script>

<div class="board">
    {#each lists as list}
        <List {list} />
    {/each}
    <List />
</div>

<style lang="postcss">
    .board {
        @apply w-full h-full bg-neutral flex flex-row gap-4 p-4;
    }
</style>
