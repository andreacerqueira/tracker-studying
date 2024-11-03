<template>
	<h1>Tasks</h1>
	<AppForm @atSavingTask="saveTask" />
	<div class="mt-8">
		<AppTasks v-for="(task, index) in tasks" :key="index" :task="task" />
		<AppListBox v-if="listIsEmpty" class="justify-self-center text-center">
			Let's get it started!
		</AppListBox>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppForm from "../components/AppForm.vue";
import AppTasks from "../components/AppTasks.vue";
import AppListBox from '../components/AppListBox.vue';
import ITask from "../interfaces/ITask";

export default defineComponent({
	name: "App",
	components: { AppForm, AppTasks, AppListBox },
	data() {
		return {
			tasks: [] as ITask[]
		}
	},
	computed: {
		listIsEmpty() : boolean {
			return this.tasks.length === 0;
		}
	},
	methods: {
		saveTask(task: ITask) : void {
			this.tasks.push(task);
		}
	}
	// setup() {},
});
</script>

<style lang="scss">
</style>
