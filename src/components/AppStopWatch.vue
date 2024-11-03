<template>
	<section>
		<strong>{{ timePast }}</strong>
	</section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "AppStopWatch",
	props: {
		timeSec: { type: Number, default: 0 }
	},
	computed: {
		timePast() : string {
			return new Date(this.timeSec * 1000).toISOString().substr(11,8);
		}
	}
});
</script>
