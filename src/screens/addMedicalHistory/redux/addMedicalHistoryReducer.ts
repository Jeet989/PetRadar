import { MedicalHistoryState,MedicalHistoryReducer } from "./types"
import {  REQUEST_ADD_MEDICAL_HISTORY_SAGA,REQUEST_ADD_MEDICAL_HISTORY_SUCCESS,REQUEST_ADD_MEDICAL_HISTORY_REDUCER,REQUEST_ADD_MEDICAL_HISTORY_FAILURE } from "./addMedicalHistoryActionTypes";


const initialState: MedicalHistoryReducer = {
    Vetvisitdate: '',
    Symptoms: '',
    VetName:'',
    Vaccinationdate:'',
    Surgeries: '',
    Medication:'',
}

export const medicalHistoryReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case REQUEST_ADD_MEDICAL_HISTORY_SUCCESS:                       
            return {
                Vetvisitdate: action.data?.vetVisitDate,
                Symptoms: action.data?.symptoms,
                VetName: action.data?.vetName,
                Vaccinationdate: action.data?.vaccinationDate,
                Surgeries: action.data?.surgery,
                Medication: action.data?.medication,
                medicalRecordId: action.data?.medicalRecordId
            }
            
        case REQUEST_ADD_MEDICAL_HISTORY_FAILURE:
            return initialState


        default:
            return state
    }
}