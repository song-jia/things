<template>
  <div class="a-panel">
    today actions
    <ul>
      <action-item
        v-for="id in actions"
        v-bind:id="id"
      ></action-item>
    </ul>
  </div>
</template>

<script>
import ActionItem from './ActionItem'
import { getTodayActions } from '../vuex/getters'

export default {
  data () {
    return {}
  },
  components: {
    ActionItem
  },
  vuex: {
    getters: {
      actions: getTodayActions
    }
  }
}
</script>

<style>
.a-panel {
  padding: 10px;
}
</style>
