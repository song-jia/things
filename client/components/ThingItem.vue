<template>
  <li class="thing-item"
    v-on:mouseover="mouseoverHandler"
    v-on:mouseout="mouseoutHandler"
  >
    <div v-show="!editing">
      <div class="viewbox">
        <!--         <input type="checkbox" class="toggle" id="{{ 'ct_' + thing.id }}"/>
                <label for="{{ 'ct_' + thing.id }}"></label>
         -->
        <a v-show="hasAction" v-on:click="toggleShowActions" class="icon-button">
          <i class="fa" v-bind:class="{'fa-caret-right': !showActions, 'fa-caret-down': showActions}"></i>
        </a>
        <i class="fa fa-flag" v-if="!!thing.priority" v-bind:class="priorityStyle"></i>
        <span class="title">{{ thing.title }}</span>
        <a class="menu-button" v-show="hover" v-on:click="showMenuHandler"><i class="fa fa-ellipsis-h"></i></a>
      </div>
      <div class="toolbox" v-show="showMenu" :transition="expand">
        <a class="link" v-on:click="openNewActionEditor"><i class="fa fa-paper-plane" aria-hidden="true"></i> add action</a>
        <a class="link" v-on:click="beginEditing"><i class="fa fa-pencil-square-o"></i> edit</a>
        <a class="link" v-on:click="showPriorityList"><i class="fa fa-flag" v-bind:class="priorityStyle"></i> priority</a>
        <a class="link remove" v-on:click="removeHandler"><i class="fa fa-trash-o"></i> remove</a>
        <div class="priorities" v-show="showPriorities" id="priorities-list">
          <a v-on:click="changePriority" data-id="1"><i class="fa fa-flag important-urgent"></i> important urgent</a>
          <a v-on:click="changePriority" data-id="2"><i class="fa fa-flag important-not-urgent"></i> important not urgent</a>
          <a v-on:click="changePriority" data-id="3"><i class="fa fa-flag not-important-urgent"></i> not important urgent</a>
          <a v-on:click="changePriority" data-id="4"><i class="fa fa-flag not-important-not-urgent"></i> not important not urgent</a>
        </div>
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

  export default {
    data () {
      return {
        hover: false,
        showMenu: false,
        editing: false,
        showPriorities: false,
        showNewActionEditor: false,
        showActions: false
      }
    },
    computed: {
      priorityStyle () {
        return {
          'important-urgent': this.thing.priority === '1',
          'important-not-urgent': this.thing.priority === '2',
          'not-important-urgent': this.thing.priority === '3',
          'not-important-not-urgent': this.thing.priority === '4'
        }
      },
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
      ActionItem
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
      showPriorityList () {
        this.showPriorities = !this.showPriorities
      },
      changePriority (e) {
        // update thing priority
        this.updateThing({
          id: this.thing.id,
          priority: e.currentTarget.dataset.id
        })
        // close priorities list
        this.showPriorities = false
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

<style>
  .thing-item {
    border-bottom: 1px solid #f0f0f0;
    font-size: 13px;
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
  .thing-item .menu-button {
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
  .thing-item .menu-button:hover {
    color: #555555;
  }
  .thing-item .toolbox {
    width: 100%;
    height: 100%;
    padding: 5px;
    text-align: right;
    border-top: solid 1px #f0f0f0;
    position: relative;
  }
  .thing-item .toolbox .link {
    padding: 5px;
    display: inline-block;
    cursor: pointer;
  }
  .thing-item .toolbox .link:hover {
    text-decoration: underline;
  }
  .thing-item .toolbox .remove {
    color: #999999;
  }
  .thing-item .viewbox {
    padding: 5px 0;
  }
  .priorities {
    border: 1px solid #d6dadc;
    box-shadow: 0 1px 6px rgba(0,0,0,.15);
    padding: 5px;
    width: 180px;
    text-align: left;
    position: absolute;
    background-color: white;
    right: 10px;
  }
  .priorities i {
    font-size: 15px;
  }
  .priorities a {
    display: block;
    text-decoration: none;
    margin-bottom: 3px;
    color: #555555;
    cursor: pointer;
  }
 .important-urgent {
    color: #eb5a46;
  }
  .important-not-urgent {
    color: #0079bf;
  }
  .not-important-urgent {
    color: #61bd4f;
  }
  .not-important-not-urgent {
    color: #c377e0;
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
