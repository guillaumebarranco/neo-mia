import { Command } from '@/models/command';

import Vue from 'vue';
import Vuex from 'vuex';

import * as actions from './actions';
import * as getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

export interface AppState {
  instructions: string[];
  command: Command;
  currentEmotion: string;
  playlists: any[];
}

const state: AppState = {
  instructions: [],
  command: {
    content: {
      apiUrl: '',
      successMessage: '',
    },
    type: '',
    userSaid: '',
  },
  currentEmotion: 'happy',
  playlists: [],
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins: process.env.NODE_ENV !== 'production' ? [] : [],
});
