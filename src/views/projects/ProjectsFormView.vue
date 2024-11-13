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
import { defineComponent, ref } from "vue";
import { useStore } from "@/store";
import { ACTION_CREATE_PROJECT, ACTION_UPDATE_PROJECT } from "@/store/type-actions";
import AppActionButton from "@/components/AppActionButton.vue";
import { TypeToaster } from "@/interfaces/IToaster";
import useToaster from "@/hooks/toastification"
import { useRouter } from "vue-router";

export default defineComponent({
	name: 'ProjectsFormView',
	components: { AppActionButton },
	props: {
		id: String
	},
	setup(props) {
		const router = useRouter();
		const store = useStore();
		const projectName = ref("");
		const { addToast } = useToaster();

		if(props.id) {
			const project = store.state.project.projects.find(
        (proj) => proj.id == props.id
      );
      projectName.value = project?.name || '';
		}

		const saveProject = () => {
			if(props.id) {
				store.dispatch(ACTION_UPDATE_PROJECT, {
					id: props.id,
					name: projectName.value
				}).then(() => success());
			} else {
				store.dispatch(ACTION_CREATE_PROJECT, projectName.value)
					.then(() => success());
			}
		}

		const success = () => {
			projectName.value = '';
			addToast(TypeToaster.SUCCESS, 'Project saved sucessfully!');
			router.push('/projects');
		}

		// should onlye return what needs to be used in the template
		return {
			projectName,
			saveProject
		}
	}
});
</script>