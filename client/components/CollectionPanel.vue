<template>
  <div class="c-panel">
    <div>
      <button v-show="!newThingModel" v-on:click="showNewThingEditor">+ Add Thing</button>
    </div>
    <div v-show="newThingModel">
      <input type="text" placeholder="" v-model="newThingTitle"/>
      <button v-on:click="saveThingHandler">save</button>
      <button v-on:click="cancelNewThingModel">cancel</button>
    </div>
  </div>
</template>

<script>
  import { addNewThing } from '../vuex/actions'

  // private state of this component
  var data = {
    // display new thing editor and hide add thing button when newThingModel is true, default to false
    newThingModel: false,
    newThingTitle: ''
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
