<template>

	<h1>Tasks</h1>

	<AppForm @atSavingTask="saveTask" />

	<div class="mt-8">
		<div class="flex flex-row gap-2 items-center w-full">
			<label for="search">Search</label>
			<input
				type="text"
				v-model="search"
				id="search"
				placeholder="Type"
				class="flex-1 bg-gray-900 appearance-none border-2 border-gray-900 rounded w-full py-2 px-4 text-white leading-tight focus:outline-none focus:bg-gray-900/80 focus:border-blue-500"
			/>
		</div>

		<AppTasks v-for="(task, index) in tasks" :key="index" :task="task" @onTaskClicked="clickTask" />

		<AppListBox v-if="listIsEmpty" class="justify-self-center text-center">
			Let's get it started!
		</AppListBox>
	</div>

	<AppModal :isOpen="selectedTask != null" @close="closeModal">
		<template v-slot:header>
			Edit Task
		</template>
		<template v-slot:body>
			<div class="flex flex-col gap-8">
				<div class="flex flex-col gap-2 w-full text-left">
					<label for="task-name" class="text-white">Name</label>
					<input
						type="text"
						name="task-name"
						id="task-name"
						class="flex-1 bg-gray-800 appearance-none border-2 border-gray-800 rounded w-full py-2 px-4 text-white leading-tight focus:outline-none focus:bg-gray-900/80 focus:border-blue-500"
						v-model="selectedTask.description"
					/>
				</div>
				<div class="flex flex-col gap-2 w-full text-left">
					<label for="task-name" class="text-white">Project</label>
					<input
						type="text"
						name="task-name"
						id="task-name"
						class="flex-1 bg-gray-800 appearance-none border-2 border-gray-800 rounded w-full py-2 px-4 text-white leading-tight focus:outline-none focus:bg-gray-900/80 focus:border-blue-500"
						v-model="selectedTask.description"
					/>
				</div>
			</div>
		</template>
		<template v-slot:footer>
			<button
				class="flex gap-2 w-fit font-bold py-2 px-4 cursor-pointer duration-300 focus:shadow-outline focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-400 bg-blue-500 text-white rounded shadow hover:bg-blue-400"
				@click="updateTask"
			>
				Save
			</button>
			<button
				@click="closeModal"
				class="flex gap-2 w-fit font-bold py-2 px-4 cursor-pointer duration-300 focus:shadow-outline focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-400 bg-blue-500/20 text-white rounded shadow hover:bg-blue-400/40"
			>
				Close
			</button>
		</template>
	</AppModal>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";
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
      selectedTask: null as ITask | null
    };
  },
	methods: {
		saveTask(task: ITask) : void {
			this.store.dispatch(ACTION_CREATE_TASK, task)
				.then(() => this.store.dispatch(ACTION_FETCH_TASKS));
		},
		updateTask() {
			this.store.dispatch(ACTION_UPDATE_TASK, this.selectedTask)
				.then(() => {
					this.store.dispatch(ACTION_FETCH_TASKS);
					this.closeModal();
				});
		},
    clickTask(task: ITask) {
      this.selectedTask = { ...task };
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
		const search = ref("");
		
		store.dispatch(ACTION_FETCH_TASKS);
		store.dispatch(ACTION_FETCH_PROJECTS);

		watchEffect(() => {
			store.dispatch(ACTION_FETCH_TASKS, search.value);
		});

		return {
			tasks:  computed(() => store.state.task.tasks),
			store,
			search
		}
	}
});
</script>

<style lang="scss">
</style>
