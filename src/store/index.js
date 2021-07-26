import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import auth from './modules/auth'
import layout from './modules/layout'
import locale from './modules/locale'
// import posts from './modules/posts'

import moderator from './moderator'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        layout,
        locale,
        user,
        auth,
        // posts,
    },
    plugins: [moderator],
})
