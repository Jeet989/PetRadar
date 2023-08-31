import {combineReducers} from 'redux';
import {actionAddMedicalHistory} from '../screens/addMedicalHistory/redux/addMedicalHistoryActionTypes';
import {medicalHistoryReducer} from '../screens/addMedicalHistory/redux/addMedicalHistoryReducer';
import {authReducer} from '../screens/auth/redux/authReducer';
import {petProfileReducer} from '../screens/petProfile/redux/petProfileReducer';
import { cpReducer } from "../screens/createPost/redux/cpReducer";
import { epReducer } from "../screens/editPost/redux/epReducer";
import { updateMedicalHistoryReducer } from '../screens/showMedicalHistory/redux/showMedicalHistoryReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  addMedical: medicalHistoryReducer,
  petProfile: petProfileReducer,
  createPost: cpReducer,
  editPost: epReducer,
  medicalHistory: updateMedicalHistoryReducer
});
