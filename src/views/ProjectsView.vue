<template>
  <AppH1>Projects</AppH1>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppH1 from '../components/AppH1.vue';

export default defineComponent({
  name: 'ProjectsView',
  components: { AppH1 },
});
</script>
