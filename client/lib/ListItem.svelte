<script lang="ts">
    export let text: string = '';
</script>

<div class="item">
    <p class="item__text">{text}</p>
</div>

<style lang="postcss">
    .item {
        @apply card py-1 px-3 bg-base-100;
    }

    .item__text {
        @apply text-accent-content;
    }
</style>
