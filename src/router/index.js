import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import LatexEditor from '@/pages/LatexEditor.vue';
import NotFound from '@/pages/NotFound.vue';
import NewProject from '@/components/NewProject.vue';

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
    path: '/editor/:id',
    name: 'Editor',
    component: LatexEditor,
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
