import Vue from 'vue'
import Vuex from 'vuex'
import resource from './modules/resource'
import home from './modules/home'
import user from './modules/user'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
    modules: {
       resource,
       home,
       user
    },
    strict: debug
})
