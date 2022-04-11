<script>
    import Board from '$lib/Board.svelte';
</script>

<nav class="nav">
    <ul class="nav__list">
        <li>Kafkanban</li>
    </ul>
</nav>

<Board />

<style lang="postcss">
    .nav {
        @apply h-12 bg-primary flex flex-row items-center text-primary-content;
    }
    .nav__list {
        @apply px-2 font-bold uppercase;
    }
</style>
