<template>
	<AppActionButton
		to="/projects/new"
		txt="New Project"
		variant="primary"
	/>
	<div class="table-responsive">
		<table class="aa-table responsive">
			<thead>
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="project in projects" :key="project.id">
					<td>{{ project.id }}</td>
					<td>{{ project.name }}</td>
					<td class="flex flex-row justify-end">
						<AppActionButton
							:to="`/projects/${project.id}`"
							variant="icon"
							icon="edit"
						/>
						<AppActionButton
							@click="deleteProject(project.id)"
							variant="icon"
							icon="delete"
							class="text-red-500 hover:text-red-800"
						>
						</AppActionButton>
						<!-- class="text-red-500 hover:text-red-700" -->
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import { ACTION_FETCH_PROJECTS, ACTION_REMOVE_PROJECT } from "@/store/type-actions";
import AppActionButton from "@/components/AppActionButton.vue";

export default defineComponent({
	name: 'ListView',
	components: { AppActionButton },
	methods: {
		deleteProject(id: string) {
			this.store.dispatch(ACTION_REMOVE_PROJECT, id);
		}
	},
	setup() {
		const store = useStore();
		store.dispatch(ACTION_FETCH_PROJECTS);
		return {
			projects: computed(() => store.state.project.projects),
			store
		}
	}
});
</script>