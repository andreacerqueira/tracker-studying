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
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppH1 from '@/components/AppH1.vue';
import AppActionButton from '@/components/AppActionButton.vue';

export default defineComponent({
  name: 'ProjectsView',
  components: { AppH1, AppActionButton },
});
</script>
