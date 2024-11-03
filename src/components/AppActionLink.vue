<template>
  <a
    :href="href"
    :class="[
      'flex gap-2 w-fit font-bold py-2 px-4 cursor-pointer duration-300',
      linkClass
    ]"
  >
    <span v-if="icon" class="icon">
      <i :class="icon"></i>
    </span>
    <span v-if="txt">{{ txt }}</span>
  </a>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppLink",
  props: {
    icon: String,
    txt: String,
    href: {
      type: String,
      required: true
    },
    variant: {
      type: String as () => "primary" | "secondary" | "danger" | "icon",
      default: "primary"
    }
  },
  computed: {
    linkClass() {
      switch (this.variant) {
        case "primary":
          return "text-blue-500 hover:underline";
        case "danger":
          return "text-red-700 hover:underline";
        case "icon":
          return "text-red-700 hover:text-gray-500";
        default:
          return "text-gray-500 hover:underline";
      }
    }
  }
});
</script>

<style scoped>
/* Add any link-specific styling */
</style>
