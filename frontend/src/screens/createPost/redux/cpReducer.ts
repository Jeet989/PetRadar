import { REQUEST_POST_FAILURE, REQUEST_POST_SUCCESS } from "./actionTypes";
import { cpReducerData } from "./types";


const initialstate: cpReducerData = {
    time: '',
    Description: '',
    postId:'',
    location:''
}

export const cpReducer = (state = initialstate, action: any) => {
    switch (action.type) {
        case REQUEST_POST_SUCCESS:
            
            return {
                Description: action.data.description,
                time: action.data.postDate,
                location:action.data.location,
                postId:action.data.postId

            }

        case REQUEST_POST_FAILURE:
            return initialstate;
        default:
            return state
    }

}