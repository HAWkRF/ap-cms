import {USER_REQUEST, USER_ERROR, USER_SUCCESS, USER_LOGOUT} from './actions'
import api from '@/api/v1/user'

const state = {
  status: '',
  profile: {
    id: null,
    name: '',
    roles: [],
    permissions: [],
    available: [],

    clients: [],
    clientsParents: [],
    child: [],
    parents: [],

  }
};

const getters = {
  getProfile: state => state.profile,
  getUserId: state => state.profile ? state.profile.id : null,
  isProfileLoaded: state => !!state.profile.name,
  hasPermission: state => (permission) => {
    return state.profile.permissions.includes(permission);
  },

  withoutRight: state => {
    return state.profile.roles.length === 0;
  },
  hasOnlyClient: state => {
    return state.profile.roles.includes('client') && state.profile.roles.length === 1;
  },
  hasAvailableClients: state => (userId) => {
    return state.profile.clients.includes(userId);
  },
  hasAvailableClientsParents: state => (userId) => {
    return state.profile.clientsParents.includes(userId);
  },
  hasAvailableChild: state => (userId) => {
    return state.profile.child.includes(userId);
  },
  hasAvailableParents: state => (userId) => {
    return state.profile.parents.includes(userId);
  },
};

const actions = {
  [USER_REQUEST]: async ({commit}) => {
    commit(USER_REQUEST);
    try {
      const response = await api.profile();
      commit(USER_SUCCESS, response.data);
    } catch (error) {
      commit(USER_ERROR);
      throw error;
    }
  },
};

const mutations = {
  [USER_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [USER_SUCCESS]: (state, profile) => {
    state.status = 'success';
    state.profile = profile;
  },
  [USER_ERROR]: (state) => {
    state.status = 'error'
  },
  [USER_LOGOUT]: (state) => {
    state.profile = {}
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
}