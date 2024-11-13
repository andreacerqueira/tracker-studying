import { Module } from 'vuex';
import http from '@/http';
import ITask from '@/interfaces/ITask';
import { State } from '@/store';
import { SET_TASKS, ADD_TASK, UPDATE_TASK } from '@/store/type-mutations';
import { ACTION_FETCH_TASKS, ACTION_CREATE_TASK, ACTION_UPDATE_TASK } from '@/store/type-actions';

export interface StateTask {
	tasks: ITask[]
}

export const task: Module<StateTask, State> = {
	state: {
		tasks: []
	},
	mutations: {
		[SET_TASKS](state, tasks: ITask[]) {
			state.tasks = tasks;
		},
		[ADD_TASK](state, task: ITask) {
			state.tasks.push(task);
		},
		[UPDATE_TASK](state, task: ITask) {
			const index = state.tasks.findIndex(t => t.id == task.id);
      state.tasks[index] = task;
		}
	},
	actions: {
		[ACTION_FETCH_TASKS]({ commit }, search: string) {
			let url = 'tasks';

			if(search) {
				url += '?description=' + search;
			}

			http.get(url)
				.then(response => commit(SET_TASKS, response.data));
		},
		[ACTION_CREATE_TASK]({ commit }, task: ITask) {
			return http.post('/tasks', task)
        .then(response => commit(ACTION_CREATE_TASK, response.data))
		},
		[ACTION_UPDATE_TASK]({ commit }, task: ITask) {
			return http.put(`/tasks/${task.id}`, task)
				.then(() => commit(ACTION_UPDATE_TASK, task));
		}
	}
}