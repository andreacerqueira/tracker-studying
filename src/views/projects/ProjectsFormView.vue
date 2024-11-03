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
import { ADD_PROJECT, EDIT_PROJECT } from '@/store/type-mutations';
import AppActionButton from "@/components/AppActionButton.vue";
import { toasterMixin } from "@/mixins/addToast";
import { TypeToaster } from "@/interfaces/IToaster";

export default defineComponent({
	name: 'ProjectsFormView',
	components: { AppActionButton },
	props: {
		id: String
	},
	mixins: [toasterMixin],
	mounted() {
		const project = this.store.state.projects.find(proj => proj.id == this.id);
		this.projectName = project?.name || '';
	},
	data() {
		return {
			projectName: ""
		}
	},
	methods: {
		saveProject() {
			if(this.id) {
				this.store.commit(EDIT_PROJECT, {
					id: this.id,
					name: this.projectName
				});
			} else {
				this.store.commit(ADD_PROJECT, this.projectName);
			}
			this.projectName = '';
			this.addToast(TypeToaster.SUCCESS, 'Project saved sucessfully!');
			this.$router.push('/projects');
		}
	},
	setup() {
		const store = useStore();
		return {
			store
		}
	}
});
</script>