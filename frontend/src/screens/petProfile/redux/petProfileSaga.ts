import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { store } from '../../../redux/store';
import axiosInstance from '../../../utils/API/axiosInstance';
import { createPetProfile, updatePetProfile } from '../../../utils/API/routes';
import { goBack, navigate } from '../../../utils/customNav/customNavigation';
import {
  REQUEST_PETPROFILE_FAILURE,
  REQUEST_PETPROFILE_REDUCER,
  REQUEST_PETPROFILE_SAGA,
  REQUEST_PETPROFILE_SUCCESS,
  REQUEST_UPDATE_PETPROFILE_FAILURE,
  REQUEST_UPDATE_PETPROFILE_REDUCER,
  REQUEST_UPDATE_PETPROFILE_SAGA,
  REQUEST_UPDATE_PETPROFILE_SUCCESS,
} from './petProfileActionTypes';
import { petProfile } from './types';
import axios from 'axios';

const reqPetProfileAPI = async (payload: petProfile) => {
  try {
    let reqObject = new FormData();
    reqObject.append('petName', payload.petName);
    reqObject.append('petBreed', payload.petBreed);
    reqObject.append('gender', payload.petGender)
    reqObject.append('bio', payload.petBio);
    reqObject.append('age', payload.petAge)
    reqObject.append('petHeightInCms', payload.petHeight);
    reqObject.append('weightInLbs', payload.petWeight);
    reqObject.append('petIdentificationMarks', payload.petSpecialMarks);    //@ts-ignore
    reqObject.append('userId', store.getState().auth.userId);
    reqObject.append('image', payload.petProfilePic);

    console.log('reqObject inside reqPetProfileAPI ===>', reqObject)


    const response = await axiosInstance.post(createPetProfile, reqObject, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('response inside reqPetProfileAPI ===>', response);
    return {
      type: REQUEST_PETPROFILE_REDUCER,
      data: response,
    };
  } catch (error) {
    console.log('error inside reqPetProfieAPI ===>', error);
    return {
      type: REQUEST_PETPROFILE_FAILURE,
      data: error,
    };
  }
};

function* reqPetProfileSaga(payload: {
  data: petProfile;
  type: string;
}): Generator<any, any, any> {
  try {
    const response = yield call(reqPetProfileAPI, payload.data);

    if (response.type === REQUEST_PETPROFILE_REDUCER) {
      yield put({
        type: REQUEST_PETPROFILE_SUCCESS,
        data: response.data,
      });
      navigate('addMedlHis');
    } else {
      yield put({
        type: REQUEST_PETPROFILE_FAILURE,
      });
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: response.data.message,
        position: 'bottom',
      });
    }
  } catch (error: any) {
    console.log('error ===>', error);
  }
}

const reqUpdatePetAPI = async (payload: petProfile) => {
  try {
    let reqObject = new FormData();

    reqObject.append('petName', payload.petName)
    reqObject.append('petBreed', payload.petBreed)
    reqObject.append('gender', payload.petGender)
    reqObject.append('bio', payload.petBio)
    reqObject.append('petHeightInCms', payload.petHeight)
    reqObject.append('weightInLbs', payload.petWeight)
    reqObject.append('petIdentificationMarks', payload.petSpecialMarks)
    reqObject.append('age', payload.petAge)   //@ts-ignore
    reqObject.append('petId', payload.petId)
    reqObject.append('image', payload.petProfilePic)

    const response = await axiosInstance.put(updatePetProfile, reqObject, {
      headers: {
        'Content-Type': 'multipart/form-data',    //@ts-ignore
      }
    })

    return {
      type: REQUEST_UPDATE_PETPROFILE_REDUCER,
      data: response
    }

  } catch (error) {
    console.log('error inside reqUpdatePetAPI ===>', error)
    return {
      type: REQUEST_UPDATE_PETPROFILE_FAILURE,
      data: error
    }
  }

}

function* reqUpdatePetProfileSaga(payload: { data: petProfile, type: string }): Generator<any, any, any> {
  try {
    const response = yield call(reqUpdatePetAPI, payload.data)

    if (response.type === REQUEST_UPDATE_PETPROFILE_REDUCER) {
      yield put({
        type: REQUEST_UPDATE_PETPROFILE_SUCCESS,
        data: response.data
      })
      goBack()
    } else {
      yield put({
        type: REQUEST_UPDATE_PETPROFILE_FAILURE
      })
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: response.data.data.message,
        position: 'bottom'
      })
    }

  } catch (error: any) {
    console.log('error ===>', error)
  }
}

export default all([
  takeLatest(REQUEST_PETPROFILE_SAGA, reqPetProfileSaga),
  takeLatest(REQUEST_UPDATE_PETPROFILE_SAGA, reqUpdatePetProfileSaga)
]);