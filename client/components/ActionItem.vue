<!--
-->
<template>
  <li class="action-item">
    <div v-show="!editing">
      <div class="viewbox">
        <span class="title"
              :class="{'complete': details.status === 'complete'}"
        >
          {{ details.title }}
        </span>
        <menu-button v-on:click="showMenuHandler">
        </menu-button>
      </div>
      <div class="toolbox" v-show="showMenu" :transition="expand">
        <link-button @click="doItToday"
                     :class="this.isToday ? 'active' : ''"
                     icon="rocket"
        >
          today
        </link-button>
        <link-button @click="beginEditing"
                     icon="pencil-square-o"
        >
          edit
        </link-button>
        <link-button @click="removeHandler"
                     class="remove"
                     icon="trash-o"
        >
          remove
        </link-button>
      </div>
    </div>
    <action-editor
      :id="details.id"
      :title="details.title"
      :dueDate="details.dueDate"
      v-if="editing"
      v-on:save="saveEditing"
      v-on:cancel="cancelEditing"></action-editor>
  </li>
</template>

<script>
  import ActionEditor from './ActionEditor'
  import LinkButton from './LinkButton'
  import MenuButton from './MenuButton'
  import { removeAction, updateAction, addActionToToday } from '../vuex/actions'

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
      ActionEditor,
      LinkButton,
      MenuButton
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
      },
      /*
      * add action to today's todo list.
      */
      doItToday () {
        this.addActionToToday(this.id)
      }
    },
    computed: {
      details () {
        return this.actions[this.id]
      },
      isToday () {
        return this.todayActions.indexOf(this.id) !== -1
      }
    },
    vuex: {
      getters: {
        actions (state) {
          return state.actions
        },
        todayActions (state) {
          return state.todayActions
        }
      },
      actions: {
        removeAction,
        updateAction,
        addActionToToday
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
  .action-item .title.complete {
    color: gray;
    text-decoration: line-through;
  }
  .active {
    color: red;
    pointer-events: none;
  }
</style>
