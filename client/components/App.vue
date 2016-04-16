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

<style>
  html {
    height: 100%;
  }
  body {
    color: #202020;
    background: #fafafa;
    height: 100%;
  }
  div {
    box-sizing: border-box;
  }
  /* buttons */
  .button-small {
    font-size: 85%;
  }
  .button-blue {
    color: white;
    background: #1f8dd6;
  }
  .action-link {
    cursor: pointer;
    font-size: 13px;
  }
  .action-link:hover {
    text-decoration: underline;
  }
  .app {
    max-width: 950px;
    margin: auto;
    height: 100%;
  }
  .app .panel {
    height: 100%;
  }
</style>
