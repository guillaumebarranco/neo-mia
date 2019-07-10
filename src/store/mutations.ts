import { Command } from '@/models/command';

import Vue from 'vue';

import { cleanCommand, playPlaylist, searchForMatchingAnswers } from '../services/BrainService';
import { AppState } from './';
import * as types from './mutation-types';

export default {
  [types.SANITIZE_INSTRUCTIONS](state: AppState) {
    sanitizeInstructions(state);
  },

  [types.UPDATE_INSTRUCTIONS](state: AppState, instructions: string[]) {
    updateInstructions(state, instructions);
  },

  [types.GET_MATCHING_ANSWER](state: AppState) {
    getMatchingAnswer(state);
  },

  [types.GET_FAVOURITES_MANGAS_SUCCESS](state: AppState, data: any) {
    getFavouritesMangasSuccess(state, data);
  },

  [types.GET_PLAYLISTS_SUCCESS](state: AppState, data: any) {
    getPlaylistsSuccess(state, data);
  },

  [types.LAUNCH_PLAYLIST](state: AppState, data: any) {
    launchPlaylist(state, data);
  },
};

function sanitizeInstructions(state: AppState) {
  const sanitizedInstructions = state.instructions.map((i: string) =>
    cleanCommand(i)
  );

  state.instructions.forEach((instruction: any, i: any) =>
    Vue.set(state.instructions, i, sanitizedInstructions[i])
  );
}

function updateInstructions(state: AppState, instructions: string[]) {
  console.log('instructions', instructions);

  instructions.forEach((instruction: string, i: number) =>
    Vue.set(state.instructions, i, instruction)
  );
}

function getMatchingAnswer(state: AppState) {
  searchForMatchingAnswers(state.instructions, state.currentEmotion)
    .then((commandFound: Command) => {
      Vue.set(state.command, 0, commandFound);
    })
    .catch((err: any) => {
      console.log('err get matching answer', err);
    });
}

function getFavouritesMangasSuccess(state: AppState, options: any) {
  const result = options.data.join(', ');

  Vue.set(state.command, 0, {
    content: `${options.successMessage} ${result}`,
    type: 'audio',
  });
}

function getPlaylistsSuccess(state: AppState, playlists: any) {
  playlists.forEach((playlist: any, i: any) =>
    Vue.set(state.playlists, i, playlist)
  );
}

function launchPlaylist(state: AppState, playlistId: any) {
  playPlaylist(playlistId);
}
