<template>
  <div class="table-responsive">
    <table class="aa-table responsive">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td>{{ project.id }}</td>
          <td>{{ project.name }}</td>
          <td class="flex flex-row justify-end">
            <AppActionButton
              @click="clickProject(project)"
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

  <AppModal :isOpen="selectedProject != null" @close="closeModal">
    <template v-slot:header>
      {{ isEditing ? 'Edit Project' : 'New Project' }}
    </template>
    <template v-slot:body>
      <div class="flex flex-col gap-8">
        <div class="flex flex-col gap-2 w-full text-left">
          <label for="project-name" class="text-white">Name</label>
          <input
            type="text"
            name="project-name"
            id="project-name"
            class="flex-1 bg-gray-800 appearance-none border-2 border-gray-800 rounded w-full py-2 px-4 text-white leading-tight focus:outline-none focus:bg-gray-900/80 focus:border-blue-500"
            v-model="selectedProject.name"
          />
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <button
        class="flex gap-2 w-fit font-bold py-2 px-4 cursor-pointer duration-300 focus:shadow-outline focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-400 bg-blue-500 text-white rounded shadow hover:bg-blue-400"
        @click="saveProject"
      >
        {{ isEditing ? 'Save' : 'Create' }}
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
import { computed, defineComponent } from 'vue';
import { useStore } from '@/store';
import {
  ACTION_CREATE_PROJECT,
  ACTION_FETCH_PROJECTS,
  ACTION_REMOVE_PROJECT,
  ACTION_UPDATE_PROJECT,
} from '@/store/type-actions';
import AppActionButton from '@/components/AppActionButton.vue';
import AppModal from '@/components/AppModal.vue';
import IProject from '@/interfaces/IProject';

export default defineComponent({
  name: 'ListView',
  components: { AppActionButton, AppModal },
  data() {
    return {
      selectedProject: null as IProject | null,
      isEditing: false,
    };
  },
  methods: {
    saveProject() {
      if (this.isEditing) {
        this.store
          .dispatch(ACTION_UPDATE_PROJECT, this.selectedProject)
          .then(() => this.store.dispatch(ACTION_FETCH_PROJECTS));
      } else {
        this.store
          .dispatch(ACTION_CREATE_PROJECT, this.selectedProject?.name)
          .then(() => this.store.dispatch(ACTION_FETCH_PROJECTS));
      }
      this.closeModal();
    },
    deleteProject(id: string) {
      this.store.dispatch(ACTION_REMOVE_PROJECT, id);
    },
    clickProject(project: IProject) {
      this.selectedProject = { ...project };
      this.openModal(true, project);
    },
    openModal(isEdit: boolean, project: IProject | null = null) {
      this.isEditing = isEdit;
      this.selectedProject =
        isEdit && project ? { ...project } : { id: '', name: '' };
    },
    closeModal() {
      this.selectedProject = null;
    },
  },
  setup() {
    const store = useStore();
    store.dispatch(ACTION_FETCH_PROJECTS);

    return {
      projects: computed(() => store.state.project.projects),
      store,
    };
  },
});
</script>
