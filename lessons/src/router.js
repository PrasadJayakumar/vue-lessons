import { createRouter, createWebHashHistory } from 'vue-router';

import Home from '@/modules/home/Home.vue';
import TemplateRef from '@/modules/template-ref/TemplateRef.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/template-ref', name: 'TemplateRef', component: TemplateRef }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;
