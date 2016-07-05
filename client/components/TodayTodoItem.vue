<template>
  <li class="item">
    <div>
      <div class="viewbox">
        <span class="title">{{ details.title }}</span>
        <menu-button v-on:click="showMenuHandler">
        </menu-button>
      </div>
      <div class="toolbox" v-show="showMenu" :transition="expand">
        <link-button icon="play">start</link-button>
        <link-button icon="pause">pause</link-button>
        <link-button icon="check">complete</link-button>
      </div>
    </div>
  </li>
</template>

<script>
  import LinkButton from './LinkButton'
  import MenuButton from './MenuButton'

  export default {
    data () {
      return {
        showMenu: false,
        editing: false
      }
    },
    props: {
      id: String
    },
    components: {
      LinkButton,
      MenuButton
    },
    methods: {
      /*
       * toggle menu when click menu icon.
      */
      showMenuHandler () {
        this.showMenu = !this.showMenu
      }
    },
    computed: {
      details () {
        return this.actions[this.id]
      }
    },
    vuex: {
      getters: {
        actions (state) {
          return state.actions
        }
      }
    }
  }
</script>

<style scoped>
  .viewbox {
    padding: 5px 0;
  }
  .title {
    display: inline-block;
    vertical-align: middle;
  }
</style>
