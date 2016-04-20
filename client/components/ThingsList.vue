<template>
  <ul class="things-list">
    <thing-item
      v-for="thing in things"
      v-bind:thing="thing"
      v-on:menu-open="broadcastMenuOpenStatus"></thing-item>
  </ul>
</template>

<script>
import ThingItem from './ThingItem'
import { getThingsList } from '../vuex/getters'

export default {
  components: {
    ThingItem
  },
  methods: {
    /*
    * broadcast menu open status to all items when the menu of a item is open.
    */
    broadcastMenuOpenStatus (id) {
      this.$broadcast('has-menu-open', id)
    }
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
