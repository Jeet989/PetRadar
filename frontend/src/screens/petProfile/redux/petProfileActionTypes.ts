import { petProfile } from "./types"

export const REQUEST_PETPROFILE_SAGA = 'REQUEST_PETPROFILE_SAGA'
export const REQUEST_PETPROFILE_REDUCER = 'REQUEST_PETPROFILE_REDUCER'
export const REQUEST_PETPROFILE_SUCCESS = 'REQUEST_PETPROFILE_SUCCESS'
export const REQUEST_PETPROFILE_FAILURE = 'REQUEST_PETPROFILE_FAILURE'

export const REQUEST_UPDATE_PETPROFILE_SAGA = 'REQUEST_UPDATE_PETPROFILE_SAGA'
export const REQUEST_UPDATE_PETPROFILE_REDUCER = 'REQUEST_UPDATE_PETPROFILE_REDUCER'
export const REQUEST_UPDATE_PETPROFILE_SUCCESS = 'REQUEST_UPDATE_PETPROFILE_SUCCESS'
export const REQUEST_UPDATE_PETPROFILE_FAILURE = 'REQUEST_UPDATE_PETPROFILE_FAILURE'

export const GET_PETPROFILE_SAGA = 'GET_PETPROFILE_SAGA'
export const GET_PETPROFILE_REDUCER = 'GET_PETPROFILE_REDUCER'
export const GET_PETPROFILE_SUCCESS = 'GET_PETPROFILE_SUCCESS'
export const GET_PETPROFILE_FAILURE = 'GET_PETPROFILE_FAILURE'

export const actionRequestPetProfile = (payload: petProfile) => {
    return {
        type: REQUEST_UPDATE_PETPROFILE_SAGA,
        data: payload
    }
}

export const actionPetProfile = (payload: petProfile) => {
    return {
        type: REQUEST_PETPROFILE_SAGA,
        data: payload
    }
}

export const actionGetPetProfile = (payload: petProfile) => {
    return {
        type: GET_PETPROFILE_SAGA,
        data: payload
    }
}