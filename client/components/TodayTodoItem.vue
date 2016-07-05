<template>
  <li class="action-item">
    <div>
      <div class="viewbox">
        <span class="title">{{ details.title }}</span>
        <a class="menu-button" v-on:click="showMenuHandler">
          <i class="fa fa-ellipsis-h"></i>
        </a>
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
      LinkButton
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
      },
      isToday () {
        var d = new Date()
        var today = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
        return this.details['dueDate'] === today
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
  .action-item .viewbox {
    padding: 5px 0;
  }
  .action-item .title {
    display: inline-block;
    vertical-align: middle;
  }
  .action-item .menu-button {
    display: inline-block;
    cursor: pointer;
    width: 25px;
    height: 25px;
    background: none;
    border: none;
    font-size: 17px;
    line-height: 2px;
    color: #aaaaaa;
    text-align: center;
    vertical-align: middle;
    float: right;
  }
  .action-item .today.active {
    color: red;
    pointer-events: none;
  }
</style>
