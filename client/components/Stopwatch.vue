<!--
  count time and display time in format h : m : s.
  automatically start counting when this compenent has been created.

  properties:
    startTime: default to current timestamp.
-->
<template>
  <span>{{ time }}</span>
</template>

<script>
  export default {
    data () {
      return {
        time: ''
      }
    },
    props: {
      startTime: {
        type: Number,
        default: (new Date()).getTime()
      }
    },
    methods: {
      updateTime () {
        this.time = this.formatTime((new Date()).getTime() - this.startTime)
      },
      /**
       * format time stamp to format 00:00:00
       */
      formatTime (time) {
        time = Math.floor(time / 1000)
        var s = time % 60
        var m = Math.floor(time / 60)
        var h = Math.floor(time / 3600)
        return `${this.paddingZero(h)}:${this.paddingZero(m)}:${this.paddingZero(s)}`
      },
      /**
       * padding zero to left of number string.
       */
      paddingZero (n) {
        n = String(n)
        if (n.length < 2) {
          return '0' + n
        } else {
          return n
        }
      }
    },
    /**
     * set interval for updating time every second.
     */
    created () {
      this.updateTime()
      this.interval = window.setInterval(this.updateTime, 1000)
    },
    /**
     * remove interval when component is destroied.
     */
    destroyed () {
      window.clearInterval(this.interval)
    }
  }
</script>
