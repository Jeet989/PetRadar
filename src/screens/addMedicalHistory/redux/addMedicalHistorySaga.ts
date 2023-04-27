import { REQUEST_ADD_MEDICAL_HISTORY_SAGA, REQUEST_ADD_MEDICAL_HISTORY_SUCCESS, REQUEST_ADD_MEDICAL_HISTORY_REDUCER, REQUEST_ADD_MEDICAL_HISTORY_FAILURE } from "./addMedicalHistoryActionTypes";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { MedicalHistoryState } from "./types"
import axiosInstance from "../../../utils/API/axiosInstance";
import { addMedicalHistory } from "../../../utils/API/routes";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { navigate } from "../../../utils/customNav/customNavigation";
import { store } from "../../../redux/store";


const requestLoginAPI = async (payload: MedicalHistoryState) => {
    try {
        console.log('payload ===>', payload.Vetvisitdate.toString())
        const reqObject = new FormData();
        reqObject.append('vetVisitDate', payload.Vetvisitdate.toString());
        reqObject.append('symptoms', payload.Symptoms);
        reqObject.append('vetName', payload.VetName);
        reqObject.append('vaccinationDate', payload.Vaccinationdate.toString());
        reqObject.append('surgery', payload.Surgeries);
        reqObject.append('medication', payload.Medication);
        reqObject.append('petId', store.getState().petProfile.petId);

        const response = await axiosInstance.post(addMedicalHistory, reqObject, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return {
            res: response,
            type: REQUEST_ADD_MEDICAL_HISTORY_REDUCER
        }

    } catch (error) {
        if (__DEV__) console.log('error ===>', error)
        return {
            res: error,
            type: REQUEST_ADD_MEDICAL_HISTORY_FAILURE
        }
    }
}


function* addMedicalHistorySaga(payload: { data: MedicalHistoryState, type: string }): Generator<any, any, any> {
    try {
        console.log("function inside add medical medical saga", payload);

        const response = yield call(requestLoginAPI, { Vetvisitdate: payload.data.Vetvisitdate, Symptoms: payload.data.Symptoms, VetName: payload.data.VetName, Vaccinationdate: payload.data.Vaccinationdate, Surgeries: payload.data.Surgeries, Medication: payload.data.Medication })

        if (response.type === REQUEST_ADD_MEDICAL_HISTORY_REDUCER) {
            yield put({
                type: REQUEST_ADD_MEDICAL_HISTORY_SUCCESS,
                data: response.res.data
            })
            Toast.show({ type: 'success', text1: 'Success', text2: 'History Added Successfully', position: 'top' })
            navigate('home')
        } else {
            yield put({
                type: response.type
            })
            Toast.show({ type: 'error', text1: 'Error', text2: response.res.message, position: 'bottom' })
        }

    } catch (error: any) {
        Toast.show({ type: 'error', text1: 'Error', text2: error?.message, position: 'bottom' })
    }
}

export default all([
    takeLatest(REQUEST_ADD_MEDICAL_HISTORY_SAGA, addMedicalHistorySaga)
]);