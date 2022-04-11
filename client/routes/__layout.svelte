<script>
    import { browser } from '$app/env';

    import { page } from '$app/stores';

    import '../app.css';
    $: {
        const theme = $page.url.searchParams.get('theme');
        if (browser) {
            console.log({ theme });
            document.getElementsByTagName('html').item(0).setAttribute('data-theme', theme);
        }
    }
</script>

<slot />
