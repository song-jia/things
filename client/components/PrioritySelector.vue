<!--
  selector of priority.

  properties
    priority: ID of selected priority default to null.

  event
    change: dispatched with priority ID when priority has been changed.
-->
<template>
  <a class="priority-link" v-on:click="showPriorityList">
    <priority-flag :priority="priority"></priority-flag> priority
  </a>
  <div class="priorities" v-show="showPriorities" id="priorities-list">
    <a v-on:click="changePriority" data-id="1">
      <priority-flag priority="1"></priority-flag> important urgent
    </a>
    <a v-on:click="changePriority" data-id="2">
      <priority-flag priority="2"></priority-flag> important not urgent
    </a>
    <a v-on:click="changePriority" data-id="3">
      <priority-flag priority="3"></priority-flag> not important urgent
    </a>
    <a v-on:click="changePriority" data-id="4">
      <priority-flag priority="4"></priority-flag> not important not urgent
    </a>
  </div>
</template>

<script>
  import PriorityFlag from './PriorityFlag'

  export default {
    data () {
      return {
        showPriorities: false
      }
    },
    props: {
      priority: {
        type: String,
        default: null
      }
    },
    methods: {
      showPriorityList () {
        this.showPriorities = !this.showPriorities
      },
      changePriority (e) {
        // update thing priority
        if (e.currentTarget.dataset.id !== this.priority) {
          this.$dispatch('change', e.currentTarget.dataset.id)
        }
        // close priorities list
        this.showPriorities = false
      }
    },
    components: {
      PriorityFlag
    }
  }
</script>

<style>
  .priorities {
    border: 1px solid #d6dadc;
    box-shadow: 0 1px 6px rgba(0,0,0,.15);
    padding: 5px;
    width: 200px;
    text-align: left;
    position: absolute;
    background-color: white;
    right: 10px;
  }
  .priority-link {
    cursor: pointer;
  }
  .priorities i {
    font-size: 15px;
  }
  .priorities a {
    display: block;
    text-decoration: none;
    margin-bottom: 3px;
    color: #555555;
    cursor: pointer;
  }
</style>
