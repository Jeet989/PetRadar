import { cpState } from "./types"

export const REQUEST_POST_SAGA = 'REQUEST_POST_SAGA'
export const REQUEST_POST_REDUCER = 'REQUEST_POST_REDUCER'
export const REQUEST_POST_SUCCESS = 'REQUEST_POST_SUCCESS'
export const REQUEST_POST_FAILURE = 'REQUEST_POST_FAILURE'

export const actionPost = (payload: cpState) => {
    return {
        type: REQUEST_POST_SAGA,
        data: payload
    }
}