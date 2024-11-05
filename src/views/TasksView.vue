<template>
	<h1>Tasks</h1>
	<AppForm @atSavingTask="saveTask" />
	<div class="mt-8">
		<AppTasks v-for="(task, index) in tasks" :key="index" :task="task" @onTaskClicked="selectTask" />
		<AppListBox v-if="listIsEmpty" class="justify-self-center text-center">
			Let's get it started!
		</AppListBox>
	</div>
	<div class="modal" :class="{ 'is-active': selectedTask }" v-if="selectedTask">
		<section class="modal-card-body">
			<div class="field">
				<label for="descricaoDaTarefa" class="label">
					Descrição
				</label>
				<input
					type="text"
					class="input"
					v-model="selectedTask.description"
					id="descricaoDaTarefa"
				/>
			</div>
		</section>
		<button @click="updateTask" class="button is-success">Save</button>
		<!-- <button @click="closeModal" class="button">Cancel</button> -->
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import AppForm from "../components/AppForm.vue";
import AppTasks from "../components/AppTasks.vue";
import AppListBox from '../components/AppListBox.vue';
import { ACTION_FETCH_TASKS, ACTION_CREATE_TASK, ACTION_UPDATE_TASK, ACTION_FETCH_PROJECTS } from "@/store/type-actions";
import ITask from "@/interfaces/ITask";

export default defineComponent({
	name: "App",
	components: { AppForm, AppTasks, AppListBox },
	data() {
    return {
      selectedTask: null as ITask | null,
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
