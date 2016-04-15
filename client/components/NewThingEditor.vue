<template>
  <div class="new-thing-editor">
    <div class="pure-g">
      <input type="text" placeholder="" v-model="title" class="input-title pure-u-4-5"/>
      <input type="text" placeholder="due date" class="pure-u-1-5"
        v-on:focus="dueDateFocusHandler"
        v-on:blur="dueDateBlurHandler"
        v-model="dueDate" />
    </div>
    <div class="button-group">
      <button v-on:click="addHandler" class="button-blue button-small pure-button">add</button>
      <a v-on:click="cancelHandler" class="action-link cancel-link">cancel</a>
    </div>
  </div>
</template>

<script>
var data = {
  title: '',
  dueDate: '',
  showDatePicker: false
}
/*
 * clear form input data.
 */
function clearForm () {
  data.title = ''
  data.dueDate = ''
}
export default {
  data () {
    return data
  },
  methods: {
    /*
     * dispatch add event when clicking add button.
     */
    addHandler () {
      var dueDate = this.dueDate.trim()
      var dueDates
      var type
      if (!dueDate) {
        type = 'none'
      } else if (dueDate.indexOf('~') !== -1) {
        type = 'period'
        dueDates = dueDate.split('~')
        dueDate = {
          from: dueDates[0].trim(),
          to: dueDates[1].trim()
        }
      } else {
        type = 'day'
      }
      var payload = {
        title: this.title,
        dueDateType: type,
        dueDate: dueDate
      }
      this.$dispatch('add', payload)
      clearForm()
    },
    /*
     * clear form and dispatch cancel event when clicking cancel button.
     */
    cancelHandler () {
      this.$dispatch('cancel')
      clearForm()
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

<style>
  .new-thing-editor input {
    font-size: 13px;
    padding: 5px;
    box-sizing: border-box;
  }
  .new-thing-editor input:focus {
    outline: none;
  }
  .new-thing-editor .input-title {

  }
  .new-thing-editor .button-group {
    padding: 5px 0;
  }
  .new-thing-editor .button-group .cancel-link {
    margin-left: 5px;
  }
</style>
