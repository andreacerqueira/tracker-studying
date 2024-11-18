<template>
  <header class="flex items-center gap-4 p-4 min-h-[4.4rem] bg-gray-800/50">
    <img src="../assets/logo-andrea-amado.svg" />
    Tasks
  </header>
  <nav class="p-4 border-t-[1px] border-gray-800">
    <ul class="flex flex-col gap-2">
      <li>
        <router-link to="/">
          <font-awesome-icon :icon="['fas', 'list-check']" />
          Tasks
        </router-link>
      </li>
      <li>
        <router-link to="/projects">
          <font-awesome-icon :icon="['fas', 'folder-tree']" />
          Projects
        </router-link>
      </li>
      <li>
        <router-link to="/settings">
          <font-awesome-icon :icon="['fas', 'gear']" />
          Settings
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppSidebar',
  // setup() {},
});
</script>

<style lang="scss" scoped></style>
