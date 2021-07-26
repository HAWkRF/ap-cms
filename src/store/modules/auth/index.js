import {
    AUTH_REQUEST,
    AUTH_ERROR,
    AUTH_SUCCESS,
    AUTH_LOGOUT,
    AUTH_ACCOUNT
} from './actions'
import api from '@/api/v1/user'
import token from '@/utils/token'
import account from '@/utils/account'

const state = {
    token: token.get() || '',
    account: account.get() || getAccount(),//'ftko-cl',
    status: '',
    hasLoadedOnce: false,
};

function getAccount() {
    let siteUrl;
    if (window.location.hostname == 'localhost:8080' || window.location.hostname == 'localhost') {
        siteUrl = 'ftko-cl.akratoprime.ru';
    } else {
        siteUrl = window.location.hostname;
    }
    let regex = /^([a-z0-9]{1,})./gi;
    let res = regex.exec(siteUrl);
    if (res) {
        return res[1];
    }
}

const getters = {
    token: state => state.token,
    account: state => state.account,
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
};

const actions = {
    [AUTH_REQUEST]: async ({commit}, user) => {
        commit(AUTH_REQUEST);
        try {
            let siteUrl;
            if (window.location.hostname == 'localhost:8080' || window.location.hostname == 'localhost') {
                siteUrl = 'ftko-cl.akratoprime.ru';
            } else {
                siteUrl = window.location.hostname;
            }
            let regex = /^([a-z0-9]{1,})./gi;
            let res = regex.exec(siteUrl);
            if (res) {
                commit(AUTH_ACCOUNT, res[1]);
            }

            const response = await api.auth(user);
            const token = response.data.token;
            commit(AUTH_SUCCESS, token);
        } catch (error) {
            commit(AUTH_ERROR, error);
            throw error;
        }
    },
    [AUTH_LOGOUT]: async ({commit}) => {
        commit(AUTH_LOGOUT);
    }
};


const mutations = {
    [AUTH_REQUEST]: (state) => {
        state.status = 'loading'
    },
    [AUTH_ACCOUNT]: (state, account) => {
        state.account = account;
    },
    [AUTH_SUCCESS]: (state, token) => {
        state.status = 'success';
        state.token = token;
        state.hasLoadedOnce = true;
    },
    [AUTH_ERROR]: (state) => {
        state.status = 'error';
        state.hasLoadedOnce = true;
    },
    [AUTH_LOGOUT]: (state) => {
        state.token = ''
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
}