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
