<template>
    <div>
        <div class="error"> {{ error }} </div>
        <div v-if="playlist" class="playlist-details">
            <!-- playlist information -->
            <div class="playlist-info">
                <div class="cover">
                    <img :src="playlist.coverUrl" alt=" cover">
                </div>
                <h1> {{ playlist.title }} </h1>
                <p class="username"> Created by : {{ playlist.userName }} </p>
                <p class="description"> {{ playlist.description }} </p>
            </div>
            <!-- songlists -->
            <div class="song-list">
                <p>song list here</p>
            </div>
        </div>
    </div>
</template>

<script>
import { useRoute } from 'vue-router'
import getDocument from '../../composable/getDocument'

export default {
    props: ['id'],
    setup() {
        const route = useRoute()
        const id = route.params.id
        const { error, document: playlist } = getDocument('playlists', id)

        return { id, error, playlist }
    },
}
</script>

<style>
  .playlist-details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 80px;
  }
  .cover {
    overflow: hidden;
    border-radius: 20px;
    position: relative;
    padding: 160px;
  }
  .cover img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    max-width: 200%;
    max-height: 200%;
  }
  .playlist-info {
    text-align: center;
  }
  .playlist-info h2 {
    text-transform: capitalize;
    font-size: 28px;
    margin-top: 20px;
  }
  .playlist-info p {
    margin-bottom: 20px;
  }
  .username {
    color: #999;
  }
  .description {
    text-align: left;
  }
</style>