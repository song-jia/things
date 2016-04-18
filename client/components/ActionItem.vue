<template>
  <div class="action-item">
    {{ id }} {{ details.title }}
  </div>
</template>

<script>
  export default {
    props: {
      id: String
    },
    computed: {
      details () {
        return this.actions[this.id]
      }
    },
    vuex: {
      getters: {
        actions (state) {
          return state.actions
        }
      }
    }
  }
</script>
