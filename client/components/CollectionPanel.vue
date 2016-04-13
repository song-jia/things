<template>
  <div class="c-panel">
    <div>
      <button v-show="!newThingModel" v-on:click="showNewThingEditor">+ Add Thing</button>
    </div>
    <new-thing-editor v-show="newThingModel" v-on:cancel="cancelNewThingModel"></new-thing-editor>
  </div>
</template>

<script>
  import { addNewThing } from '../vuex/actions'
  import NewThingEditor from './NewThingEditor'

  // private state of this component
  var data = {
    // display new thing editor and hide add thing button when newThingModel is true, default to false
    newThingModel: false
  }
  /*
   * display new thing editor and hide Add Thing link.
   */
  function showNewThingEditor () {
    data.newThingModel = true
  }
  /*
   * disable new thing model
   */
  function cancelNewThingModel () {
    data.newThingModel = false
  }
  /*
   * save defails of thing
   */
  function saveThingHandler () {
    this.addNewThing({title: this.newThingTitle})
    data.newThingModel = false
  }

  export default {
    data () {
      return data
    },
    methods: {
      showNewThingEditor,
      cancelNewThingModel,
      saveThingHandler
    },
    components: {
      NewThingEditor
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
  }
</style>
