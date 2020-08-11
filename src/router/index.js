import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../views/HomePage.vue';
import GamesPage from '../views/GamesPage.vue';
import PlayersPage from '../views/PlayersPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/games',
    name: 'Games',
    component: GamesPage,
  },
  {
    path: '/players',
    name: 'Players',
    component: PlayersPage,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
