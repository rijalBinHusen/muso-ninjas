<template>
    <form @submit.prevent="handleSubmit">
        <h4>Create new playlist</h4>
        <input type="text" placeholder="Playlist title" v-model="title" required>
        <textarea cols="30" rows="5" required v-model="description" placeholder="Playlist description"></textarea>
        <!-- Playlist image -->
        <label for="file">Upoad playlist cover image</label>
        <input type="file" id="file" @change="handleChange" >
        <div class="error"> {{ fileError }} </div>
        <button>Create</button>
    </form>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
    setup() {
        const title = ref('')
        const description = ref('')
        const file = ref(null)
        const fileError = ref(null)

        const handleSubmit = () => {
            if(file.value) {
                console.log(title.value, description.value, fileError.value)
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

        return { title, description, handleSubmit, handleChange, fileError }
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