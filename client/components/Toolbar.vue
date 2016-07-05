<template>
  <div class="toolbar pure-menu">
    <span class="pure-menu-heading">Things</span>
    <ul class="pure-menu-list">
      <li class="pure-menu-item">
        <a v-link="{ path: '/collections' }" class="pure-menu-link">collections</a>
      </li>
      <li class="pure-menu-item">
        <a v-link="{ path: '/today' }" class="pure-menu-link">
          Today <span v-if="todayActionsCount !== 0">{{ todayActionsCount }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    computed () {

    },
    vuex: {
      getters: {
        todayActionsCount (state) {
          return state.todayActions.length
        }
      }
    }
  }
</script>

<style scoped>
.toolbar {
  font-size: 17px;
}
.toolbar .pure-menu-heading {
  font-weight: 600;
}
</style>
