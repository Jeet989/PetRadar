import { MedicalHistoryState } from "./types"

export const REQUEST_ADD_MEDICAL_HISTORY_SAGA = 'REQUEST_ADD_MEDICAL_HISTORY_SAGA'
export const REQUEST_ADD_MEDICAL_HISTORY_REDUCER = 'REQUEST_ADD_MEDICAL_HISTORY_REDUCER'
export const REQUEST_ADD_MEDICAL_HISTORY_SUCCESS = 'REQUEST_ADD_MEDICAL_HISTORY_SUCCESS'
export const REQUEST_ADD_MEDICAL_HISTORY_FAILURE = 'REQUEST_ADD_MEDICAL_HISTORY_FAILURE'

export const actionAddMedicalHistory = (payload: MedicalHistoryState) => {
    return {
        type: REQUEST_ADD_MEDICAL_HISTORY_SAGA,
        data: payload
    }
}



