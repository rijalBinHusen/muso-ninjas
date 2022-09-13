<template>
    <div class="navbar">
        <nav>
            <h1>
                <router-link :to="{ name: 'Home' }">
                    Muso ninja
                </router-link>
            </h1>
            <div class="links">
                <div v-if="user">
                    <router-link :to="{ name: 'CreatePlaylist' }"> Create playlist</router-link>
                    <button @click="handleLogout">Logout</button>
                </div>
                <div v-else>
                    <router-link class="btn" :to="{ name: 'Signup' }">Signup</router-link>
                    <router-link class="btn" :to="{ name: 'Login' }">Login</router-link>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import useLogout from '../composable/userLogout'
import { useRouter } from 'vue-router'
import getUser from '../composable/getUser'

export default {
    setup() {
        const { logout } = useLogout()
        const router = useRouter()
        const { user } = getUser()

        const handleLogout = async () => {
            console.log('logout')
            await  logout()
            router.push({ name: 'Login'})
        }

        return { handleLogout, user }
    },
}
</script>

<style scoped>
    .navbar {
        padding: 16px;
        margin-bottom: 60px;
        background: white;
    }

    nav {
        display: flex;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto;
    }

    nav h1 {
        margin-left: 20px;
    }

    nav .links {
        margin-left: auto;
    }

    nav .links a, button {
        margin-left: 16px;
        font-size: 14px;
    }
</style>