import { DocumentPickerResponse } from "react-native-document-picker";

export interface petProfile {
    petProfilePic: DocumentPickerResponse,
    petName: string,
    petBreed: string,
    petGender: string,
    petBio: string,
    petHeight: string,
    petWeight: string,
    petAge: string,
    petSpecialMarks: string,
    isEdit?: boolean
}