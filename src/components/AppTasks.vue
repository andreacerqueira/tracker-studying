<template>
	<AppListBox @click="taskClicked">
		<div>
			{{ task.description || 'Task without a name!' }}
		</div>
		<div>
			{{ task.project?.name || 'N/D' }}
		</div>
		<div class="sm:flex sm:flex-col sm:items-end">
			<AppStopWatch :timeSec="task.durationInSecs" />
		</div>
	</AppListBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import AppStopWatch from './AppStopWatch.vue';
import AppListBox from './AppListBox.vue';

import ITask from '../interfaces/ITask';

export default defineComponent({
	name: "AppTask",
	emits: ['onTaskClicked'],
	components: { AppStopWatch, AppListBox },
	props: {
		task: { 
			type: Object as PropType<ITask>,
			required: true
		}
	},
	methods: {
    taskClicked() : void {
      this.$emit('onTaskClicked', this.task);
    }
  },
  computed: {
    timePast() : string {
      return new Date(this.task.durationInSecs * 1000)
        .toISOString()
        .substr(11, 8)
    }
  }
});
</script>

<style lang="scss">

</style>