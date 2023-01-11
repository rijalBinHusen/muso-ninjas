<template>
    <form @submit.prevent="handleSubmit">
        <h4>Create new playlist</h4>
        <input type="text" placeholder="Playlist title" v-model="title" required>
        <textarea cols="30" rows="5" required v-model="description" placeholder="Playlist description"></textarea>
        <!-- Playlist image -->
        <label for="file">Upoad playlist cover image</label>
        <input type="file" id="file" @change="handleChange" >
        <div class="error"> {{ fileError }} </div>
        <button v-if="!isPending">Create</button>
        <button v-else disabled>Saving...</button>
    </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import useStorage from '@/composable/useStorage'
import useCollection from '@/composable/useCollection'
import getUser from '@/composable/getUser'
import { timestamp } from '../../firebase/firebaseApp'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const { filePath, url, uploadImage } = useStorage()
        const { error, addDoc } = useCollection('muso_ninjas_playlists')
        const { user } = getUser()
        const isPending = ref(false)
        const router = useRouter()

        const title = ref('')
        const description = ref('')
        const file = ref(null)
        const fileError = ref(null)

        const handleSubmit = async () => {
            if(file.value) {
                // start
                isPending.value = true
                await uploadImage(file.value)
                const res = await addDoc({
                    title: title.value,
                    description: description.value,
                    userId: user.value.uid,
                    userName: user.value.displayName,
                    coverUrl: url.value,
                    filePath: filePath.value,
                    songs: [],
                    createdAt: timestamp()
                })
                // end
                isPending.value = false
                if(!error.value) {
                    router.push({ name: 'PlaylistDetails', params: { id: res.id }})
                } else {
                    console.log(error.value)
                }
            }
        }

        // allowed file types
        const types = ['image/png', 'image/jpeg', 'image/jpg' ]

        const handleChange = (e) => {
            const selected = e.target.files[0]

            if(selected && types.includes(selected.type)) {
                    file.value = selected
                    fileError.value = null
            } else {
                file.value = null
                fileError.value = 'Please select an image file (png or jpg)'
            }
        }

        return { title, description, handleSubmit, handleChange, fileError, isPending }
    },
}
</script>

<style>
  form {
    background: white;
  }
  input[type="file"] {
    border: 0;
    padding: 0;
  }
  label {
    font-size: 12px;
    display: block;
    margin-top: 30px;
  }
  button {
    margin-top: 20px;
  }
</style>