import { createRouter, createWebHashHistory } from 'vue-router';

import Home from '@/modules/home/Home.vue';
import TemplateRef from '@/modules/template-ref/TemplateRef.vue';
import Reactivity from '@/modules/reactivity/Reactivity.vue';

const routes = [
  { path: '/', name: 'Home', component: Reactivity },
  { path: '/template-ref', name: 'TemplateRef', component: TemplateRef },
  { path: '/reactivity', name: 'Reactivity', component: Reactivity }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;
