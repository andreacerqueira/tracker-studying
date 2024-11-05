import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from 'vue'
import { ADD_TOAST } from "./type-mutations";
import IToaster from "@/interfaces/IToaster";
import { StateProject, project } from "./modules/projects";
import { StateTask, task } from "./modules/tasks";

export interface State {
	project: StateProject,
	task: StateTask,
	toasts: IToaster[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        toasts: [],
        project: {
					projects: []
        },
        task: {
					tasks: []
        }
    },
    mutations: {
        [ADD_TOAST] (state, newToast: IToaster) {

            newToast.id = new Date().getTime()
            state.toasts.push(newToast)

            setTimeout(() => {
                state.toasts = state.toasts.filter(notificacao => notificacao.id != newToast.id)
            }, 3000)
        }
    },
    modules: {
        project,
        task
    }
})

export function useStore(): Store<State> {
    return vuexUseStore(key)
}