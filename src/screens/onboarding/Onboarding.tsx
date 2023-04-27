import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import Background from '../../components/Background';
import CButton from '../../components/CButton';
import Colors from '../../utils/Colors/Colors';
import { useSelector } from 'react-redux';


interface Props { }

const Onboarding: React.FC<Props> = (props: Props) => {
    const { top } = useSafeAreaInsets()
    const navigation = useNavigation();

    const signUpNavigate = () => navigation.navigate('signup')

    const loginNavigate = () => navigation.navigate('login')

    const data = useSelector(dat => dat)

    useEffect(() => console.log(data), [data])

    useEffect(() => {
        GoogleSignin.configure();
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Background />
            <Image source={require('../../assets/imgs/OnboardingIMG.png')} style={styles.img} />

            <View style={styles.welcomeView}>
                <Text style={styles.welcome}>Hey! Welcome</Text>
                <Text style={styles.subTxt}>Let's find your furry friend's way back home</Text>
            </View>

            <View style={styles.bttnView}>
                <CButton
                    title={"Sign up"}
                    onPress={signUpNavigate}
                    isPrimaryBttn={true}
                />
            </View>

            <View style={styles.bttnView2}>
                <CButton
                    title={'Login'}
                    onPress={loginNavigate}
                    buttonStyle={styles.bttnStyle}
                    titleStyle={styles.titleStyle}
                />
            </View>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    titleStyle: {
        color: Colors.black
    },
    bttnStyle: {
        backgroundColor: Colors.white,
    },
    bttnView2: {
        flex: 0.5,
        marginHorizontal: 23
    },
    bttnView: {
        flex: 0.4,
        justifyContent: 'center',
        marginHorizontal: 23
    },
    welcome: {
        textAlign: 'center',
        fontSize: 32,
        fontFamily: 'Poppins-Bold',
        color: Colors.black
    },
    subTxt: {
        alignSelf: 'center',
        textAlign: 'center',
        width: '50%',
        color: Colors.lightGrey
    },
    welcomeView: {
        flex: 1,
        justifyContent: 'center'
    },
    img: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.38,
        resizeMode: 'contain',
        marginTop: Platform.OS === 'ios' ? -20 : 0
    },
    container: {
        flex: 1,
        backgroundColor: Colors.white
    }
})

export default Onboarding;