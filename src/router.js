import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue'),
    },
    /**
     * Protected Application Routes
     */
    {
      path: '/dashboard',
      name: 'dashboard',
      secure: true,
      component: () => import('./views/dashboard/Dashboard.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  // Look at all routes
  router.options.routes.forEach((route) => {
    if (to.matched[0].path === route.path && route.secure) {
      if (!localStorage.access_token) {
        return next('/');
      }
    }

    // Proceed as normal
    return next();
  });
});

export default router;
