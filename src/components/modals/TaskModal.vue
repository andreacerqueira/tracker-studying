<template>
	<Modal title="Edit Task" :closable="closeable" :opened="focusInput">
			<template #content>
					<form @submit.prevent="create">
							<div class="mt-2">
									<input class="input w-80" name="folderName" id="folderName" v-model="folderName" ref="folderNameInputRef" placeholder="Folder name" :disabled="isCreating"/>
							</div>
							<div class="mt-2">
									<button class="btn" type="submit" :disabled="isCreating">Create</button>
							</div>
					</form>
			</template>
	</Modal>
</template>

<script setup>
import Modal from "@/components/AppModal.vue";
import { ref } from "vue";
import folders from "@/api/folders";

const closeable = ref(true);
const isCreating = ref(false);
const folderNameInputRef = ref();
const folderName = ref();

const emit = defineEmits(['created']);

function create() {
closeable.value = false;
isCreating.value = true;

folders.createFolder(folderName.value).then((data) => {
		closeable.value = true;
		isCreating.value = false;

		emit('created', data)
}).catch(() => {
		closeable.value = true;
		isCreating.value = false;

		// Handle the errors
})
}

function focusInput() {
folderNameInputRef.value.focus();
}
</script>