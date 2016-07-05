<template>
  <li class="item">
    <div>
      <div class="viewbox">
        <span class="title">{{ details.title }}</span>
        <menu-button v-on:click="showMenuHandler">
        </menu-button>
      </div>
      <div class="toolbox" v-show="showMenu || started" :transition="expand">
        <stopwatch v-if="started"
                   :start-time="details['startTime']">
        </stopwatch>
        <link-button icon="play"
                     v-show="!started"
                     v-on:click="startAction"
        >
          start
        </link-button>
        <link-button icon="pause"
                     v-show="started"
                     v-on:click="pauseAction"
        >
          pause
        </link-button>
        <link-button icon="check"
                     v-on:click="completeAction"
        >
          complete
        </link-button>
      </div>
    </div>
  </li>
</template>

<script>
  /*
   * initial state:
   * > display todo action.
   * > provide three buttons start, pause, complete.
   * > display the stopwatch if action is in status 'doing'.
   *
   * displaying of three buttons:
   * > display start button when action is not started.
   * > display pause button when action is started.
   * > always display complete button.
   *
   * actions of buttons:
   * > start
   *   start counting time and display stopwatch.
   *   mark the action as 'doing'.
   * > pause
   *   stop counting time and mark the action as 'pause'.
   *   save the usage time.
   * > complete:
   *   make the action to be complete.
   *   remove the action from today todo action list.
   */
  import LinkButton from './LinkButton'
  import MenuButton from './MenuButton'
  import Stopwatch from './Stopwatch'
  import { updateAction, removeTodayAction } from '../vuex/actions'

  export default {
    data () {
      return {
        showMenu: false,
        started: false
      }
    },
    props: {
      id: String
    },
    components: {
      LinkButton,
      MenuButton,
      Stopwatch
    },
    methods: {
      /*
       * toggle menu when click menu icon.
      */
      showMenuHandler () {
        this.showMenu = !this.showMenu
      },
      startAction () {
        this.started = true
        this.updateAction({
          id: this.id,
          status: 'doing',
          startTime: (new Date()).getTime()
        })
      },
      /*
       * stop and hide stopwatch.
       * save usage time.
       */
      pauseAction () {
        this.started = false
        this.updateAction({
          id: this.id,
          status: 'pause',
          usageTime: this.getUsageTime()
        })
      },
      /*
       * mark action as complete.
       * save usage time if action is in status 'doing'
       * remove action from today actions.
       */
      completeAction () {
        var payload = {
          id: this.id,
          status: 'complete'
        }
        if (this.started) {
          payload['usageTime'] = this.getUsageTime()
        }
        this.updateAction(payload)
        this.removeTodayAction(this.id)
      },
      /*
       * get time range between startTime and current time.
       */
      getUsageTime () {
        var usageTime = this.details.usageTime.slice(0)
        usageTime.push({
          from: this.details.startTime,
          to: (new Date()).getTime()
        })
        return usageTime
      }
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
      },
      actions: {
        updateAction,
        removeTodayAction
      }
    },
    created () {
      this.started = this.details['status'] === 'doing'
    }
  }
</script>

<style scoped>
  .viewbox {
    padding: 5px 0;
  }
  .title {
    display: inline-block;
    vertical-align: middle;
  }
</style>
