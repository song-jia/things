<template>
  <div class="tools" v-show="!editing">
    <a v-on:click="showEditor" class="action-link new-link">
      <i class="fa fa-plus" aria-hidden="true"></i> Add Thing
    </a>
  </div>
  <thing-editor
    v-show="editing"
    v-on:save="saveThing"
    v-on:cancel="cancelEditor"
  ></thing-editor>
</template>

<script>
  import { addNewThing } from '../vuex/actions'
  import ThingEditor from './ThingEditor'

  export default {
    data () {
      return {
        editing: false
      }
    },
    methods: {
      /*
       * display new thing editor and hide Add Thing link.
       */
      showEditor () {
        this.editing = true
      },
      /*
       * save defails of thing
       */
      saveThing (thing) {
        this.addNewThing(thing)
        // hide editor
        this.editing = false
      },
      /*
       * disable new thing model
       */
      cancelEditor () {
        this.editing = false
      }

    },
    components: {
      ThingEditor
    },
    vuex: {
      actions: {
        addNewThing
      }
    }
  }
</script>

<style>
  .c-panel .tools {
    padding: 10px 0;
  }
</style>
