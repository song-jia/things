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
  import store from '../vuex/store'
  import toolbar from './Toolbar.vue'

  export default {
    components: {
      toolbar
    },
    store
  }
</script>

<style>
  body {
    color: #202020;
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
</style>
