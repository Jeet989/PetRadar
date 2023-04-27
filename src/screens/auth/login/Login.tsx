import React from 'react';
import { Dimensions, Image, Keyboard, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Divider } from '@rneui/themed';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { User } from '@react-native-google-signin/google-signin';

import Background from '../../../components/Background';
import CButton from '../../../components/CButton';
import Colors from '../../../utils/Colors/Colors';
import { useDispatch } from 'react-redux';
import { actionGoogleLogin, actionLogin } from '../redux/actionTypes';
import { Field, Formik } from 'formik';
import FTextInput from '../../../components/FTextInput';
import { validateCredentials } from '../../../utils/functions/validateCredentials';
import { googleSignIn } from '../../../utils/functions/googleSignIn';


interface Props { }

const Login: React.FC<Props> = (props: Props) => {

    const dispatch = useDispatch()
    const passRef = React.useRef<TextInput>(null)

    const onGoogleSignin = async () => {
        // @ts-ignore
        const userInfo: User = await googleSignIn()
        if (userInfo)
            dispatch(actionGoogleLogin({
                email: userInfo.user.email,
                givenName: userInfo.user.givenName ? userInfo.user.givenName : '',
                familyName: userInfo.user.familyName ? userInfo.user.familyName : '',
                photo: userInfo.user.photo ? userInfo.user.photo : '',
                isLogin: true
            }))
    }

    const onSignIn = async (values: { email: string, password: string }) => {
        Keyboard.dismiss()
        dispatch(actionLogin({ email: values.email, password: values.password }))
    }

    return (
        <SafeAreaView style={styles.container}>
            <Background />
            <KeyboardAwareScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
                <Text style={styles.header}>Login</Text>

                <View style={styles.contentView}>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        onSubmit={onSignIn}
                        validate={validateCredentials}
                    >
                        {(({ handleSubmit }) => (
                            <View style={styles.credView}>
                                <Field
                                    name="email"
                                    placeholder="Email"
                                    component={FTextInput}
                                    inputStyle={styles.emailStyle}
                                    keyboardType={'email-address'}
                                    onSubmitEditing={() => passRef.current?.focus()}
                                    returnKeyType={'next'}
                                    autoCapitalize={'none'}
                                />

                                <Field
                                    name="password"
                                    placeholder="Password"
                                    component={FTextInput}
                                    inputStyle={styles.password}
                                    onSubmitEditing={handleSubmit}
                                    innerRef={passRef}
                                    returnKeyType={'done'}
                                    autoCapitalize={'none'}
                                    secureTextEntry={true}
                                />

                                <CButton
                                    isPrimaryBttn={true}
                                    title={'Login'}
                                    onPress={handleSubmit}
                                    titleStyle={styles.loginBttn}
                                />
                            </View>
                        ))}
                    </Formik>

                    <View style={styles.dividerView}>
                        <Divider color={Colors.black} width={1.2} style={styles.divider} />
                        <Text style={styles.or}>or</Text>
                        <Divider color={Colors.black} width={1.2} style={styles.divider} />
                    </View>

                    <View style={styles.bttnView}>
                        <CButton
                            isPrimaryBttn={true}
                            onPress={onGoogleSignin}
                            title={'Continue with Google'}
                            buttonStyle={styles.bttnStyleGoogle}
                            titleStyle={styles.titleStyle}
                            containerStyle={styles.containerStyle}
                            icon={<Image source={require('../../../assets/imgs/googleSignin.png')} style={styles.googlePNG} />}
                            iconPosition={"left"}
                        />
                    </View>
                </View>

            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1
    },
    scrollView: {
        flex: 1
    },
    googlePNG: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    containerStyle: {
        justifyContent: 'center',
    },
    titleStyle: {
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
        paddingLeft: 20,
        color: Colors.black,
        textAlignVertical: 'center'
    },
    bttnStyleGoogle: {
        backgroundColor: Colors.white,
        justifyContent: 'center',
    },
    or: {
        flex: 1,
        textAlign: 'center',
        color: Colors.black,
    },
    divider: {
        width: Dimensions.get('screen').width / 3,
    },
    loginBttn: {
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
        textAlignVertical: 'center',
    },
    password: {
        marginVertical: 8,
        marginBottom: 40
    },
    emailStyle: {
        marginVertical: 25,
    },
    dividerView: {
        flex: 0.1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bttnView: {
        flex: 0.2,
        justifyContent: 'center'
    },
    credView: {
        flex: 0.4,
    },
    contentView: {
        flex: 1,
        marginHorizontal: 23,
        justifyContent: 'space-evenly',
    },
    header: {
        alignSelf: 'center',
        fontFamily: "Poppins-Bold",
        fontSize: 23,
        marginTop: 50,
        color: Colors.black,
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})

export default Login;