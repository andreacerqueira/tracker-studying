<template>
	<transition name="fade">
		<div class="flex items-stretch absolute w-full h-full z-50 left-0 top-0" v-if="isOpen">
			<div
				@click="onToggle"
				class="fixed bg-black/80 left-0 top-0 inset-0 z-0"
			></div>
			<div class="self-center left-0 top-0 w-full max-w-lg p-4 relative mx-auto my-auto rounded-xl shadow-lg bg-gray-900">
				<div class="text-center flex-auto justify-center leading-6">
					<h2 class="text-2xl font-bold py-4">
						<slot name="header">Dummy header</slot>
					</h2>
					<p class="text-md text-gray-500 px-8">
						<slot name="body">Do you really want to exit without saving your work?</slot>
					</p>
				</div>
				<div class="flex flex-row justify-end gap-2 pt-4 mt-4 border-t-2 border-gray-800">
					<slot name="footer">
						<button
							class="flex gap-2 w-fit font-bold py-2 px-4 cursor-pointer duration-300 focus:shadow-outline focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-400 bg-blue-500 text-white rounded shadow hover:bg-blue-400"
						>
							Save
						</button>
						<button
							@click="onToggle"
							class="flex gap-2 w-fit font-bold py-2 px-4 cursor-pointer duration-300 focus:shadow-outline focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-400 bg-blue-500/20 text-white rounded shadow hover:bg-blue-400/40"
						>
							Close
						</button>
					</slot>
				</div>
			</div>
		</div>
	</transition>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue';

export default defineComponent({
	name: 'AppModal',
  props: {
		isOpen: {
			type: Boolean,
			required: true
		}
	},
	emits: ['close'],
	methods: {
		onToggle() {
			this.$emit("close");
		},
		handleKeydown(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				this.$emit("close");
			}
		}
	},
	mounted() {
		window.addEventListener('keydown', this.handleKeydown);
	},
	unmounted() {
		window.removeEventListener('keydown', this.handleKeydown);
	}
});
</script>

<style>
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 500ms ease-out;
}
</style>