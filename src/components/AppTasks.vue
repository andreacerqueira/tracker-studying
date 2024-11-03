<template>
	<AppListBox>
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
	components: { AppStopWatch, AppListBox },
	props: {
		task: { 
			type: Object as PropType<ITask>,
			required: true
		}
	}
});
</script>

<style lang="scss">

</style>