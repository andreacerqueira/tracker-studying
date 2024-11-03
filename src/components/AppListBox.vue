<template>
	<div role="list" class="flex justify-between gap-6 p-4 my-2 rounded-md shadow-md bg-gray-100 text-sm font-semibold text-gray-900">
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'AppListBox'
})
</script>