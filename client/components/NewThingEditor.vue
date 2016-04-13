<template>
  <div v-show="newThingModel">
    <input type="text" placeholder="" v-model="title"/>
    <input type="text" placeholder="due date"
      v-on:focus="dueDateFocusHandler"
      v-on:blur="dueDateBlurHandler"
      v-model="dueDate" />
    <button v-on:click="addHandler">add</button>
    <button v-on:click="cancelHandler">cancel</button>
  </div>
</template>

<script>
var data = {
  title: '',
  dueDate: null,
  showDatePicker: false
}
export default {
  data () {
    return data
  },
  methods: {
    addHandler () {
      var payload = {
        title: this.title,
        dueDate: this.dueDate
      }
      this.$dispatch('add', payload)
    },
    cancelHandler () {
      this.$dispatch('cancel')
    },
    dueDateFocusHandler () {
      data.showDatePicker = true
    },
    dueDateBlurHandler () {
      data.showDatePicker = false
    }
  }
}
</script>
