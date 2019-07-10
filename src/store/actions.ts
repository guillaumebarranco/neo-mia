import * as types from './mutation-types';

export const getMatchingAnswer = ({ commit }: any) => {
  commit(types.GET_MATCHING_ANSWER, null);
};

export const sanitizeInstructions = ({ commit }: any, payload: any) => {
  commit(types.SANITIZE_INSTRUCTIONS, payload);
};

export const updateInstructions = ({ commit }: any, payload: any) => {
  commit(types.UPDATE_INSTRUCTIONS, payload);
};

export const getFavouritesMangasSuccess = ({ commit }: any, payload: any) => {
  commit(types.GET_FAVOURITES_MANGAS_SUCCESS, payload);
};

export const getPlaylistsSuccess = ({ commit }: any, payload: any) => {
  commit(types.GET_PLAYLISTS_SUCCESS, payload);
};

export const launchPlaylist = ({ commit }: any, payload: any) => {
  commit(types.LAUNCH_PLAYLIST, payload);
};
