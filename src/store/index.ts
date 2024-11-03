import { createStore, Store, useStore as vuexUseStore } from 'vuex';
import IProject from '@/interfaces/IProject';
import IToaster from '@/interfaces/IToaster';
import { InjectionKey } from 'vue';
import { ADD_PROJECT, EDIT_PROJECT, DELETE_PROJECT, ADD_TOAST } from './type-mutations';

interface State {
	projects: IProject[],
	toasts: IToaster[]
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
	state: {
		projects: [
			// {
			// 	id: new Date().toISOString(),
			// 	name: 'TypeScript'
			// },
			// {
			// 	id: new Date().toISOString(),
			// 	name: 'Vue'
			// },
			// {
			// 	id: new Date().toISOString(),
			// 	name: 'Vuex'
			// }
		],
		toasts: [
			// {
			// 	message: 'Success notification in my toaster system.',
			// 	type: TypeToaster.SUCCESS
			// },
			// {
			// 	message: 'Error notification in my toaster system.',
			// 	type: TypeToaster.ERROR
			// },
			// {
			// 	message: 'Attention notification in my toaster system.',
			// 	type: TypeToaster.ATTENTION
			// }
		]
	},
	mutations: {
		[ADD_PROJECT](state, projectName: string) {
			const project = {
				id: new Date().toISOString(),
				name: projectName
			} as IProject
			state.projects.push(project);
		},
		[EDIT_PROJECT](state, project: IProject) {
			const index = state.projects.findIndex(proj => proj.id == project.id);
			state.projects[index] = project;
		},
		[DELETE_PROJECT](state, id: string) {
			state.projects = state.projects.filter(proj => proj.id != id);
		},
		[ADD_TOAST](state, newToast: IToaster) {
			newToast.index = new Date().getTime();
			state.toasts.push(newToast);
			setTimeout(() => {
				state.toasts = state.toasts.filter(toast => toast.index != newToast.index);
			}, 5000);
		}
	},
});

export function useStore(): Store<State> {
	return vuexUseStore(key);
}