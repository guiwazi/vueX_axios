import User from './modules/user'
import Table from './modules/table'
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    user: User,
    table: Table
  }
})

export default store
