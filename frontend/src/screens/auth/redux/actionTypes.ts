import {AuthState, GoogleAuth} from './types';

export const REQUEST_LOGIN_SAGA = 'REQUEST_LOGIN_SAGA';
export const REQUEST_LOGIN_REDUCER = 'REQUEST_LOGIN_REDUCER';
export const REQUEST_LOGIN_SUCCESS = 'REQUEST_LOGIN_SUCCESS';
export const REQUEST_LOGIN_FAILURE = 'REQUEST_LOGIN_FAILURE';

export const REQUEST_REGISTER_SAGA = 'REQUEST_REGISTER_SAGA';
export const REQUEST_REGISTER_REDUCER = 'REQUEST_REGISTER_REDUCER';
export const REQUEST_REGISTER_SUCCESS = 'REQUEST_REGISTER_SUCCESS';
export const REQUEST_REGISTER_FAILURE = 'REQUEST_REGISTER_FAILURE';

export const REQUEST_GOOGLEREGISTER_SAGA = 'REQUEST_GOOGLEREGISTER_SAGA';
export const REQUEST_GOOGLEREGISTER_REDUCER = 'REQUEST_GOOGLEREGISTER_REDUCER';
export const REQUEST_GOOGLEREGISTER_SUCCESS = 'REQUEST_GOOGLEREGISTER_SUCCESS';
export const REQUEST_GOOGLEREGISTER_FAILURE = 'REQUEST_GOOGLEREGISTER_FAILURE';

export const REQUEST_LOGOUT_REDUCER = 'REQUEST_LOGOUT_REDUCER';

export const actionGoogleLogin = (payload: GoogleAuth) => {
  return {
    type: REQUEST_GOOGLEREGISTER_SAGA,
    data: payload,
  };
};

export const actionLogin = (payload: AuthState) => {
  return {
    type: REQUEST_LOGIN_SAGA,
    data: payload,
  };
};

export const actionRegister = (payload: AuthState) => {
  return {
    type: REQUEST_REGISTER_SAGA,
    data: payload,
  };
};

export const actionLogout = () => {
  return {
    type: REQUEST_LOGOUT_REDUCER,
  };
};
