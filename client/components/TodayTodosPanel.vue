<template>
  <div class="today-panel">
    <ul class="t-a-list">
      <todo-item
        v-for="id in actions"
        v-bind:id="id"
      ></todo-item>
    </ul>
  </div>
</template>

<script>
import TodayTodoItem from './TodayTodoItem'
import { getTodayActions } from '../vuex/getters'

export default {
  data () {
    return {}
  },
  components: {
    'TodoItem': TodayTodoItem
  },
  vuex: {
    getters: {
      actions: getTodayActions
    }
  }
}
</script>

<style>
.today-panel {
  padding: 10px;
  background-color: white;
  min-height: 100%;
}
.t-a-list {
  padding: 0;
  list-style: none;
}
</style>
