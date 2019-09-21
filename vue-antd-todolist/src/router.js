import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './views/HomePage.vue'
import NewItemList from './views/NewItemList.vue'
import CompletedItemList from './views/CompletedItemList'
import UndoneItemList from './views/UndoneItemList'
import UserCentertext from './views/UserCenter'

import Login from './components/Login'
import Register from './components/Register'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [

    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/UserCentertext',
      name: 'UserCentertext',
      component : UserCentertext
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
     // component: () => import(/* webpackChunkName: "UserCenter" */ './views/UserCenter.vue')
    },
    {
      path:'/NewItemList',
      name:'NewItemList',
      component:NewItemList
    },
    {
      path:'/CompletedItemList',
      name:'CompletedItemList',
      component:CompletedItemList
    },
    {
      path:'/UndoneItemList',
      name:'UndoneItemList',
      component:UndoneItemList
    },
    {
      path: '/login',
      name: 'loginLink',
      component: Login,

    },
    {
      path: '/register',
      name: 'registerLink',
      component: Register
    },


  ]
})
