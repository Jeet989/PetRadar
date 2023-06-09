import { UpdateMedicalHistoryState } from "./types"

export const REQUEST_UPDATE_MEDICAL_HISTORY_SAGA = 'REQUEST_UPDATE_MEDICAL_HISTORY_SAGA'
export const REQUEST_UPDATE_MEDICAL_HISTORY_REDUCER = 'REQUEST_UPDATE_MEDICAL_HISTORY_REDUCER'
export const REQUEST_UPDATE_MEDICAL_HISTORY_SUCCESS = 'REQUEST_UPDATE_MEDICAL_HISTORY_SUCCESS'
export const REQUEST_UPDATE_MEDICAL_HISTORY_FAILURE = 'REQUEST_UPDATE_MEDICAL_HISTORY_FAILURE'

export const actionUpdateMedicalHistory = (payload: UpdateMedicalHistoryState) => {
    return {
        type: REQUEST_UPDATE_MEDICAL_HISTORY_SAGA,
        data: payload
    }
}