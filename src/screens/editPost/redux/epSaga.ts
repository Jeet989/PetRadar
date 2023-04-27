import Toast from "react-native-toast-message"
import { all, call, put, takeLatest } from "redux-saga/effects"
import axiosInstance from "../../../utils/API/axiosInstance"
import { editPostAPI } from "../../../utils/API/routes"
import { navigate } from "../../../utils/customNav/customNavigation"
import { REQUEST_EDIT_POST_FAILURE, REQUEST_EDIT_POST_REDUCER, REQUEST_EDIT_POST_SAGA, REQUEST_EDIT_POST_SUCCESS } from "./actionTypes"
import { epState } from "./types"

const requestPostAPI = async (payload: epState) => {
    try {
        const reqObject = JSON.stringify({
            email: payload.Description,
            password: payload.time
        })
        const response = await axiosInstance.post(editPostAPI, reqObject, {
            headers: {
                'Content-Type': 'application/json',
              },
        })

        return {
            res: response,
            type: REQUEST_EDIT_POST_REDUCER
        }

    } catch (error) {
        if (__DEV__) console.log('error ===>', error)
        return {
            res: error,
            type: REQUEST_EDIT_POST_FAILURE
        }
    }
}


function* checkpostSaga(payload: { data: epState, type: string }): Generator<any, any, any> {
    try {
        const response = yield call(requestPostAPI, { Description: payload.data.Description, time: payload.data.time })
        console.log(response)
        if (response.type === REQUEST_EDIT_POST_REDUCER) {
            yield put({
                type: REQUEST_EDIT_POST_SUCCESS,
                data: response.res.data
            })
            Toast.show({ type: 'success', text1: 'Success', text2: 'Post Edited successfully', position: 'top' })
            navigate('feed')
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
    takeLatest(REQUEST_EDIT_POST_SAGA, checkpostSaga)
]);