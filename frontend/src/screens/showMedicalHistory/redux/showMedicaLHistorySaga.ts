import { all, call, put, takeLatest } from "redux-saga/effects";
import { UpdateMedicalHistoryState } from "./types"
import axiosInstance from "../../../utils/API/axiosInstance";
import { updateMedicalHistory } from "../../../utils/API/routes";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { goBack, navigate } from "../../../utils/customNav/customNavigation";
import { REQUEST_UPDATE_MEDICAL_HISTORY_FAILURE, REQUEST_UPDATE_MEDICAL_HISTORY_REDUCER, REQUEST_UPDATE_MEDICAL_HISTORY_SAGA, REQUEST_UPDATE_MEDICAL_HISTORY_SUCCESS } from "./showMedicalHistoryActionTypes";


const requestLoginAPI = async (payload: UpdateMedicalHistoryState) => {
    console.log('Calling the update  api----', payload)
    try {
        const reqObject = new FormData();
        reqObject.append("vetVisitDate", payload.Vetvisitdate.toString())
        reqObject.append("symptoms", payload.Symptoms)
        reqObject.append("vetName", payload.VetName)
        reqObject.append('vaccinationDate', payload.Vaccinationdate.toString())
        reqObject.append('surgery', payload.Surgeries)
        reqObject.append("medication", payload.Medication)
        reqObject.append("medicalRecordId", payload.medicalRecordId)

        const response = await axiosInstance.put(updateMedicalHistory, reqObject, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return {
            res: response,
            type: REQUEST_UPDATE_MEDICAL_HISTORY_REDUCER
        }

    } catch (error) {
        if (__DEV__) console.log('error ===>', error)
        return {
            res: error,
            type: REQUEST_UPDATE_MEDICAL_HISTORY_FAILURE
        }
    }
}


function* updateMedicalHistorySaga(payload: { data: UpdateMedicalHistoryState, type: string }): Generator<any, any, any> {
    try {
        console.log("function inside update medical History saga", payload);

        const response = yield call(requestLoginAPI, { Vetvisitdate: payload.data.Vetvisitdate, Symptoms: payload.data.Symptoms, VetName: payload.data.VetName, Vaccinationdate: payload.data.Vaccinationdate, Surgeries: payload.data.Surgeries, Medication: payload.data.Medication, medicalRecordId: payload.data.medicalRecordId })

        if (response.type === REQUEST_UPDATE_MEDICAL_HISTORY_REDUCER) {
            yield put({
                type: REQUEST_UPDATE_MEDICAL_HISTORY_SUCCESS,
                data: response.res.data
            })
            Toast.show({ type: 'success', text1: 'Success', text2: 'Update Successful', position: 'top' })
            goBack()
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
    takeLatest(REQUEST_UPDATE_MEDICAL_HISTORY_SAGA, updateMedicalHistorySaga)
]);