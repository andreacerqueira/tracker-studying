<template>
	<div role="list" class="flex justify-between gap-6 p-4 my-2 rounded-md shadow-md bg-gray-900 text-sm font-semibold text-white
													cursor-pointer hover:bg-gray-900/50 duration-300
													focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'AppListBox'
});
</script>