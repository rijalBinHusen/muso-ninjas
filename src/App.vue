<template>
<div>
  <Navbar />
  <div class="content">
    <router-view/>
  </div>
</div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    
  },
  components: {
    Navbar
  }
}
</script>

<style>
  .content {
    margin: 0;
    padding: 0 20px;
  }
</style>
