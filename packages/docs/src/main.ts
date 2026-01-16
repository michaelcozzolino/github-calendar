import { defineGitHubCalendar } from 'github-calendar';

import { createApp } from 'vue';
import App           from '@/App.vue';
import vueRouter     from '@/Lib/VueRouter.ts';
import '@/assets/app.css';

const app = createApp(App);

defineGitHubCalendar();

app.use(vueRouter);

app.mount('#app');
