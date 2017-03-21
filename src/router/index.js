import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'
import goods from './components/goods/goods.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
  {
    path: './goods',
    component: goods}
  ]
})
