<template>
  <div class="home">
    <div class="error" v-if="error"> Could not fetch the data </div>
    <div v-if="documents">
      <div v-for="doc in documents" :key="doc.id">
        {{ doc.title }}
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import getCollection from '../composable/getCollection'

export default {
  name: 'Home',
  setup() {
    const { error, documents } = getCollection('playlists')

    return { error, documents }
  },
  components: {
  }
}
</script>
