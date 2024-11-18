<template>
  <div
    class="fixed top-0 left-0 w-full z-50 sm:w-80 sm:bottom-6 sm:top-auto sm:left-auto"
    :class="position"
  >
    <transition-group name="fade" tag="div">
      <div
        v-for="(toast, id) in toasts"
        :key="id"
        class="relative my-0 mb-5 p-5 pr-8 text-white sm:rounded-md sm:my-1 sm:p-4 sm:pr-9"
        :class="context[toast.type]"
      >
        <div class="toast-content">{{ toast.message }}</div>
        <!-- <button
									@click="removeToast(toast.id)"
									class="absolute w-8 h-8 right-1 -bottom-3
												bg-red-500 hover:bg-red-700 rounded-full
												flex items-center justify-center
												text-white 
												cursor-pointer
												sm:-right-3 sm:-top-3"
							>
									<span class="material-symbols-outlined">close</span>
							</button> -->
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';
import { TypeToaster } from '@/interfaces/IToaster';

export default defineComponent({
  name: 'AppToaster',
  props: {
    position: {
      type: String,
      default: 'sm:right-32',
    },
  },
  data() {
    return {
      context: {
        [TypeToaster.SUCCESS]: 'bg-sky-700/95',
        [TypeToaster.ERROR]: 'bg-red-700/95',
        [TypeToaster.ATTENTION]: 'bg-yellow-700/95',
      },
    };
  },
  setup() {
    const store = useStore();

    return {
      toasts: computed(() => store.state.toasts),
    };
  },
});
</script>

<style lang="scss" scoped></style>
