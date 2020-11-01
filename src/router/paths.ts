export default [
  {
    path: '*',
    meta: {
      public: true,
    },
    redirect: {
      path: '/',
    },
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      public: true,
    },
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/stores',
    name: 'Store',
    component: () => import('../views/Stores.vue'),
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('../views/Products.vue'),
  },
  {
    path: '/',
    name: 'Users',
    component: () => import('../views/Users.vue'),
  },
]
