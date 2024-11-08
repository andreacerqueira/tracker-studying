<template>
	
	<h1>Tasks</h1>

	<AppForm @atSavingTask="saveTask" />

	<div class="mt-8">
		<AppTasks v-for="(task, index) in tasks" :key="index" :task="task" @onTaskClicked="selectTask" />
		<AppListBox v-if="listIsEmpty" class="justify-self-center text-center">
			Let's get it started!
		</AppListBox>
	</div>

	<button
		@click="isModalVisible = true"
		class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
	>
		Open Modal
	</button>

	<AppModal :isOpen="isModalVisible" @close="isModalVisible = false" />
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import AppForm from "../components/AppForm.vue";
import AppTasks from "../components/AppTasks.vue";
import AppListBox from '../components/AppListBox.vue';
import AppModal from '../components/AppModal.vue';
import { ACTION_FETCH_TASKS, ACTION_CREATE_TASK, ACTION_UPDATE_TASK, ACTION_FETCH_PROJECTS } from "@/store/type-actions";
import ITask from "@/interfaces/ITask";

export default defineComponent({
	name: "TasksView",
	components: { AppForm, AppTasks, AppListBox, AppModal },
	data() {
    return {
      selectedTask: null as ITask | null,
			isModalVisible: false
    };
  },
	methods: {
		saveTask(task: ITask) : void {
			this.store.dispatch(ACTION_CREATE_TASK, task);
		},
		updateTask() {
			this.store.dispatch(ACTION_UPDATE_TASK, this.selectedTask)
        .then(() => this.closeModal())
		},
    selectTask(task: ITask) {
      this.selectedTask = task;
    },
    closeModal() {
      this.selectedTask = null;
    },
	},
	computed: {
		listIsEmpty() : boolean {
			return this.tasks.length === 0;
		}
	},
	setup() {
		const store = useStore();
		store.dispatch(ACTION_FETCH_TASKS);
		store.dispatch(ACTION_FETCH_PROJECTS);
		return {
			tasks: computed(() => store.state.task.tasks),
			store
		}
	}
});
</script>

<style lang="scss">
</style>
