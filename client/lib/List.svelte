<script lang="ts">
    import MoreMenu from 'svelte-feather-icons/src/icons/MoreHorizontalIcon.svelte';
    import ListItem from './ListItem.svelte';
    export let list: { name: string; items: string[] } = { name: 'List', items: [] };
</script>

<section class="list">
    <div>
        <h3 class="list__title">{list.name}</h3>
        <button class="list__more">
            <MoreMenu size="24" />
        </button>
    </div>

    <div class="list__body">
        {#each list.items as item}
            <ListItem text={item} />
        {/each}
    </div>
</section>

<style lang="postcss">
    .list {
        @apply bg-neutral-focus w-56 card py-1 px-3 relative;
    }
    .list__title {
        @apply font-medium text-neutral-content;
    }
    .list__more {
        @apply btn btn-sm btn-ghost text-neutral-content absolute right-0 top-0;
    }

    .list__body {
        @apply mt-2 flex flex-col gap-2;
    }
</style>
