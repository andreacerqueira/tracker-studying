import { Module } from 'vuex';
import http from '@/http';
import IProject from '@/interfaces/IProject';
import { State } from '@/store';
import { SET_PROJECTS, ADD_PROJECT, UPDATE_PROJECT, REMOVE_PROJECT } from '@/store/type-mutations';
import { ACTION_FETCH_PROJECTS, ACTION_CREATE_PROJECT, ACTION_UPDATE_PROJECT, ACTION_REMOVE_PROJECT } from '@/store/type-actions';

export interface StateProject {
	projects: IProject[]
}

export const project: Module<StateProject, State> = {
	mutations: {
		[SET_PROJECTS](state, projects: IProject[]) {
			state.projects = projects;
		},
		[ADD_PROJECT](state, projectName: string) {
			const project = {
				id: new Date().toISOString(),
				name: projectName
			} as IProject
			state.projects.push(project);
		},
		[UPDATE_PROJECT](state, project: IProject) {
			const index = state.projects.findIndex(proj => proj.id == project.id);
			state.projects[index] = project;
		},
		[REMOVE_PROJECT](state, id: string) {
			state.projects = state.projects.filter(proj => proj.id != id);
		}
	},
	actions: {
		[ACTION_FETCH_PROJECTS]({ commit }) {
			http.get('projects')
				.then(response => commit(SET_PROJECTS, response.data));
		},
		[ACTION_CREATE_PROJECT](context, projectName: string) {
			return http.post('/projects', {
				name: projectName
			});
		},
		[ACTION_UPDATE_PROJECT](context, project: IProject) {
			return http.put(`/projects/${project.id}`, project);
		},
		[ACTION_REMOVE_PROJECT]({ commit }, id: string) {
			return http.delete(`/projects/${id}`)
				.then(() => commit(REMOVE_PROJECT, id));
		}
	},
	getters: {
		projects(state) {
			return state.projects;
		}
	}
};