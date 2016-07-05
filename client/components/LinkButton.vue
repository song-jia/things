<template>
  <a class="link"
     v-bind:class="class">
    <i :class="iconClass" aria-hidden="true"></i>
    <slot></slot>
  </a>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    props: {
      icon: String,
      class: String
    },
    computed: {
      iconClass () {
        if (this.icon) {
          return 'fa fa-' + this.icon
        } else {
          return ''
        }
      }
    }
  }
</script>

<style scoped>
  .link {
    cursor: pointer;
  }
</style>
