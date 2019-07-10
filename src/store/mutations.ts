import Vue from 'vue';
import * as types from './mutation-types';
import {
  cleanCommand,
  searchForMatchingAnswers,
  playPlaylist,
} from '../services/BrainService';

export default {
  [types.SANITIZE_INSTRUCTIONS](state) {
    sanitizeInstructions(state);
  },

  [types.UPDATE_INSTRUCTIONS](state, instructions) {
    updateInstructions(state, instructions);
  },

  [types.GET_MATCHING_ANSWER](state, instructions) {
    getMatchingAnswer(state, instructions);
  },

  [types.GET_FAVOURITES_MANGAS_SUCCESS](state, data) {
    getFavouritesMangasSuccess(state, data);
  },

  [types.GET_PLAYLISTS_SUCCESS](state, data) {
    getPlaylistsSuccess(state, data);
  },

  [types.LAUNCH_PLAYLIST](state, data) {
    launchPlaylist(state, data);
  },
};

function sanitizeInstructions(state) {
  const sanitizedInstructions = state.instructions.map(i => cleanCommand(i));

  state.instructions.forEach((instruction, i) =>
    Vue.set(state.instructions, i, sanitizedInstructions[i])
  );
}

function updateInstructions(state, instructions) {
  instructions.forEach((instruction, i) =>
    Vue.set(state.instructions, i, instruction)
  );
}

function getMatchingAnswer(state) {
  searchForMatchingAnswers(state.instructions, state.currentEmotion)
    .then(commandFound => {
      console.log('commandFound', commandFound);

      Vue.set(state.command, 0, commandFound);
    })
    .catch(err => {
      console.log('err get matching answer', err);
    });
}

function getFavouritesMangasSuccess(state, options) {
  const result = options.data.join(', ');

  Vue.set(state.command, 0, {
    content: `${options.successMessage} ${result}`,
    type: 'audio',
  });
}

function getPlaylistsSuccess(state, playlists) {
  playlists.forEach((playlist, i) => Vue.set(state.playlists, i, playlist));
}

function launchPlaylist(state, playlistId) {
  playPlaylist(playlistId);
}
