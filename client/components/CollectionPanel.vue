<template>
  <div class="c-panel">
    <things-list></things-list>
    <div class="tools" v-show="!newThingModel">
      <a v-on:click="showNewThingEditor" class="action-link new-link">
        <i class="fa fa-plus" aria-hidden="true"></i> Add Thing
      </a>
    </div>
    <new-thing-editor
      v-show="newThingModel"
      v-on:add="addNewThingHandler"
      v-on:cancel="cancelNewThingModel"
    ></new-thing-editor>
  </div>
</template>

<script>
  import { addNewThing } from '../vuex/actions'
  import NewThingEditor from './NewThingEditor'
  import ThingsList from './ThingsList'

  /*
   * display new thing editor and hide Add Thing link.
   */
  function showNewThingEditor () {
    this.newThingModel = true
  }
  /*
   * disable new thing model
   */
  function cancelNewThingModel () {
    this.newThingModel = false
  }
  /*
   * save defails of thing
   */
  function addNewThingHandler (payload) {
    this.addNewThing(payload)
    this.newThingModel = false
  }

  export default {
    data () {
      return {
        // display new thing editor and hide add thing button when newThingModel is true, default to false
        newThingModel: false
      }
    },
    methods: {
      showNewThingEditor,
      cancelNewThingModel,
      addNewThingHandler
    },
    components: {
      NewThingEditor,
      ThingsList
    },
    vuex: {
      actions: {
        addNewThing
      }
    }
  }
</script>

<style>
  .c-panel {
    padding: 10px;
    background-color: #ffffff;
    min-height: 100%;
  }
  .c-panel .new-link .icon {
    display: inline-block;
    margin-right: 8px;
    font-size: 15px;
    font-weight: 600;
  }
  .c-panel .tools {
    padding: 10px 0;
  }
</style>
