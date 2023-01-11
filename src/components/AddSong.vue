<template>
<div class="add-song">
    <button v-if="!showForm" @click="showForm = true">Add Songs</button>
    <form v-else @submit.prevent="handleSubmit">
        <h4>Add a new song</h4>
        <input type="text" placeholder="Song title" required v-model="title">
        <input type="text" placeholder="Artist" required v-model="artist">
        <button>Add song</button>
    </form>
</div>
</template>

<script>
import { ref } from '@vue/reactivity'
import useDocument from '../composable/useDocument'

export default {
    props: ['playlist'],
    setup(props) {
        const title = ref('')
        const artist = ref('')
        const showForm = ref(false)
        const { updateDoc } = useDocument('muso_ninjas_playlists', props.playlist.id)

        const handleSubmit = async () => {
            showForm.value = false
            const newSong = {
                title: title.value,
                artist: artist.value,
                id: Math.floor(Math.random() * 1000000)
            }

            await updateDoc({
                songs: [...props.playlist.songs, newSong]
            })

            title.value = ''
            artist.value = ''
        }

        return { title, artist, handleSubmit, showForm }
    }
}
</script>

<style scoped>
    .add-song {
        text-align: center;
        margin-top: 40px;
    }

    form {
        max-width: 100%;
        text-align: left;
    }
</style>