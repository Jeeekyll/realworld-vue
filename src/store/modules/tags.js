import tags from "../../api/tags";

export const mutatorsTypes = {
  getTagsStarted: 'tags/getTagsStarted',
  getTagsSuccess: 'tags/getTagsSuccess',
  getTagsFailure: 'tags/getTagsFailure',
}

export const actionTypes = {
  getTags: 'tags/getTags',
}

const state = {
  data: null,
  isLoading: false,
  error: null,
}

export const mutations = {
  [mutatorsTypes.getTagsStarted](state) {
    state.data = null;
    state.isLoading = true;
  },
  [mutatorsTypes.getTagsSuccess](state, payload) {
    state.data = payload;
    state.isLoading = false;
  },
  [mutatorsTypes.getTagsFailure](state) {
    state.isLoading = false;
  },
}

const actions = {
  async [actionTypes.getTags](context) {
    context.commit(mutatorsTypes.getTagsStarted);
    try {
      const response = await tags.getTags();
      context.commit(mutatorsTypes.getTagsSuccess, response.data.tags);
    } catch (e) {
      context.commit(mutatorsTypes.getTagsFailure);
    }
  }
}

export default {
  state,
  mutations,
  actions
}