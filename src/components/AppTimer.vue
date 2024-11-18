<template>
  <AppStopWatch :timeSec="timeSec" />
  <AppActionButton
    @emitClicked="start"
    icon="play_arrow"
    txt="play"
    :disabled="stopwatchRunning"
  />
  <AppActionButton
    @emitClicked="stop"
    icon="stop"
    txt="stop"
    :disabled="!stopwatchRunning"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppStopWatch from './AppStopWatch.vue';
import AppActionButton from './AppActionButton.vue';

export default defineComponent({
  name: 'AppTimer',
  emits: ['atTimeFinished'],
  components: { AppStopWatch, AppActionButton },
  data() {
    return {
      timeSec: 0,
      stopwatch: 0,
      stopwatchRunning: false,
    };
  },
  methods: {
    start() {
      this.stopwatchRunning = true;
      this.stopwatch = setInterval(() => {
        this.timeSec += 1;
      }, 1000);
    },
    stop() {
      this.stopwatchRunning = false;
      clearInterval(this.stopwatch);
      this.$emit('atTimeFinished', this.timeSec);
      this.timeSec = 0;
    },
  },
  // setup() {},
});
</script>
