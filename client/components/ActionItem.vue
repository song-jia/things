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
    vuex: {
      getters: {
        details (state) {
          debugger
          return state.actions[this.id]
        }
      }
    }
  }
</script>
