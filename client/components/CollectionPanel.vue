<template>
  <div class="c-panel">
    <things-list></things-list>
    <new-thing-tool></new-thing-tool>
  </div>
</template>

<script>
  import ThingsList from './ThingsList'
  import NewThingTool from './NewThingTool'

  export default {
    data () {
      return {
        // display new thing editor and hide add thing button when newThingModel is true, default to false
        newThingModel: false
      }
    },
    methods: {},
    components: {
      ThingsList,
      NewThingTool
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
</style>
