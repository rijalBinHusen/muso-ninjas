<template>
    <form @submit.prevent="handleSubmit">
        <h3>Signup</h3>    
        <input type="text" name="" placeholder="Display name" id="" v-model="displayName">
        <input type="email" placeholder="Email" v-model="email">
        <input type="password" placeholder="Password" v-model="password">
        <div class="error">
            {{ error }}
        </div>
        <button v-if="!isPending">Sign up</button>
        <button v-else disabled>Loading</button>
    </form>
</template>


<script>
import { ref } from 'vue'
import useSignUp from '@/composable/userSignup.js'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const email = ref('')
        const password = ref('')
        const displayName = ref('')
        const router = useRouter()

        const { error, signup, isPending } = useSignUp()

        const handleSubmit = async () => {
            signup(email.value, password.value, displayName.value)
            if(!error.value) {
                console.log('user registered')
                router.push({ name: 'UserPlaylists'})
            }
        }

        return { email, password, displayName, isPending, handleSubmit, error }
    },
}
</script>