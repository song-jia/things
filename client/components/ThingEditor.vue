<template>
  <div class="thing-editor">
    <div class="pure-g">
      <input type="text" placeholder="" v-model="title" class="input-title pure-u-4-5" value="{{ default.title }}"/>
      <input type="text" placeholder="due date" class="pure-u-1-5"
        v-on:focus="dueDateFocusHandler"
        v-on:blur="dueDateBlurHandler"
        v-model="dueDate" />
    </div>
    <div class="button-group">
      <button v-on:click="saveHandler" class="pure-button">save</button>
      <a v-on:click="cancelHandler" class="">cancel</a>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        id: '',
        title: '',
        dueDate: '',
        showDatePicker: false
      }
    },
    props: {
      // default value of inputs
      default: {
        type: Object,
        default () {
          return {
            id: '',
            title: '',
            dueDate: ''
          }
        }
      }
    },
    methods: {
      /*
       * clear form input data.
       */
      clearForm () {
        this.title = ''
        this.dueDate = ''
      },
      /*
       * dispatch save event when clicking save button.
       */
      saveHandler () {
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
          id: this.id,
          title: this.title,
          dueDateType: type,
          dueDate: dueDate
        }
        this.$dispatch('save', payload)
        this.clearForm()
      },
      /*
       * clear form and dispatch cancel event when clicking cancel button.
       */
      cancelHandler () {
        this.$dispatch('cancel')
        this.clearForm()
      },
      dueDateFocusHandler () {
        this.showDatePicker = true
      },
      dueDateBlurHandler () {
        this.showDatePicker = false
      }
    },
    created () {
      this.id = this.default.id
    }
  }
</script>

<style>
  .thing-editor input {
    font-size: 13px;
    padding: 5px;
    box-sizing: border-box;
  }
  .thing-editor input:focus {
    outline: none;
  }
  .thing-editor .input-title {

  }
  .thing-editor .button-group {
    padding: 5px 0;
  }
  .thing-editor .button-group .cancel-link {
    margin-left: 5px;
  }
</style>
