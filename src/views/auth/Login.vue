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
    </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import useLogin from "@/composable/userLogin"

export default {
    setup() {
        const email = ref('')
        const password = ref('')

        const { error, login, isPending } = useLogin()

        const handleSubmit = async () => {
            isPending.value = true
            const res = await login(email.value, password.value)
            if(!error.value) {
                console.log('user logged in')
            }
        }

        return { email, password, handleSubmit, error, isPending }
    },
}
</script>