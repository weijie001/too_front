import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

// 引入子模块
import tab from './modules/tab'
const store = new vuex.Store({
    modules: {
        tab: tab
    }
})

export default store