import Toast from "react-native-toast-message"
import { all, call, put, takeLatest } from "redux-saga/effects"
import axiosInstance from "../../../utils/API/axiosInstance"
import { createPostAPI, login } from "../../../utils/API/routes"
import { navigate } from "../../../utils/customNav/customNavigation"
import CreatePost from "../Cpost"
import { REQUEST_POST_FAILURE, REQUEST_POST_REDUCER, REQUEST_POST_SAGA, REQUEST_POST_SUCCESS } from "./actionTypes"
import { cpState } from "./types"

const requestPostAPI = async (payload: cpState) => {
    try {
        const reqObject = new FormData()

        reqObject.append('description', payload.Description)
        reqObject.append('postDate', payload.time)
        reqObject.append('latitude', payload.latitude)
        reqObject.append('longitude', payload.longitude)
        reqObject.append('image', payload.image)
        reqObject.append('userId', payload.userId)
        reqObject.append('userName', payload.userName)

        const response = await axiosInstance.post(createPostAPI, reqObject, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        return {
            res: response,
            type: REQUEST_POST_REDUCER
        }

    } catch (error) {
        if (__DEV__) console.log('error ===>', error)
        return {
            res: error,
            type: REQUEST_POST_FAILURE
        }
    }
}


function* checkpostSaga(payload: { data: cpState, type: string }): Generator<any, any, any> {
    try {
        const response = yield call(requestPostAPI, { Description: payload.data.Description, time: payload.data.time, latitude: payload.data.latitude, longitude: payload.data.longitude, image: payload.data.image, userId: payload.data.userId, userName: payload.data.userName })
        console.log(response)
        if (response.type === REQUEST_POST_REDUCER) {
            yield put({
                type: REQUEST_POST_SUCCESS,
                data: response.res.data
            })
            Toast.show({ type: 'success', text1: 'Success', text2: 'Post Created', position: 'top' })
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
    takeLatest(REQUEST_POST_SAGA, checkpostSaga)
]);