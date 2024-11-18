<template>
  <AppH1>
    Tasks
    <template v-slot:dir>
      <div class="flex flex-row gap-2 items-center text-lg ml-auto">
        <label for="search">Search</label>
        <input
          type="text"
          v-model="search"
          id="search"
          placeholder="Type"
          class="flex-1 bg-gray-900 appearance-none border-2 border-gray-900 rounded py-2 px-4 text-white leading-tight focus:outline-none focus:bg-gray-900/80 focus:border-blue-500"
        />
      </div>
    </template>
  </AppH1>

  <AppForm @atSavingTask="saveTask" />

  <div class="mt-8">
    <!-- <div class="flex flex-row gap-2 items-center py-8 w-full">
      <label for="search">Search</label>
      <input
        type="text"
        v-model="search"
        id="search"
        placeholder="Type"
        class="flex-1 bg-gray-900 appearance-none border-2 border-gray-900 rounded w-full py-2 px-4 text-white leading-tight focus:outline-none focus:bg-gray-900/80 focus:border-blue-500"
      />
    </div> -->

    <AppTable>
      <template v-slot:header>
        <th>ID</th>
        <th>Name</th>
        <th>Project</th>
        <th>Time</th>
        <th></th>
      </template>
      <template v-slot:body>
        <tr v-for="task in tasks" :key="task.id">
          <td>{{ task.id }}</td>
          <td>{{ task.description || 'Task without a name!' }}</td>
          <td>{{ task.project?.name || 'N/D' }}</td>
          <td>{{ convertTime(task.durationInSecs) }}</td>
          <td class="flex flex-row justify-end">
            <AppActionButton
              @click="clickTask(task)"
              variant="icon"
              icon="edit"
            />
            <AppActionButton
              @click="deleteTask(task.id)"
              variant="icon"
              icon="delete"
              class="text-red-500 hover:text-red-800"
            >
            </AppActionButton>
          </td>
        </tr>
      </template>
    </AppTable>

    <AppListBox v-if="listIsEmpty" class="justify-self-center text-center">
      Let's get it started!
    </AppListBox>
  </div>

  <AppModal :isOpen="selectedTask != null" @close="closeModal">
    <template v-slot:header> Edit Task </template>
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
          <select
            name="project"
            id="project"
            class="flex-1 bg-gray-800 appearance-none border-2 border-gray-800 rounded w-full py-2 px-4 text-white leading-tight focus:outline-none focus:bg-gray-900/80 focus:border-blue-500"
            v-model="selectedTask.project"
          >
            <option value="" disabled>Select a project</option>
            <option
              v-for="project in projects"
              :key="project.id"
              :value="project"
            >
              {{ project.name }}
            </option>
          </select>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <button
        class="flex gap-2 w-fit font-bold py-2 px-4 cursor-pointer duration-300 focus:shadow-outline focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-400 bg-blue-500 text-white rounded shadow hover:bg-blue-400"
        @click="updateTask"
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
import { computed, defineComponent, ref, watchEffect, PropType } from 'vue';
import { useStore } from '@/store';
import AppH1 from '../components/AppH1.vue';
import AppForm from '../components/AppForm.vue';
import AppActionButton from '@/components/AppActionButton.vue';
import AppTable from '../components//AppTable.vue';
import AppListBox from '../components/AppListBox.vue';
import AppModal from '../components/AppModal.vue';
import {
  ACTION_FETCH_TASKS,
  ACTION_CREATE_TASK,
  ACTION_UPDATE_TASK,
  ACTION_REMOVE_TASK,
  ACTION_FETCH_PROJECTS,
} from '@/store/type-actions';
import ITask from '@/interfaces/ITask';

export default defineComponent({
  name: 'TasksView',
  components: {
    AppH1,
    AppForm,
    AppActionButton,
    AppTable,
    AppListBox,
    AppModal,
  },
  data() {
    return {
      selectedTask: null as ITask | null,
      isEditing: false,
    };
  },
  props: {
    task: {
      type: Object as PropType<ITask>,
      required: true,
    },
  },
  methods: {
    saveTask(task: ITask): void {
      this.store
        .dispatch(ACTION_CREATE_TASK, task)
        .then(() => this.store.dispatch(ACTION_FETCH_TASKS));
    },
    updateTask() {
      this.store.dispatch(ACTION_UPDATE_TASK, this.selectedTask).then(() => {
        this.store.dispatch(ACTION_FETCH_TASKS);
        this.closeModal();
      });
    },
    deleteTask(id: string) {
      this.store.dispatch(ACTION_REMOVE_TASK, id);
    },
    clickTask(task: ITask) {
      this.selectedTask = { ...task };
      this.openModal(true, task);
    },
    openModal(isEdit: boolean, task: ITask | null = null) {
      this.isEditing = isEdit;
      this.selectedTask =
        isEdit && task
          ? { ...task, project: task.project || { id: '', name: '' } }
          : {
              id: '',
              description: '',
              durationInSecs: 0,
              project: { id: '', name: '' },
            };
    },
    closeModal() {
      this.selectedTask = null;
    },
    convertTime(time: number): string {
      return new Date(time * 1000).toISOString().substr(11, 8);
    },
  },
  computed: {
    listIsEmpty(): boolean {
      return this.tasks.length === 0;
    },
  },
  setup() {
    const store = useStore();
    const search = ref('');

    store.dispatch(ACTION_FETCH_TASKS);
    store.dispatch(ACTION_FETCH_PROJECTS);

    watchEffect(() => {
      store.dispatch(ACTION_FETCH_TASKS, search.value);
    });

    return {
      tasks: computed(() => store.state.task.tasks),
      projects: computed(() => store.state.project.projects),
      store,
      search,
    };
  },
});
</script>

<style lang="scss"></style>
