<template>
  <h2 class="ml-4 mt-4 px-4 py-2 rounded-tr-md rounded-tl-md w-fit bg-gray-900">
    Start New Task
  </h2>
  <div class="flex gap-8 items-center p-6 bg-gray-700 rounded">
    <div
      class="flex flex-row gap-2 items-center w-full"
      role="form"
      aria-label="Form for creating new tasks"
    >
      <label for="task_name" class="flex font-bold">Task Name</label>
      <input
        type="text"
        name="task_name"
        id="task_name"
        placeholder="What task are you starting to work on?"
        v-model="description"
        class="flex-1 bg-gray-900 appearance-none border-2 border-gray-900 rounded w-full py-2 px-4 text-white leading-tight focus:outline-none focus:bg-gray-900/80 focus:border-blue-500"
      />
    </div>
    <div class="flex flex-row gap-2 items-center w-full">
      <label for="project_name" class="flex font-bold">List of Projects</label>
      <select
        v-model="idProject"
        name="project_name"
        id="project_name"
        placeholder="What task are you starting to work on?"
        class="flex-1 bg-gray-900 appearance-none border-2 border-gray-900 rounded w-full py-2 px-4 text-white leading-tight focus:outline-none focus:bg-gray-900/80 focus:border-blue-500"
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
import { computed, defineComponent, ref } from 'vue';
import AppTimer from './AppTimer.vue';
import { useStore } from 'vuex';
import { key } from '@/store';

export default defineComponent({
  name: 'AppForm',
  emits: ['atSavingTask'],
  components: { AppTimer },
  setup(props, { emit }) {
    const store = useStore(key);
    const description = ref('');
    const idProject = ref('');
    const projects = computed(() => store.state.project.projects);

    const finishTask = (elapsedTime: number): void => {
      emit('atSavingTask', {
        durationInSecs: elapsedTime,
        description: description.value,
        project: projects.value.find((proj) => proj.id == idProject.value),
      });
      description.value = '';
    };

    return {
      description,
      idProject,
      projects,
      finishTask,
    };
  },
});
</script>
