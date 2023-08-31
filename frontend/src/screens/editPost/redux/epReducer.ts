import { REQUEST_EDIT_POST_FAILURE, REQUEST_EDIT_POST_SUCCESS } from "./actionTypes";
import { epReducerData } from "./types";


const initialstate: epReducerData = {
    time: '',
    Description: '',
    postId:'',
    location:''
}

export const epReducer = (state = initialstate, action: any) => {
    switch (action.type) {
        case REQUEST_EDIT_POST_SUCCESS:
            
            return {
                Description: action.data.description,
                time: action.data.postDate,
                location:action.data.location,
                postId:action.data.postId

            }

        case REQUEST_EDIT_POST_FAILURE:
            return initialstate;
        default:
            return state
    }

}