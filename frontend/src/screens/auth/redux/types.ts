export interface AuthState {
  email: string;
  password: string;
}

export interface AuthReducer {
  email: string;
  token: string;
  firstName: string;
  lastName: string;
  profilePic: string;
}

export interface GoogleAuth {
  email: string;
  givenName: string;
  familyName: string;
  photo: string;
  isLogin: boolean;
}

export interface AuthReducerData {
  token: string;
  firstName: string;
  lastName: string;
  email: string;
  profileUrl: string;
  address: string;
  city: string;
  phoneNumber: string;
  pinCode: string;
  userId: string;
}

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  profileUrl: string;
  address: string;
  city: string;
  phoneNumber: string;
  pinCode: string;
  userId: string;
}
