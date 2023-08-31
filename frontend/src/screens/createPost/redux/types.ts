import { DocumentPickerResponse } from "react-native-document-picker";

export interface cpState {
    Description: string, 
    time:String,
    latitude: string,
    longitude: string,
    image: DocumentPickerResponse,
    userId: string,
    userName: string
}

export interface cpthReducer {
    Description: string, 
    time:String,
    
}

export interface cpReducerData {
   postId:string,
   location:string,
    Description: string,
    time:String,
}