<template>
	<form @submit.prevent="saveProject" class="flex gap-4 items-center">
		<div class="flex flex-row gap-2 items-center w-full">
			<label for="projectName">Project Name</label>
			<input
				type="text"
				v-model="projectName"
				id="projectName"
				class="flex-1 bg-gray-900 appearance-none border-2 border-gray-900 rounded w-full py-2 px-4 text-white leading-tight focus:outline-none focus:bg-gray-900/80 focus:border-blue-500"
			/>
		</div>
		<div class="flex flex-row gap-2 items-center w-full">
			<AppActionButton
				txt="Save"
				type="submit"
			>
			</AppActionButton>
		</div>
	</form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store";
import { ACTION_CREATE_PROJECT, ACTION_UPDATE_PROJECT } from "@/store/type-actions";
import AppActionButton from "@/components/AppActionButton.vue";
import { TypeToaster } from "@/interfaces/IToaster";
import useToaster from "@/hooks/toastification"

export default defineComponent({
	name: 'ProjectsFormView',
	components: { AppActionButton },
	props: {
		id: String
	},
	mounted() {
		if(this.id) {
			const project = this.store.state.project.projects.find(
        (proj) => proj.id == this.id
      );
      this.projectName = project?.name || '';
		}
	},
	data() {
		return {
			projectName: ""
		}
	},
	methods: {
		saveProject() {
			if(this.id) {
				this.store.dispatch(ACTION_UPDATE_PROJECT, {
					id: this.id,
					name: this.projectName
				}).then(() => this.success());
			} else {
				this.store.dispatch(ACTION_CREATE_PROJECT, this.projectName)
					.then(() => this.success());
			}
		},
		success() {
			this.projectName = '';
			this.addToast(TypeToaster.SUCCESS, 'Project saved sucessfully!');
			// this.$router.push('/projects');
		}
	},
	setup() {
		const store = useStore();
		const { addToast } = useToaster();
		return {
			store,
			addToast
		}
	}
});
</script>