<template>
    <div class="user-playlist">
        <h2>My playlist</h2>
    </div>
</template>

<script>
    import getCollection from '../../composable/getCollection';
    import getUser from '../../composable/getUser';

    export default {
        setup () {
            const { user } = getUser()

            const { documents: playlists } = getCollection(
                                                            'playlists', 
                                                            ['userId', '==', user.value.uid]
                                                        )
            
            console.log(playlists)
            return { playlists }
        }
    }

</script>