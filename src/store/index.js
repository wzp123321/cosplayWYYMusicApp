import Vue from 'vue'
import Vuex from 'vuex'

import route from './moudles/route'
import tops from './moudles/tops'
import singer from './moudles/singer'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    route,
    tops,
    singer
  }
})
