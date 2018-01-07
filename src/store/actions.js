import * as types from './mutation-types';

export const getMatchingAnswer = ({ commit }) => {
    commit(types.GET_MATCHING_ANSWER, null);
};

export const sanitizeInstructions = ({ commit }, payload) => {
    commit(types.SANITIZE_INSTRUCTIONS, payload);
};

export const updateInstructions = ({ commit }, payload) => {
    commit(types.UPDATE_INSTRUCTIONS, payload);
};

export const getFavouritesMangasSuccess = ({ commit }, payload) => {
    commit(types.GET_FAVOURITES_MANGAS_SUCCESS, payload);
};

export const getPlaylistsSuccess = ({ commit }, payload) => {
    commit(types.GET_PLAYLISTS_SUCCESS, payload);
};

export const launchPlaylist = ({ commit }, payload) => {
    commit(types.LAUNCH_PLAYLIST, payload);
};
