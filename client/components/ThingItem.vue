<!--

-->
<template>
  <li class="thing-item"
    v-on:mouseover="mouseoverHandler"
    v-on:mouseout="mouseoutHandler"
  >
    <div v-show="!editing">
      <div class="viewbox">
        <a v-show="hasAction" v-on:click="toggleShowActions" class="icon-button">
          <i class="fa"
             v-bind:class="{'fa-caret-right': !showActions, 'fa-caret-down': showActions}"
          ></i>
        </a>
        <priority-flag v-if="!!thing.priority" :priority="thing.priority">
        </priority-flag>
        <span class="title" :class="{'complete': thing.complete}">
          {{ thing.title }}
        </span>
        <menu-button v-on:click="showMenuHandler"></menu-button>
      </div>
      <div class="toolbox" v-show="showMenu" :transition="expand">
        <link-button v-on:click="openNewActionEditor" icon="paper-plane">
          add action
        </link-button>
        <link-button v-on:click="beginEditing" icon="pencil-square-o">
          edit
        </link-button>
        <priority-selector :priority="thing.priority"
                           @change="changePriority">
        </priority-selector>
        <link-button v-on:click="removeHandler" icon="trash-o" class="remove">
          remove
        </link-button>
      </div>
      <div class="action-area">
        <action-editor
          v-show="showNewActionEditor"
          v-on:save="saveNewAction"
          v-on:cancel="cancelNewActionEditor"
        ></action-editor>
        <div class="action-list" v-show="showActions">
          <action-item v-for="action in thing.actions" v-bind:id="action"></action-item>
        </div>
      </div>
    </div>
    <thing-editor
      v-bind:default="thing"
      v-if="editing"
      v-on:save="saveEditing"
      v-on:cancel="cancelEditing"></thing-editor>
  </li>
</template>

<script>
  import { removeThing, updateThing, addNewAction } from '../vuex/actions'
  import ThingEditor from './ThingEditor'
  import ActionEditor from './ActionEditor'
  import ActionItem from './ActionItem'
  import LinkButton from './LinkButton'
  import MenuButton from './MenuButton'
  import PrioritySelector from './PrioritySelector'
  import PriorityFlag from './PriorityFlag'

  export default {
    data () {
      return {
        hover: false,
        showMenu: false,
        editing: false,
        showNewActionEditor: false,
        showActions: false
      }
    },
    computed: {
      hasAction () {
        return this.thing.actions.length > 0
      }
    },
    props: {
      thing: Object
    },
    components: {
      ThingEditor,
      ActionEditor,
      ActionItem,
      MenuButton,
      LinkButton,
      PrioritySelector,
      PriorityFlag
    },
    methods: {
      /*
       * show menu icon when mouse over.
      */
      mouseoverHandler () {
        this.hover = true
      },
      /*
       * hide menu icon when mouse out.
      */
      mouseoutHandler () {
        this.hover = false
      },
      /*
       * toggle menu when click menu icon.
      */
      showMenuHandler () {
        this.showMenu = !this.showMenu
        // tell parent list the menu is open.
        if (this.showMenu) {
          this.$dispatch('menu-open', this.thing.id)
        }
        // close priority list when close menu
        if (!this.showMenu) {
          this.showPriorities = false
        }
      },
      /*
      * remove thing when click remove button.
      */
      removeHandler () {
        this.removeThing({id: this.thing.id})
      },
      /*
      * open editor.
      */
      beginEditing () {
        this.showMenu = false
        this.editing = true
      },
      /*
      * hide editor.
      */
      cancelEditing () {
        this.editing = false
      },
      saveEditing (thing) {
        this.updateThing(thing)
        this.editing = false
      },
      saveNewAction (data) {
        this.addNewAction({
          thingId: this.thing.id,
          ...data
        })
        this.showNewActionEditor = false
        this.showActions = true
      },
      openNewActionEditor () {
        this.showNewActionEditor = true
      },
      cancelNewActionEditor () {
        this.showNewActionEditor = false
      },
      toggleShowActions () {
        this.showActions = !this.showActions
      },
      changePriority (pId) {
        // update thing priority
        this.updateThing({
          id: this.thing.id,
          priority: pId
        })
      }
    },
    events: {
      /*
      * close menu when the menu of other item is opened.
      */
      'has-menu-open': function (id) {
        if (id !== this.thing.id) {
          this.showMenu = false
          this.showPriorities = false
        }
      }
    },
    vuex: {
      actions: {
        removeThing,
        updateThing,
        addNewAction
      }
    }
  }
</script>

<style scoped>
  .thing-item {
    border-bottom: 1px solid #f0f0f0;
    padding: 2px 0;
  }
  .thing-item .toggle {
    display: none;
  }
  .thing-item .toggle + label {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: solid 1px #cccccc;
    border-radius: 10px;
    text-align: center;
    color: #cccccc;
    margin-right: 5px;
    vertical-align: middle;
  }
  .thing-item .toggle:checked + label:after {
    content: "✓";
  }
  .thing-item .title {
    display: inline-block;
    vertical-align: middle;
  }
  .thing-item .title.complete {
    color: gray;
    text-decoration: line-through;
  }
  .thing-item .toolbox {
    width: 100%;
    height: 100%;
    padding: 5px;
    text-align: right;
    border-top: solid 1px #f0f0f0;
    position: relative;
  }
  .toolbox .remove {
    color: #999999;
  }
  .thing-item .viewbox {
    padding: 5px 0;
  }
  .action-area {
    padding-left: 20px;
  }
  .action-list {
    border-top: solid 1px #cccccc;
  }
  .icon-button {
    display: inline-block;
    cursor: pointer;
    width: 10px;
    height: 10px;
  }
</style>
