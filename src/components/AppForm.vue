<template>
	<div class="flex gap-24 items-center">
		<div
			class="flex flex-row gap-2 items-center w-full"
			role="form"
			aria-label="Form for creating new tasks"
		>
			<label for="task_name" class="flex block font-bold">Task Name</label>
			<input
				type="text"
				name="task_name"
				id="task_name"
				placeholder="What task are you starting to work on?"
				v-model="description"
				class="flex-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
			/>
		</div>
		<div class="flex flex-row gap-2 items-center w-full">
			<label for="project_name" class="flex block font-bold">List of Projects</label>
			<select
				v-model="idProject"
				name="project_name"
				id="project_name"
				placeholder="What task are you starting to work on?"
				class="flex-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
			>
			<option>Select a project</option>
			<option
				v-for="project in projects"
				:value="project.id"
				:key="project.id"
			>
				{{ project.name }}
			</option>
			</select>
		</div>
		<div class="flex flex-row gap-2 items-center">
			<AppTimer @atTimeFinished="finishTask" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import AppTimer from "./AppTimer.vue";
import { useStore } from "vuex";
import { key } from "@/store";

export default defineComponent({
	name: "AppForm",
	emits: ['atSavingTask'],
	components: { AppTimer },
	data() {
		return {
			description: null,
			idProject: null
		}
	},
	methods:  {
		finishTask(elapsedTime: number) : void {
			this.$emit('atSavingTask', {
				durationInSecs: elapsedTime,
				description: this.description,
				project: this.projects.find(proj => proj.id == this.idProject)
			});
			this.description = null;
		}
	},
	setup() {
		const store = useStore(key);
		return {
			projects: computed(() => store.state.projects)
		}
	}
});
</script>
