<template>
  <h1
    class="flex flex-row items-center gap-2 text-3xl mx-0 -mt-[3rem] mb-8 min-h-[4.6rem] border-t-0 border-r-0 border-b border-l-0 border-gray-700"
  >
    <slot></slot>
    <slot name="dir"></slot>
  </h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppH1',
});
</script>
