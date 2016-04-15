<template>
  <li class="thing-item" 
    v-on:mouseover="mouseoverHandler"
    v-on:mouseout="mouseoutHandler"
  >
    <div v-show="!editing">
      <div class="viewbox">
        <input type="checkbox" class="toggle" id="{{ 'ct_' + thing.id }}"/>
        <label for="{{ 'ct_' + thing.id }}"></label>
        <span class="title">{{ thing.title }}</span>
        <a class="menu-button" v-show="hover" v-on:click="showMenuHandler"><i class="fa fa-ellipsis-h"></i></a>
      </div>
      <div class="toolbox" v-show="showMenu" :transition="expand">
        <a class="link" v-on:click="beginEditing"><i class="fa fa-pencil-square-o"></i> edit</a>
        <a class="link remove" v-on:click="removeHandler"><i class="fa fa-trash-o"></i> remove</a>
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
import { removeThing, updateThing } from '../vuex/actions'
import ThingEditor from './ThingEditor'

export default {
  data () {
    return {
      hover: false,
      showMenu: false,
      editing: false
    }
  },
  props: {
    thing: Object
  },
  components: {
    ThingEditor
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
    }
  },
  events: {
    /*
    * close menu when the menu of other item is opened.
    */
    'has-menu-open': function (id) {
      if (id !== this.thing.id) {
        this.showMenu = false
      }
    }
  },
  vuex: {
    actions: {
      removeThing,
      updateThing
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
    line-height: 28px;
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
</style>
