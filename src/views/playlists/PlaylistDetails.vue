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
                <button @click="handleDelete" v-if="ownership">Delete playlist</button>
            </div>
            <!-- songlists -->
            <div class="song-list">
              <div v-if="!playlist.songs.length">No songs have been added to this playlist yet.</div>
              <div v-for="song in playlist.songs" :key="song.id" class="single-song">
                <div class="details">
                  <h3>{{ song.title }}</h3>
                  <p>{{ song.artist }}</p>
                </div>
                <button @click="handleClick(song.id)" v-if="ownership">delete</button>
              </div>
              <AddSong :playlist="playlist" />
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import getDocument from '../../composable/getDocument'
import getUser from '../../composable/getUser'
import useDocument from '../../composable/useDocument'
import useStorage from '../../composable/useStorage'
import AddSong from '../../components/AddSong.vue'

export default {
    props: ['id'],
    components: { AddSong },
    setup() {
        const route = useRoute()
        const router = useRouter()
        const id = route.params.id
        const { error, document: playlist } = getDocument('muso_ninjas_playlists', id)
        const { user } = getUser()
        const { deleteDoc, updateDoc } = useDocument('muso_ninjas_playlists', id)
        const { deleteImage } = useStorage()

        const ownership = computed(() => {
          return playlist.value && user.value && user.value.uid == playlist.value.userId
        })

        const handleDelete = async () => {
          await deleteImage(playlist.value.filePath)
          await deleteDoc()
          router.push({ name: 'Home'})
        }

        const handleClick = async (id) => {
          const songs = playlist.value.songs.filter((song) => song.id != id)
          await updateDoc({ songs })
        }

        return { id, error, playlist, ownership, handleDelete, handleClick }
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
  .single-song {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed var(--secondary);
    margin-bottom: 20px;
  }
</style>