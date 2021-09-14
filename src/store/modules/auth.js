import auth from "../../api/auth";
import {setItem} from "../../helpers/persistenceStorage";

const state = {
  isSubmitting: false,
  user: null,
  errors: null,
  isLoggedIn: null,
}

const mutations = {
  registerStart(state) {
    state.isSubmitting = true;
    state.errors = null;
  },
  registerSuccess(state, payload) {
    state.isSubmitting = false;
    state.user = payload;
    state.isLoggedIn = true;
  },
  registerFailure(state, payload) {
    state.isSubmitting = false;
    state.errors = payload;
  }
}

const actions = {
  async register(context, data) {
    context.commit('registerStart');
    try {
      const response = await auth.register(data);
      context.commit('registerSuccess', response.data.user);
      setItem('token', response.data.user.token);
    } catch (error) {
      context.commit('registerFailure', error.response.data.errors);
    }
  }
}

export default {
  state,
  mutations,
  actions,
}