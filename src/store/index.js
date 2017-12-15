import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as actions from './actions';
import mutations from './mutations';
// import createLogger from '../../../src/plugins/logger';

Vue.use(Vuex);

const state = {
    instructions: [],
    command: {},
    currentEmotion: 'happy'
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    plugins: process.env.NODE_ENV !== 'production'
    ? [/* createLogger() */]
    : [],
});
