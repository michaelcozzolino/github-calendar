import type { RouteRecordRaw }            from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';

const homeRoute: Readonly<RouteRecordRaw> = {
    name:      Symbol('home'),
    path:      '',
    component: () => import('@/Components/HomePage.vue'),
};

const vueRouter = createRouter({
    history: createWebHistory(),
    routes:  [homeRoute],
});

export default vueRouter;
