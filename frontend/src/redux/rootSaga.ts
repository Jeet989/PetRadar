import {all} from 'redux-saga/effects';
import addMedicalHistorySaga from '../screens/addMedicalHistory/redux/addMedicalHistorySaga';
import authSaga from '../screens/auth/redux/authSaga';
import cpSaga from '../screens/createPost/redux/cpSaga';
import epSaga from '../screens/editPost/redux/epSaga';
import petProfileSaga from '../screens/petProfile/redux/petProfileSaga';
import showMedicaLHistorySaga from '../screens/showMedicalHistory/redux/showMedicaLHistorySaga';

export function* rootSaga() {
  yield all([authSaga, addMedicalHistorySaga, petProfileSaga, cpSaga,
    epSaga,
    showMedicaLHistorySaga
  ]);
}
