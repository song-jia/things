<!--
  display flag of priority.

  property
    priority: priority ID
-->
<template>
    <i class="fa fa-flag" v-bind:class="priorityStyle"></i>
</template>

<script>
  export default {
    data () {
      return {}
    },
    props: {
      priority: {
        type: String,
        default: ''
      }
    },
    computed: {
      priorityStyle () {
        var style = ''
        switch (this.priority) {
          case '1':
            style = 'important-urgent'
            break
          case '2':
            style = 'important-not-urgent'
            break
          case '3':
            style = 'not-important-urgent'
            break
          case '4':
            style = 'not-important-not-urgent'
            break
          default:
            style = 'none'
        }
        return style
      }
    }
  }
</script>

<style>
  .none {
    color: black;
  }
  .important-urgent {
    color: #eb5a46;
  }
  .important-not-urgent {
    color: #0079bf;
  }
  .not-important-urgent {
    color: #61bd4f;
  }
  .not-important-not-urgent {
    color: #c377e0;
  }
</style>
