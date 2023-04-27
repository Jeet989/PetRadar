import { epState } from "./types"

export const REQUEST_EDIT_POST_SAGA = 'REQUEST_EDIT_POST_SAGA'
export const REQUEST_EDIT_POST_REDUCER = 'REQUEST_EDIT_POST_REDUCER'
export const REQUEST_EDIT_POST_SUCCESS = 'REQUEST_EDIT_POST_SUCCESS'
export const REQUEST_EDIT_POST_FAILURE = 'REQUEST_EDIT_POST_FAILURE'

export const actionPost = (payload: epState) => {
    return {
        type: REQUEST_EDIT_POST_SAGA,
        data: payload
    }
}