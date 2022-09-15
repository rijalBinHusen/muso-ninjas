<template>
    <div class="user-playlist">
        <h2>My playlist</h2>
        <div v-if="playlists">
            <ListViewVue :playlists="playlists" />
        </div>
        <router-link :to="{ name: 'CreatePlaylist'}">
            Create a new playlist
        </router-link>
    </div>
</template>

<script>
    import getCollection from '../../composable/getCollection';
    import getUser from '../../composable/getUser';
    import ListViewVue from '../../components/ListView.vue';

    export default {
        components: { ListViewVue },
        setup () {
            const { user } = getUser()

            const { documents: playlists } = getCollection(
                                                            'playlists', 
                                                            ['userId', '==', user.value.uid]
                                                        )
            
            return { playlists }
        }
    }

</script>