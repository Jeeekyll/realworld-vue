import auth from "../../api/auth";
import {setItem} from "../../helpers/persistenceStorage";

const state = {
  isSubmitting: false,
  user: null,
  errors: null,
  isLoggedIn: null,
  isLoading: false,
}

export const mutationTypes = {
  registerStart: 'auth/registerStart',
  registerSuccess: 'auth/registerSuccess',
  registerFailure: 'auth/registerFailure',

  loginStart: 'auth/loginStart',
  loginSuccess: 'auth/loginSuccess',
  loginFailure: 'auth/loginFailure',

  getCurrentUserStart: 'auth/getCurrentUserStart',
  getCurrentUserSuccess: 'auth/getCurrentUserSuccess',
  getCurrentUserFailure: 'auth/getCurrentUserFailure',
}

const mutations = {
  [mutationTypes.registerStart](state) {
    state.isSubmitting = true;
    state.errors = null;
  },
  [mutationTypes.registerSuccess](state, payload) {
    state.isSubmitting = false;
    state.user = payload;
    state.isLoggedIn = true;
  },
  [mutationTypes.registerFailure](state, payload) {
    state.isSubmitting = false;
    state.errors = payload;
  },

  [mutationTypes.loginStart](state) {
    state.isSubmitting = true;
    state.errors = null;
  },
  [mutationTypes.loginSuccess](state, payload) {
    state.isSubmitting = false;
    state.user = payload;
    state.isLoggedIn = true;
  },
  [mutationTypes.loginFailure](state, payload) {
    state.isSubmitting = false;
    state.errors = payload;
  },

  [mutationTypes.getCurrentUserStart](state) {
    state.isLoading = true;
  },
  [mutationTypes.getCurrentUserSuccess](state, payload) {
    state.isLoading = false;
    state.user = payload;
    state.isLoggedIn = true;
  },
  [mutationTypes.getCurrentUserFailure](state) {
    state.isLoading = false;
    state.isLoggedIn = false;
    state.currentUser = null;
  }
}

export const actionTypes = {
  register: 'auth/register',
  login: 'auth/login',
  getCurrentUser: 'auth/getCurrentUser',
}

const getters = {
  user: state => state.user,
  isLoggedIn: state => Boolean(state.isLoggedIn),
  isAnonymous: state => state.isLoggedIn === false,
}

const actions = {
  async [actionTypes.register](context, data) {
    context.commit(mutationTypes.registerStart);
    try {
      const response = await auth.register(data);
      context.commit(mutationTypes.registerSuccess, response.data.user);
      setItem('token', response.data.user.token);
      return response.data.user;
    } catch (error) {
      context.commit(mutationTypes.registerFailure, error.response.data.errors);
    }
  },

  async [actionTypes.login](context, data) {
    context.commit(mutationTypes.loginStart);
    try {
      const response = await auth.login(data);
      context.commit(mutationTypes.loginSuccess, response.data.user);
      setItem('token', response.data.user.token);
      return response.data.user;
    } catch (error) {
      context.commit(mutationTypes.loginFailure, error.response.data.errors);
    }
  },

  async [actionTypes.getCurrentUser](context) {
    context.commit(mutationTypes.getCurrentUserStart);
    try {
      const response = await auth.getCurrentUser();
      context.commit(mutationTypes.getCurrentUserSuccess, response.data.user);
    } catch (error) {
      context.commit(mutationTypes.getCurrentUserFailure);
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
}