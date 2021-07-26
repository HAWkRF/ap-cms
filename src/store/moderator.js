import {AUTH_SUCCESS, AUTH_ERROR, AUTH_LOGOUT, AUTH_ACCOUNT} from './modules/auth/actions'
// import {USER_REQUEST} from './modules/user/actions'
import token from '@/utils/token'
import account from '@/utils/account'

const moderator = (store) => {
    // listen to mutations
    store.subscribe((mutation) => {
        switch (mutation.type) {
            case AUTH_SUCCESS:
                token.set(mutation.payload);
                // store.dispatch(USER_REQUEST);
                break;
            case AUTH_ACCOUNT:
                account.set(mutation.payload);
                break;
            case AUTH_ERROR:
            case AUTH_LOGOUT:
                token.unset();
                break;
        }
    });
};

export default moderator;