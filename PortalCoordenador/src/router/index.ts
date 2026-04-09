// ====================================================
// router/index.ts — Configuração de rotas
// ====================================================

import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import PainelView from '../views/PainelView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/painel',
      name: 'painel',
      component: PainelView,
    },
  ],
});

export default router;
