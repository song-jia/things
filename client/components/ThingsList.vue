<template>
  <ul class="things-list">
    <thing-item v-for="thing in things" v-bind:thing="thing"></thing-item>
  </ul>
</template>

<script>
import ThingItem from './ThingItem'
import { getThingsList } from '../vuex/getters'

export default {
  components: {
    ThingItem
  },
  vuex: {
    getters: {
      things: getThingsList
    }
  }
}
</script>

<style>
  .things-list {
    padding: 0;
    list-style: none;
  } 
</style>
