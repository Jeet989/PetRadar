import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {all, call, put, takeLatest} from 'redux-saga/effects';
import axiosInstance from '../../../utils/API/axiosInstance';
import {
  login,
  register,
  googleLogin,
  updateProfile,
} from '../../../utils/API/routes';
import {goBack, navigate, reset} from '../../../utils/customNav/customNavigation';
import {
  REQUEST_UPDATEPROFILE_FAILURE,
  REQUEST_UPDATEPROFILE_REDUCER,
  REQUEST_UPDATEPROFILE_SAGA,
  REQUEST_UPDATEPROFILE_SUCCESS,
} from '../../userProfile/redux/userProfileActions';
import {userProfileState} from '../../userProfile/redux/types';
import {
  REQUEST_GOOGLEREGISTER_FAILURE,
  REQUEST_GOOGLEREGISTER_REDUCER,
  REQUEST_GOOGLEREGISTER_SAGA,
  REQUEST_GOOGLEREGISTER_SUCCESS,
  REQUEST_LOGIN_FAILURE,
  REQUEST_LOGIN_REDUCER,
  REQUEST_LOGIN_SAGA,
  REQUEST_LOGIN_SUCCESS,
  REQUEST_REGISTER_FAILURE,
  REQUEST_REGISTER_REDUCER,
  REQUEST_REGISTER_SAGA,
  REQUEST_REGISTER_SUCCESS,
} from './actionTypes';
import {AuthState, GoogleAuth} from './types';
import {store} from '../../../redux/store';
import {Alert} from 'react-native';
import axios from 'axios';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const requestLoginAPI = async (payload: AuthState) => {
  try {
    const reqObject = JSON.stringify({
      email: payload?.email,
      password: payload?.password,
    });
    const response = await axiosInstance.post(login, reqObject);
    return {
      res: response,
      type: REQUEST_LOGIN_REDUCER,
    };
  } catch (error) {
    if (__DEV__) console.log('error ===>', error);
    return {
      res: error,
      type: REQUEST_LOGIN_FAILURE,
    };
  }
};

function* checkLoginSaga(payload: {
  data: AuthState;
  type: string;
}): Generator<any, any, any> {
  try {
    const response = yield call(requestLoginAPI, {
      email: payload?.data?.email,
      password: payload?.data?.password,
    });
    console.log('response from requestLoginAPI ===>', response);
    if (response.type === REQUEST_LOGIN_REDUCER) {
      yield put({
        type: REQUEST_LOGIN_SUCCESS,
        data: response?.res?.data?.data,
      });
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Login Successful',
        position: 'top',
      });
      reset('home', {}, []);
    } else {
      yield put({
        type: response.type,
      });
      console.log('response ===>', response);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: response?.res?.response?.data?.data,
        position: 'bottom',
      });
    }
  } catch (error: any) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: error?.message,
      position: 'bottom',
    });
  }
}

const requestRegisterAPI = async (payload: AuthState) => {
  try {
    const reqObject = JSON.stringify({
      email: payload?.email,
      password: payload?.password,
    });

    const response = await axiosInstance.post(register, reqObject);
    console.log('resp ponse ===>', response);
    return {
      res: response,
      type: REQUEST_REGISTER_REDUCER,
    };
  } catch (error) {
    if (__DEV__) console.log('error inside requestRegisterAPI ===>', error);
    return {
      res: error,
      type: REQUEST_REGISTER_FAILURE,
    };
  }
};

function* registerDataSaga(payload: {
  data: AuthState;
  type: string;
}): Generator<any, any, any> {
  try {
    const response = yield call(requestRegisterAPI, {
      email: payload?.data?.email,
      password: payload?.data?.password,
    });
    console.log('response from registerDataSaga ===>', response);
    if (response.type === REQUEST_REGISTER_REDUCER) {
      yield put({
        type: REQUEST_REGISTER_SUCCESS,
        data: response?.res?.data?.data,
      });
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Register Successful',
        position: 'top',
      });
      reset('addUserProfile', {}, []);
    } else {
      yield put({
        type: response.type,
      });
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: response?.res?.response?.data?.data,
        position: 'bottom',
      });
    }
  } catch (error: any) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: error?.message,
      position: 'bottom',
    });
  }
}

const requestGoogleRegisterAPI = async (values: {
  email: string;
  firstname: string;
  lastname: string;
  profileurl: string | null;
  password: null;
  userId: null;
  isLogin: boolean;
}) => {
  try {
    const reqObject = JSON.stringify({
      email: values?.email,
      firstname: values?.firstname,
      lastname: values?.lastname,
      profileurl: values?.profileurl,
      password: values?.password,
      userId: values?.userId,
    });
    const response = await axiosInstance.post(
      googleLogin + '?isLogin=' + values?.isLogin,
      reqObject,
    );
    // console.log('reqObject ===>', reqObject);

    // const response = await axios.post(
    //   'http://172.17.0.208:8085/user/googleLogin?isLogin=' + values?.isLogin,
    //   reqObject,
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   },
    // );

    return {
      type: REQUEST_GOOGLEREGISTER_REDUCER,
      res: response,
    };
  } catch (error) {
    if (__DEV__)
      console.log('error inside requestGoogleRegisterAPI ===>', error);
    return {
      res: error,
      type: REQUEST_GOOGLEREGISTER_FAILURE,
    };
  }
};

function* registerGoogleSaga(payload: {
  data: GoogleAuth;
  type: string;
}): Generator<any, any, any> {
  try {
    const response = yield call(requestGoogleRegisterAPI, {
      email: payload?.data?.email,
      firstname: payload?.data?.givenName,
      lastname: payload?.data?.familyName,
      profileurl: payload?.data?.photo,
      password: null,
      userId: null,
      isLogin: payload?.data?.isLogin,
    });
    console.log(
      'response from registerGoogleSaga ===>',
      JSON.stringify(response),
    );

    // Alert.alert(
    //   'response from registerGoogleSaga ===>',
    //   JSON.stringify(response.res),
    // );
    if (response.type === REQUEST_GOOGLEREGISTER_REDUCER) {
      yield put({
        type: REQUEST_GOOGLEREGISTER_SUCCESS,
        data: response?.res?.data,
      });
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Register Successful',
        position: 'top',
      });
      payload.data.isLogin
        ? reset('home', {}, [])
        : reset('addUserProfile', {}, []);
    } else {
      yield put({
        type: REQUEST_GOOGLEREGISTER_FAILURE,
      });
      GoogleSignin.revokeAccess();
      GoogleSignin.signOut();
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: response?.res?.response?.data?.data,
        position: 'bottom',
      });
    }
  } catch (error: any) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: error?.message,
      position: 'bottom',
    });
  }
}

const requestUpdateProfileAPI = async (values: {
  firstname: string;
  lastname: string;
  userId: string;
  profileUrl: string;
  email: string;
  address: string;
  city: string;
  pinCode: string;
  phoneNumber: string;
  latitude: string;
  longitude: string;
  onesignalUserId: string;
}) => {
  try {
    let reqObject = new FormData();
    reqObject.append('firstName', values?.firstname);
    reqObject.append('lastName', values?.lastname);
    reqObject.append('userId', values?.userId);
    reqObject.append('address', values?.address);
    reqObject.append('city', values?.city);
    reqObject.append('pincode', values?.pinCode);
    reqObject.append('mobileNumber', values?.phoneNumber);
    reqObject.append('image', values?.profileUrl);
    reqObject.append('latitude', values?.latitude);
    reqObject.append('longitude', values?.longitude);
    reqObject.append('oneSignalUserId', values?.onesignalUserId);
    console.log('reqObject ===>', reqObject);

    const response = await axiosInstance.put(updateProfile, reqObject, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    });

    return {
      type: REQUEST_UPDATEPROFILE_REDUCER,
      res: response,
    };
  } catch (error) {
    return {
      res: error,
      type: REQUEST_UPDATEPROFILE_FAILURE,
    };
  }
};

function* registerUpdateProfileSaga(payload: {
  data: userProfileState;
  type: string;
}): Generator<any, any, any> {
  try {
    console.log('payload ===>', payload);
    const response = yield call(requestUpdateProfileAPI, {
      firstname: payload?.data?.firstName,
      lastname: payload?.data?.lastName,
      userId: payload?.data?.userId,
      profileUrl: payload?.data?.profileUrl,
      email: payload?.data?.email,
      address: payload?.data?.address,
      city: payload?.data?.city,
      pinCode: payload?.data?.pinCode,
      phoneNumber: payload?.data?.phoneNumber,
      latitude: payload?.data?.latitude,
      longitude: payload?.data?.longitude,
      onesignalUserId: payload?.data?.onesignalUserId,
    });
    console.log('response from registerUpdateProfileSaga ===>', response);
    if (response.type === REQUEST_UPDATEPROFILE_REDUCER) {
      yield put({
        type: REQUEST_UPDATEPROFILE_SUCCESS,
        res: response?.res?.data,
      });
      payload.data.isEdit ? goBack() : navigate('petProfile');
    } else {
      yield put({
        type: REQUEST_UPDATEPROFILE_FAILURE,
      });
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: response?.res?.response?.data?.data,
        position: 'bottom',
      });
    }
  } catch (error: any) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: error?.message,
      position: 'bottom',
    });
  }
}

export default all([
  takeLatest(REQUEST_LOGIN_SAGA, checkLoginSaga),
  takeLatest(REQUEST_REGISTER_SAGA, registerDataSaga),
  takeLatest(REQUEST_GOOGLEREGISTER_SAGA, registerGoogleSaga),
  takeLatest(REQUEST_UPDATEPROFILE_SAGA, registerUpdateProfileSaga),
]);