<template>
  <div id="app" class="app pure-g" v-on:click.capture="clickSomewhereHandler">
    <div class="pure-u-1-5">
      <toolbar></toolbar>
    </div>
    <div class="pure-u-4-5 panel">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import store from '../vuex/store'
  import toolbar from './Toolbar.vue'

  export default {
    components: {
      toolbar
    },
    methods: {
      clickSomewhereHandler (e) {
        this.$broadcast('click-somewhere', e)
      }
    },
    store
  }
</script>
<!-- global stylesheet -->
<style>
  html {
    height: 100%;
  }
  body {
    color: #202020;
    background: #fafafa;
    font-size: 13px;
    height: 100%;
  }
  div {
    box-sizing: border-box;
  }
</style>

<!-- local stylesheet -->
<style scoped>
  .app {
    max-width: 950px;
    margin: auto;
    height: 100%;
  }
  .panel {
    height: 100%;
  }
</style>
