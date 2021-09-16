import feed from "../../api/feed";

const state = {
  data: null,
  isLoading: false,
  error: null,
}

export const mutationTypes = {
  getFeedStart: 'feed/getFeedStart',
  getFeedSuccess: 'feed/getFeedSuccess',
  getFeedFailure: 'feed/getFeedFailure',
}

export const actionTypes = {
  getFeed: 'feed/getFeed',
}

const mutations = {
  [mutationTypes.getFeedStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.getFeedSuccess](state, payload) {
    state.data = payload;
    state.isLoading = false;
  },
  [mutationTypes.getFeedFailure](state) {
    state.isLoading = false;
  }
}

const actions = {
  async [actionTypes.getFeed](context, {apiUrl}) {
    context.commit(mutationTypes.getFeedStart);
    try {
      const response = await feed.getFeed(apiUrl);
      context.commit(mutationTypes.getFeedSuccess, response.data);
      return response.data;
    } catch (e) {
      context.commit(mutationTypes.getFeedFailure);
    }
  },
}

export default {
  state,
  mutations,
  actions
}