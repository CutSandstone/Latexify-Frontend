import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import NotFound from '@/pages/NotFound.vue';
import NewProject from '@/pages/NewProject.vue';
import AccountPage from '@/pages/AccountPage.vue';
import ProjectsPage from '@/pages/ProjectsPage.vue';
import CreateNewProject from '@/pages/CreateNewProject.vue';
import ProjectSettings from '@/pages/ProjectSettings.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },{
    path: '/editor',
    name: 'NewProject',
    component: NewProject
  },{
    path: '/editor/:user/:name',
    name: 'Editor',
    component: NewProject,
  },{
    path: '/account',
    name: 'Account',
    component: AccountPage,
  },{
    path: '/new',
    name: "New",
    component: CreateNewProject,
  },{
    path: '/projects',
    name: 'Projects',
    component: ProjectsPage,
  },{
    path: '/settings/:user/:name',
    name: 'ProjectSettings',
    component: ProjectSettings,
  },{
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
