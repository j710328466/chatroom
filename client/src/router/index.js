import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import ChatRoom from '@/components/ChatRoom'
import NotFind from '@/components/NotFind'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    }, {
      path: '/chatroom',
      name: 'ChatRoom',
      component: ChatRoom
    }, {
      path: '/notfind',
      name: 'NotFind',
      component: NotFind
    }
  ]
})
