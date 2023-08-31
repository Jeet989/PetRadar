import {
  REQUEST_UPDATEPROFILE_FAILURE,
  REQUEST_UPDATEPROFILE_SUCCESS,
} from '../../userProfile/redux/userProfileActions';
import {
  REQUEST_GOOGLEREGISTER_FAILURE,
  REQUEST_GOOGLEREGISTER_SUCCESS,
  REQUEST_LOGIN_FAILURE,
  REQUEST_LOGIN_SUCCESS,
  REQUEST_LOGOUT_REDUCER,
  REQUEST_REGISTER_FAILURE,
  REQUEST_REGISTER_SUCCESS,
} from './actionTypes';
import {AuthReducerData} from './types';

const initialState: AuthReducerData = {
  email: '',
  token: '',
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  phoneNumber: '',
  pinCode: '',
  profileUrl: '',
  userId: '',
};

export const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case REQUEST_LOGIN_SUCCESS:
      return {
        token: action.data.token,
        email: action.data.user.email,
        firstName: action.data.user.firstName,
        lastName: action.data.user.lastName,
        profilePic: action.data.user.imageUrl,
        address: action.data.user.address,
        city: action.data.user.city,
        phoneNumber: action.data.user.phoneNumber,
        pinCode: action.data.user.pincode,
        userId: action.data.user.userId,
      };

    case REQUEST_LOGIN_FAILURE:
      return initialState;

    case REQUEST_REGISTER_SUCCESS:
      return {
        token: action.data.token,
        email: action.data.user.email,
        firstName: action.data.user.firstName,
        lastName: action.data.user.lastName,
        profileUrl: action.data.user.profilePic,
        address: action.data.user.address,
        city: action.data.user.city,
        phoneNumber: action.data.user.phoneNumber,
        pinCode: action.data.user.pinCode,
        userId: action.data.user.userId,
      };

    case REQUEST_GOOGLEREGISTER_SUCCESS:
      console.log('action ==>', action);
      return {
        email: action.data?.data?.user?.email,
        token: action.data.data.token,
        firstName: action.data?.data?.user?.firstName,
        lastName: action.data?.data?.user?.lastName,
        profilePic: action.data?.data?.user?.imageUrl,
        address: action.data?.data?.user?.address,
        city: action.data?.data?.user?.city,
        phoneNumber: action.data?.data?.user?.phoneNumber,
        pinCode: action.data?.data?.user?.pincode,
        userId: action.data?.data?.user?.userId,
      };

    case REQUEST_GOOGLEREGISTER_FAILURE:
      return initialState;

    case REQUEST_REGISTER_FAILURE:
      return initialState;

    case REQUEST_UPDATEPROFILE_SUCCESS:
      return {
        ...state,
        firstName: action.res.data.user.firstName,
        lastName: action.res.data.user.lastName,
        address: action.res.data.user.address,
        city: action.res.data.user.city,
        phoneNumber: action.res.data.user.phoneNumber,
        pinCode: action.res.data.user.pincode,
        profilePic: action.res.data.user.imageUrl,
      };

    case REQUEST_UPDATEPROFILE_FAILURE:
      return {
        ...state,
      };

    case REQUEST_LOGOUT_REDUCER:
      return initialState;

    default:
      return state;
  }
};
