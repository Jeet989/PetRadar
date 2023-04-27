import {REQUEST_LOGOUT_REDUCER} from '../../auth/redux/actionTypes';
import {User} from '../../auth/redux/types';
import {
  REQUEST_PETPROFILE_FAILURE,
  REQUEST_PETPROFILE_SUCCESS,
  REQUEST_UPDATE_PETPROFILE_SUCCESS,
} from './petProfileActionTypes';

const initialPetProfileState: {
  allergies: string;
  bio: string;
  gender: string;
  petBreed: string;
  petHeightInCms: string;
  petId: string;
  petIdentificationMarks: string;
  petName: string;
  petQrImage: string;
  weightInLbs: string;
  user: User;
  age: string;
  petImage: string;
} = {
  allergies: '',
  bio: '',
  gender: '',
  petBreed: '',
  petHeightInCms: '',
  petId: '',
  petIdentificationMarks: '',
  petName: '',
  petQrImage: '',
  weightInLbs: '',
  age: '',
  petImage: '',
  user: {
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    profileUrl: '',
    address: '',
    city: '',
    phoneNumber: '',
    pinCode: '',
  },
};

export const petProfileReducer = (
  state = initialPetProfileState,
  action: any,
) => {
  switch (action.type) {
    case REQUEST_PETPROFILE_SUCCESS:
      return {
        allergies: action.data.data.data.PetDetails?.allergies,
        bio: action.data.data.data.PetDetails?.bio,
        gender: action.data.data.data.PetDetails?.gender,
        petBreed: action.data.data.data.PetDetails?.petBreed,
        petHeightInCms: action.data.data.data.PetDetails?.petHeightInCms,
        petId: action.data.data.data.PetDetails?.petId,
        petIdentificationMarks:
          action.data.data.data.PetDetails?.petIdentificationMarks,
        petName: action.data.data.data.PetDetails?.petName,
        petQrImage: action.data.data.data.PetDetails?.petQrImage,
        weightInLbs: action.data.data.data.PetDetails?.weightInLbs,
        user: action.data.data.data.PetDetails?.user,
      };

    case REQUEST_PETPROFILE_FAILURE:
      return initialPetProfileState;

    case REQUEST_LOGOUT_REDUCER:
      return initialPetProfileState;

    case REQUEST_UPDATE_PETPROFILE_SUCCESS:
      return {
        allergies: action.data.data.data.PetDetails?.allergies,
        bio: action.data.data.data.PetDetails?.bio,
        gender: action.data.data.data.PetDetails?.gender,
        petBreed: action.data.data.data.PetDetails?.petBreed,
        petHeightInCms: action.data.data.data.PetDetails?.petHeightInCms,
        petId: action.data.data.data.PetDetails?.petId,
        petIdentificationMarks:
          action.data.data.data.PetDetails?.petIdentificationMarks,
        petName: action.data.data.data.PetDetails?.petName,
        petQrImage: action.data.data.data.PetDetails?.petQrImage,
        weightInLbs: action.data.data.data.PetDetails?.weightInLbs,
        user: action.data.data.data.PetDetails?.user,
        age: action.data.data.data.PetDetails?.age,
        petImage: action.data.data.data.PetDetails?.imageUrl,
      }

    default:
      return state;
  }
};
