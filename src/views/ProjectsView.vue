<template>
  <AppH1>
    Projects
    <template v-slot:dir>
      <div class="flex flex-row gap-2 items-center text-lg ml-auto">
        <AppActionButton
          @click="openModal(false)"
          txt="New Project"
          variant="primary"
        />
      </div>
    </template>
  </AppH1>
  <router-view></router-view>
  <AppModal :isOpen="selectedProject != null" @close="closeModal">
    <template v-slot:header> New Project </template>
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
        Create
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
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';
import {
  ACTION_CREATE_PROJECT,
  ACTION_FETCH_PROJECTS,
} from '@/store/type-actions';
import AppH1 from '@/components/AppH1.vue';
import AppActionButton from '@/components/AppActionButton.vue';
import AppModal from '@/components/AppModal.vue';
import IProject from '@/interfaces/IProject';

export default defineComponent({
  name: 'ProjectsView',
  components: { AppH1, AppActionButton, AppModal },
  data() {
    return {
      selectedProject: null as IProject | null,
    };
  },
  methods: {
    saveProject() {
      this.store
        .dispatch(ACTION_CREATE_PROJECT, this.selectedProject?.name)
        .then(() => this.store.dispatch(ACTION_FETCH_PROJECTS));
      this.closeModal();
    },
    openModal(isEdit: boolean, project: IProject | null = null) {
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
