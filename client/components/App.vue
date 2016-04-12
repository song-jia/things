<template>
  <div id="app" class="pure-g">
    <div class="pure-u-1-5">
      <toolbar></toolbar>
    </div>
    <div class=" pure-u-4-5">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import toolbar from './Toolbar.vue'

export default {
  components: {
    toolbar
  }
}
</script>

