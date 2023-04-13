<template>
    <form @submit.prevent="handleSubmit">
        <h3>Login</h3>    
        <input type="email" placeholder="Email" v-model="email">
        <input type="password" placeholder="Password" v-model="password">
        <div class="error">
            {{ error }}
        </div>
        <button v-if="!isPending">Login</button>
        <button v-else disabled>Loading</button>
        <router-link to="Signup">
            <button>Signup</button>
        </router-link>
    </form>
        <div style="margin-top:100px;">
            <div>
                <h3>User for test:</h3>
                <ul>
                    <li>Email: <b>rijalbinhusen2@tester.com</b>, password: <b>123456</b></li>
                    <li>Email: <b>rijalbinhusen@test.com</b>, password: <b>123456</b></li>
                </ul>
            </div>
            <div style="margin-top:50px;">
                <h3>What kind of application is this?:</h3>
                <ul>
                    <li>Apllication to create your own song playlists</li>
                    <li>The user can create new application</li>
                    <li>Another user can add song to all playlists</li>
                    <li>Only the owner playlists can delete song or playlists</li>
                </ul>
            </div>

        </div>
</template>

<script>
import { ref } from 'vue'
import useLogin from "@/composable/userLogin"
import { useRouter } from 'vue-router'

export default {
    setup() {
        const email = ref('')
        const password = ref('')
        const router = useRouter()

        const { error, login, isPending } = useLogin()

        const handleSubmit = async () => {
            isPending.value = true
            const res = await login(email.value, password.value)
            if(!error.value) {
                router.push({ name: 'UserPlaylists'})
                console.log('user logged in')
            }
        }

        return { email, password, handleSubmit, error, isPending }
    },
}
</script>