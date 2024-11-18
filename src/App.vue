<template>
  <main class="relative flex h-full bg-gray-950 z-10">
    <div class="flex flex-col w-64 h-dvh bg-gray-900">
      <AppSidebar />
    </div>
    <div class="flex-1 bg-gray-800 p-12">
      <AppToaster />
      <router-view></router-view>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
// import { useToast } from 'vue-toastification';
import AppSidebar from './components/AppSidebar.vue';
import AppToaster from './components/AppToaster.vue';
type AddToastFunction = (message: string) => void;

export default defineComponent({
  name: 'App',
  components: { AppSidebar, AppToaster },
  setup() {
    const addToast = inject<AddToastFunction>('addToast');

    // Example of triggering a toast notification
    const showToast = () => {
      if (addToast) {
        addToast('This is a toast message!');
      } else {
        console.error('addToast function is not available.');
      }
    };

    // Call showToast whenever you want to display a toast
    // showToast();

    return {
      showToast,
    };
  },
});
</script>

<style lang="scss"></style>
