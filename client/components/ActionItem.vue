<template>
  <li class="action-item">
    <div v-show="!editing">
      <div class="viewbox">
        <span class="title">{{ details.title }}</span>
        <a class="menu-button" v-on:click="showMenuHandler"><i class="fa fa-ellipsis-h"></i></a>
      </div>
      <div class="toolbox" v-show="showMenu" :transition="expand">
        <a class="link" v-on:click="beginEditing"><i class="fa fa-pencil-square-o"></i> edit</a>
        <a class="link remove" v-on:click="removeHandler"><i class="fa fa-trash-o"></i> remove</a>
      </div>
    </div>
    <action-editor
      v-bind:default="details"
      v-if="editing"
      v-on:save="saveEditing"
      v-on:cancel="cancelEditing"></action-editor>
  </li>
</template>

<script>
  import ActionEditor from './ActionEditor'
  import { removeAction, updateAction } from '../vuex/actions'

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
      ActionEditor
    },
    methods: {
      /*
       * toggle menu when click menu icon.
      */
      showMenuHandler () {
        this.showMenu = !this.showMenu
      },
      /*
      * remove action.
      */
      removeHandler () {
        this.removeAction({id: this.id})
      },
      /*
      * open editor.
      */
      beginEditing () {
        this.showMenu = false
        this.editing = true
      },
      /*
      * close editor
      */
      cancelEditing () {
        this.editing = false
      },
      /*
      * save edit info.
      */
      saveEditing (action) {
        this.updateAction(action)
        this.editing = false
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
      },
      actions: {
        removeAction,
        updateAction
      }
    }
  }
</script>

<style>
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
