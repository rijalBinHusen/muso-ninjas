<template>
    <form @submit.prevent="handleSubmit">
        <h4>Create new playlist</h4>
        <input type="text" placeholder="Playlist title" v-model="title" required>
        <textarea cols="30" rows="5" required v-model="description" placeholder="Playlist description"></textarea>
        <!-- Playlist image -->
        <label for="file">Upoad playlist cover image</label>
        <input type="file" id="file" >
        <div class="error"></div>
        <button>Create</button>
    </form>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
    setup() {
        const title = ref('')
        const description = ref('')

        const handleSubmit = () => {
            console.log(title.value, description.value)
        }

        return { title, description, handleSubmit }
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