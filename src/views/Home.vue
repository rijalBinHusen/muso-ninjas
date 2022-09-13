<template>
  <div class="home">
    <div class="error" v-if="error"> Could not fetch the data </div>
    <div v-if="documents">
      <ListView :playlists="documents" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import getCollection from '../composable/getCollection'
import ListView from '../components/ListView.vue'

export default {
  name: 'Home',
  setup() {
    const { error, documents } = getCollection('playlists')

    return { error, documents }
  },
  components: {
    ListView
  }
}
</script>
