// Base URL for the API
export const baseURL = 'http://localhost:8085/';

// Authentication routes
export const register = baseURL + 'user/register';
export const login = baseURL + 'user/login';
export const googleLogin = baseURL + 'user/googleLogin';

// updating user profile
export const updateProfile = baseURL + 'user/update';

// delete user profile
export const deleteUser = baseURL + 'user/';

//addMedical History routes
export const addMedicalHistory = baseURL + 'medical/save';

// showMedical History routes
export const showMedicalHistory = baseURL + 'user/showMedicalHistory';

//update the medical history
export const updateMedicalHistory = baseURL + 'medical/update';
export const getMedicalHistory = baseURL + 'petprofile/medical'

// adding pet profile
export const createPetProfile = baseURL + 'petprofile/create';
export const getPetProfile = baseURL + 'petprofile/get';
export const updatePetProfile = baseURL + 'petprofile/update';
export const deletePetProfile = baseURL + 'petprofile/delete';

export const createPostAPI = baseURL + 'post/create';
export const editPostAPI = baseURL + 'post/update';
export const getPostAPI = baseURL + 'post/';
export const deletePostAPI = baseURL + 'post/delete'
export const showMyPostAPI = baseURL + 'user/allPost';
