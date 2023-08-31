import { REQUEST_UPDATE_MEDICAL_HISTORY_FAILURE, REQUEST_UPDATE_MEDICAL_HISTORY_SUCCESS } from "./showMedicalHistoryActionTypes"
import { UpdateMedicalHistoryState, UpdateMedicalHistoryReducer } from "./types"



const initialState: UpdateMedicalHistoryReducer = {
    Vetvisitdate: '',
    Symptoms: '',
    VetName: '',
    Vaccinationdate: '',
    Surgeries: '',
    Medication: '',
}

export const updateMedicalHistoryReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case REQUEST_UPDATE_MEDICAL_HISTORY_SUCCESS:
            return {
                Vetvisitdate: action.data?.vetVisitDate,
                Symptoms: action.data?.symptoms,
                VetName: action.data?.vetName,
                Vaccinationdate: action.data?.vaccinationDate,
                Surgeries: action.data?.surgery,
                Medication: action.data?.medication,
                medicalRecordId: action.data?.medicalRecordId
            }

        case REQUEST_UPDATE_MEDICAL_HISTORY_FAILURE:
            return initialState


        default:
            return state
    }
}