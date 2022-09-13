<template>
    <h1>Playlist id: {{ id }} </h1>
</template>

<script>
import { useRoute } from 'vue-router'
export default {
    props: ['id'],
    setup() {
        const route = useRoute()
        const id = route.params.id

        return { id }
    },
}
</script>