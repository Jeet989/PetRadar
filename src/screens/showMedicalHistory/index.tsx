import { Field, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Keyboard, Platform, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from "react-redux";

import Background from '../../components/Background';
import CButton from '../../components/CButton';
import FTextInput from '../../components/FTextInput';
import Colors from '../../utils/Colors/Colors';
import CDateTimePicker from '../../components/CDateTimePicker';
import axiosInstance from '../../utils/API/axiosInstance';
// import { getMedicalHistory, getPetProfile } from '../../utils/API/routes';
import { store } from '../../redux/store';
import { getMedicalHistory } from '../../utils/API/routes';
import { actionUpdateMedicalHistory } from './redux/showMedicalHistoryActionTypes';


interface Props { }

const ShowMedicalHistory: React.FC<Props> = (props: any) => {

    const dispatch = useDispatch()
    const [date, setDat] = useState()
    const [date2, setDate] = useState()
    const [medicalRecords, setMedicalRecords] = useState<any>([])
    const [isLoading, setIsLoading] = useState(true)
    const whenItOccuredRef = React.useRef<TextInput>(null)
    const VetNameRef = React.useRef<TextInput>(null)
    const SurgeriesRef = React.useRef<TextInput>(null)
    const MedicationRef = React.useRef<TextInput>(null)
    const reduxData = useSelector((state: any) => state)

    const onSubmit = ({ Symptoms, VetName, Surgeries, Medication }: { Vetvisitdate: string, Symptoms: string, VetName: string, Vaccinationdate: string, Surgeries: string, Medication: string }) => {
        Keyboard.dismiss();
        console.log('add medical on changes testing ==>', medicalRecords.vetVisitDate, 'sds', date, Symptoms, VetName, date2, Surgeries, Medication, date, new Date(medicalRecords.vetVisitDate))
        //console.log(date, Symptoms, VetName, date2, Surgeries, Medication, date)
        dispatch(actionUpdateMedicalHistory({ Vetvisitdate: date ? date : new Date(medicalRecords.vetVisitDate).toUTCString(), Symptoms, VetName, Vaccinationdate: date2 ? date2 : new Date(medicalRecords.vaccinationDate).toUTCString(), Surgeries, Medication, medicalRecordId: medicalRecords.medicalRecordId }))
        // dispatch(actionUpdateMedicalHistory({
        //     Vetvisitdate: date,
        //     Symptoms, VetName,
        //     Vaccinationdate: date,
        //     Surgeries,
        //     Medication
        // }))
        // dispatch(actionAddMedicalHistory())
    }

    useEffect(() => {
        console.log('props.route ==>', props.route)
        axiosInstance.get(getMedicalHistory + '/' + props?.route?.params?.petId)
            .then(res => {
                console.log('tresss ==>', res.data.data.medicalHistory,)
                setMedicalRecords(res.data.data.medicalHistory[0])
                setIsLoading(false)
            })
            .catch(err => console.log('errererer ==>', err))
    }, [])

    console.log('datae==>', date)

    const validateValues = ({ Symptoms, VetName, Surgeries, Medication }: { Vetvisitdate: string, Symptoms: string, VetName: string, Vaccinationdate: string, Surgeries: string, Medication: string }) => {
        const errors: { Vetvisitdate?: string, Symptoms?: string, VetName?: string, Surgeries?: string, Medication?: string } = {}
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

    console.log('add medical ==>', medicalRecords?.symptoms)

    if (isLoading) {
        return (
            <SafeAreaView style={{
                flex: 1,
                justifyContent: 'center',
            }}>
                <ActivityIndicator
                    size="large"
                    color={Colors.primary}
                    animating={true}
                />
            </SafeAreaView>
        )
    }
    console.log('vaccniation date ==>', date, date2)
    return (
        <SafeAreaView style={styles.container}>
            <Background />
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.createProfile}>Update Medical Records</Text>

                <View style={styles.contentView}>

                    {/* View for adding pets medical history details */}
                    <View>
                        <Formik
                            initialValues={{
                                Symptoms: medicalRecords.symptoms ? medicalRecords.symptoms : '',
                                VetName: medicalRecords.vetName ? medicalRecords.vetName : '',
                                Surgeries: medicalRecords.surgery ? medicalRecords.surgery : '',
                                Medication: medicalRecords.medication ? medicalRecords.medication : '',
                                Vaccinationdate: medicalRecords.vaccinationDate ? medicalRecords.vaccinationDate : '',
                                Vetvisitdate: medicalRecords.vetVisitDate ? medicalRecords.vetVisitDate : ''
                            }}
                            onSubmit={onSubmit}
                            validate={validateValues}
                        >
                            {({ handleSubmit }) => (
                                <View style={styles.formView}>

                                    <CDateTimePicker initialDate={medicalRecords.vetVisitDate} title='Vet Visit Date' returnData={(val) => setDat(val)} />

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

                                    <CDateTimePicker initialDate={medicalRecords.vaccinationDate} returnData={(val) => setDate(val)} title='Vaccination Date' />


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
                                        title="Update Records"
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

export default ShowMedicalHistory;