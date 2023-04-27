import { userProfileState } from "./types";

// action types for user profile
export const REQUEST_UPDATEPROFILE_SAGA = 'REQUEST_UPDATEPROFILE_SAGA';
export const REQUEST_UPDATEPROFILE_REDUCER = 'REQUEST_UPDATEPROFILE_REDUCER';
export const REQUEST_UPDATEPROFILE_SUCCESS = 'REQUEST_UPDATEPROFILE_SUCCESS';
export const REQUEST_UPDATEPROFILE_FAILURE = 'REQUEST_UPDATEPROFILE_FAILURE';

export const actionUpdateProfile = (payload: userProfileState) => {
    return {
        type: REQUEST_UPDATEPROFILE_SAGA,
        data: payload
    }
}