import { Field, Formik } from 'formik';
import React, { useState } from 'react';
import { Keyboard, Platform, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';

import Background from '../../components/Background';
import CButton from '../../components/CButton';
import FTextInput from '../../components/FTextInput';
import Colors from '../../utils/Colors/Colors';
import { actionAddMedicalHistory } from './redux/addMedicalHistoryActionTypes';
import CDateTimePicker from '../../components/CDateTimePicker';


interface Props { }

const AddMedicalHistory: React.FC<Props> = (props: Props) => {

    const dispatch = useDispatch()
    const [date, setDat] = useState()
    const [date2, setDate] = useState()
    const whenItOccuredRef = React.useRef<TextInput>(null)
    const VetNameRef = React.useRef<TextInput>(null)
    const DescriptionRef = React.useRef<TextInput>(null)
    const vaccinationDateRef = React.useRef<TextInput>(null)
    const AllergiesRef = React.useRef<TextInput>(null)
    const SurgeriesRef = React.useRef<TextInput>(null)
    const MedicationRef = React.useRef<TextInput>(null)


    

    const onSubmit = ({  Symptoms, VetName, Surgeries, Medication }: { Vetvisitdate: string, Symptoms: string, VetName: string, Vaccinationdate: string, Surgeries: string, Medication: string}) => {
        Keyboard.dismiss();
        console.log(date, Symptoms, VetName, date2, Surgeries, Medication, date)
        dispatch(actionAddMedicalHistory({Vetvisitdate:date,Symptoms,VetName,Vaccinationdate:date,Surgeries,Medication}))
        // dispatch(actionAddMedicalHistory())
    }

    const validateValues = ({  Symptoms, VetName, Surgeries, Medication }: { Vetvisitdate: string, Symptoms: string, VetName: string, Vaccinationdate: string, Surgeries: string, Medication: string}) => {
        const errors: { Vetvisitdate?:string, Symptoms?: string, VetName?: string, Surgeries?: string, Medication?: string } = {}


        
        function handleDateSelection(Vetvisitdate: string) {
            const selectedDateTime = new Date(Vetvisitdate).getTime();
            const currentDateTime = new Date().getTime();
            
            if (selectedDateTime > currentDateTime) {
              errors.Vetvisitdate= "You cannot select a date in the future.";
              // Alternatively, you can show an error message to the user
            } 
          }

        if (!Symptoms) {
            errors.Symptoms = 'Symptoms is required'
        }
        
        if (!VetName) {
            errors.VetName = 'VetName is required'
        }

        
        if (!Surgeries) {
            errors.Surgeries = 'Surgeries is required'
        }

        if (!Medication) {
            errors.Medication = 'Medication is required'
        }

        return errors
    }



    return (
        <SafeAreaView style={styles.container}>
            <Background />
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.createProfile}>Add medical history</Text>

                <View style={styles.contentView}>
                 
                  

                    {/* View for adding pets medical history details */}
                    <View>
                        <Formik
                            initialValues={{ Symptoms: '', VetName: '', Surgeries: '', Medication: '' }}
                            onSubmit={onSubmit}
                            validate={validateValues}
                        >
                            {({ handleSubmit }) => (
                                <View style={styles.formView}>

                                    <CDateTimePicker title='Vet Visit Date' returnData={(val) => setDat(val)}  />                               
 
                                    <Field
                                        name={"Symptoms"}
                                        placeholder={"Symptoms"}
                                        component={FTextInput}
                                        innerRef={whenItOccuredRef}
                                        onSubmitEditing={() => VetNameRef.current?.focus()}
                                        returnKeyType={'next'}
                                    />

                                    <Field
                                        name={"VetName"}
                                        placeholder={"VetName"}
                                        component={FTextInput}
                                        innerRef={VetNameRef}
                                        keyboardType={'email-address'}
                                        returnKeyType={'next'}
                                    />

                                    <CDateTimePicker returnData={(val) => setDate(val)} title='Vaccination Date'/>                               

        
                                    <Field
                                        name={"Surgeries"}
                                        placeholder={"Surgeries"}
                                        component={FTextInput}
                                        innerRef={SurgeriesRef}
                                        onSubmitEditing={() => MedicationRef.current?.focus()}
                                        returnKeyType={'done'}
                                        maxLength={10}
                                    />

                                    <Field
                                        name={"Medication"}
                                        placeholder={"Medication"}
                                        component={FTextInput}
                                        innerRef={MedicationRef}
                                        onSubmitEditing={handleSubmit}
                                        returnKeyType={'done'}
                                        maxLength={10}
                                    />


                                    <CButton
                                        title="Save and Next"
                                        onPress={handleSubmit}
                                        containerStyle={{}}
                                    />


                                </View>
                            )}
                        </Formik>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    formView: {
        flex: 1,
        marginHorizontal: 25
    },
    userImage: {
        width: 150,
        height: 150,
        borderRadius: 75
    },
    imageView: {
        alignItems: 'center',
        marginBottom: 21
    },
    penView: {
        backgroundColor: Colors.primary,
        width: 45,
        height: 45,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        left: 230
    },
    input: {
        borderColor: Colors.borderColor,
        borderWidth: 1,
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        paddingHorizontal: 22,
        borderRadius: 30,
        color: Colors.black,
        height: Platform.OS === 'ios' ? 50 : 52,
        marginBottom: 21
    },
    contentView: {
        flex: 1,
        paddingBottom: 20
    },
    createProfile: {
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
        color: Colors.black,
        textAlign: 'center',
        paddingVertical: 20
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})

export default AddMedicalHistory;