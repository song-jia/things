<template>
  <div class="action-item">
    <div class="viewbox">
    <span class="title">{{ details.title }}</span>
    <a class="menu-button" v-on:click="showMenuHandler"><i class="fa fa-ellipsis-h"></i></a>
    </div>
    <div class="toolbox" v-show="showMenu" :transition="expand">
      <a class="link" v-on:click="beginEditing"><i class="fa fa-pencil-square-o"></i> edit</a>
      <a class="link remove" v-on:click="removeHandler"><i class="fa fa-trash-o"></i> remove</a>
  </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        showMenu: false
      }
    },
    props: {
      id: String
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

<style>
  .action-item {
  }
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
</style>
