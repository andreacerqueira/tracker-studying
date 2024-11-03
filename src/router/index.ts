import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import TasksView from '../views/TasksView.vue';
import ProjectsView from '../views/ProjectsView.vue';
import SettingsView from '../views/SettingsView.vue';
import ProjectsFormView from '../views/projects/ProjectsFormView.vue';
import ListView from '@/views/projects/ListView.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Tasks',
		component: TasksView
	},
	{
		path: '/projects',
		component: ProjectsView,
		children: [
			{
				path: '',
				name: 'Projects',
				component: ListView
			},
			{
				path: 'new',
				name: 'New Project',
				component: ProjectsFormView
			},
			{
				path: ':id',
				name: 'Edit Project',
				component: ProjectsFormView,
				props: true
			}
		]
	},
	{
		path: '/settings',
		name: 'Settings',
		component: SettingsView
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
