<template>
  <component
    :class="[
			'flex gap-2 w-fit font-bold py-2 px-4 cursor-pointer duration-300 focus:shadow-outline focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-400',
			buttonClass
		]"
    :is="resolvedComponent"
    :to="to"
    :type="to ? null : buttonType"
    :disabled="disabled"
    @click="emitClicked"
	>
    <span class="material-symbols-outlined" v-if="icon">{{ icon }}</span>
    <span v-if="txt">
      {{ txt }}
    </span>
  </component>
</template>

<script lang="ts">
import { defineComponent, resolveComponent, computed } from "vue";

export default defineComponent({
  name: "AppActionButton",
  emits: ["emitClicked"],
  props: {
    to: String, // Accept a 'to' prop for navigation
    icon: {
      type: String,
      required: false
    },
    txt: {
      type: String,
      required: false
    },
		buttonType: {
			type: String as () => 'button' | 'submit' | 'reset', // Strict type checking for button types
			default: 'button'
		},
    variant: {
      type: String as () => 'primary' | 'secondary' | 'danger' | 'ghost' | 'icon',
      default: 'primary'
    },
		disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    emitClicked() : void {
      if (!this.disabled) {
        this.$emit("emitClicked");
      }
    }
  },
  setup(props, { emit }) {
    const resolvedComponent = computed(() => (props.to ? resolveComponent('RouterLink') : 'button'));

    const handleClick = () => {
      if (!props.disabled && !props.to) {
        emit("emitClicked");
      }
    };

    const buttonClass = computed(() => {
      switch (props.variant) {
        case 'primary':
          return 'bg-blue-500 text-white rounded shadow hover:bg-blue-400';
        case 'secondary':
          return 'bg-orange-500 text-white rounded shadow hover:bg-gray-400';
        case 'danger':
          return 'bg-red-500 text-white rounded shadow hover:bg-red-400';
        case 'ghost':
          return 'bg-transparent text-blue-500 rounded shadow hover:bg-gray-100';
        case 'icon':
          return 'bg-transparent text-white hover:text-gray-500';
        default:
          return 'bg-blue-500 text-white rounded shadow hover:bg-blue-400';
      }
    });

    return {
      resolvedComponent,
      handleClick,
      buttonClass
    };
  }
});
</script>

<style lang="scss" scoped>

</style>