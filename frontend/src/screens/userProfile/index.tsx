import { Image } from '@rneui/themed';
import { Field, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Keyboard, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DocumentPicker from 'react-native-document-picker';
import OneSignal, { DeviceState } from 'react-native-onesignal';
import { PERMISSIONS, check, request, requestMultiple } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

import Background from '../../components/Background';
import CButton from '../../components/CButton';
import FTextInput from '../../components/FTextInput';
import Colors from '../../utils/Colors/Colors';
import Constants from '../../utils/Constants/Constants';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { navigate } from '../../utils/customNav/customNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { actionUpdateProfile } from './redux/userProfileActions';

interface Props { }

const UserProfile: React.FC<Props> = (props: Props) => {
  const [userImageData, setUserImageData] = useState<any>(null);
  const dispatch = useDispatch();
  const reduxData = useSelector((state: any) => state)

  useEffect(() => {
    console.log("reduxData", reduxData)
  }, [reduxData])

  const lastNameRef = React.useRef<TextInput>(null);
  const emailRef = React.useRef<TextInput>(null);
  const addressRef = React.useRef<TextInput>(null);
  const cityRef = React.useRef<TextInput>(null);
  const pinCodeRef = React.useRef<TextInput>(null);
  const phoneNumberRef = React.useRef<TextInput>(null);

  const selectImage = async () => {
    try {
      const ImageData = await DocumentPicker.pickSingle({
        allowMultiSelection: false,
        type: DocumentPicker.types.images,
      });
      setUserImageData(ImageData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    OneSignal.setAppId('89e439d6-260c-4aba-900c-347009c530e5')
  }, [])

  const onSubmit = async({ firstName, lastName, email, address, city, pinCode, phoneNumber, }: { firstName: string; lastName: string; email: string; address: string; city: string; pinCode: string; phoneNumber: string; }) => {
    Keyboard.dismiss();
    if (!userImageData) {
      Toast.show({
        type: 'error',
        text1: 'Please upload your profile picture',
        position: 'bottom',
        visibilityTime: 1200,
      });
      return;
    }
    const fineLocation = await requestMultiple([PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION])
    let location: { latitude: string, longitude: string } = { latitude: '', longitude: '' };
    if (fineLocation[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] === 'granted' && fineLocation[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === 'granted') {
      Geolocation.getCurrentPosition(async (coords) => {
        location.latitude = coords.coords.latitude.toString();
        location.longitude = coords.coords.longitude.toString();
        const onesignalUserId: DeviceState | any = await OneSignal.getDeviceState();
        await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS).then(async res => {
        await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS).then(res => { })
        })

        dispatch(actionUpdateProfile({
          firstName, lastName, email, address, city, pinCode, phoneNumber,
          userId: reduxData?.auth?.userId,
          profileUrl: userImageData,
          isEdit: false,
          onesignalUserId: onesignalUserId.userId,
          latitude: coords.coords.latitude.toString(),
          longitude: coords.coords.longitude.toString(),
        }))
      });
    }
  };

  const validateValues = ({ firstName, lastName, email, address, city, pinCode, phoneNumber, }: { firstName: string; lastName: string; email: string; address: string; city: string; pinCode: string; phoneNumber: string; }) => {
    const errors: { firstName?: string; lastName?: string; email?: string; address?: string; city?: string; pinCode?: string; phoneNumber?: string; } = {};

    if (!Constants.nameRegex.test(firstName)) {
      errors.firstName = 'First name is invalid';
    }

    if (!Constants.nameRegex.test(lastName)) {
      errors.lastName = 'Last name is invalid';
    }

    if (!Constants.emailRegex.test(email)) {
      errors.email = 'Email is invalid';
    }

    if (!address) {
      errors.address = 'Address is required';
    }

    if (!city) {
      errors.city = 'City is required';
    }

    if (!pinCode) {
      errors.pinCode = 'Pin code is required';
    }

    if (!Constants.phoneRegex.test(phoneNumber)) {
      errors.phoneNumber = 'Phone number is invalid';
    }

    return errors;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Background />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.createProfile}>Let's create your profile</Text>

        <View style={styles.contentView}>
          {/* View for uploading the user's profile picture */}
          <View style={styles.imageView}>
            <Image
              // @ts-ignore
              ImageComponent={() => (
                <FastImage
                  source={{
                    uri: userImageData
                      ? userImageData.uri
                      : 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80',
                    priority: FastImage.priority.high,
                  }}
                  style={styles.userImage}
                />
              )}
            />

            <TouchableOpacity
              style={styles.penView}
              onPress={selectImage}
              activeOpacity={0.6}>
              <FontAwesome5 name="pen" size={25} color={Colors.white} />
            </TouchableOpacity>
          </View>

          {/* View for the user's details */}
          <View>
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                email: reduxData?.auth?.email ? reduxData?.auth?.email : '',
                address: '',
                city: '',
                pinCode: '',
                phoneNumber: '',
              }}
              onSubmit={onSubmit}
              validate={validateValues}>
              {({ handleSubmit }) => (
                <View style={styles.formView}>
                  <Field
                    name={'firstName'}
                    placeholder={'First Name'}
                    component={FTextInput}
                    onSubmitEditing={() => lastNameRef.current?.focus()}
                    returnKeyType={'next'}
                  />

                  <Field
                    name={'lastName'}
                    placeholder={'Last Name'}
                    component={FTextInput}
                    innerRef={lastNameRef}
                    onSubmitEditing={() => addressRef.current?.focus()}
                    returnKeyType={'next'}
                  />

                  <Field
                    name={'email'}
                    placeholder={'Email'}
                    component={FTextInput}
                    innerRef={emailRef}
                    keyboardType={'email-address'}
                    returnKeyType={'next'}
                    autoCapitalize={"none"}
                    editable={false}
                  />

                  <Field
                    name={'address'}
                    placeholder={'Address'}
                    component={FTextInput}
                    innerRef={addressRef}
                    onSubmitEditing={() => cityRef.current?.focus()}
                    returnKeyType={'next'}
                  />

                  <Field
                    name={'city'}
                    placeholder={'City'}
                    component={FTextInput}
                    innerRef={cityRef}
                    onSubmitEditing={() => pinCodeRef.current?.focus()}
                    returnKeyType={'next'}
                  />

                  <Field
                    name={'pinCode'}
                    placeholder={'Pin Code'}
                    component={FTextInput}
                    innerRef={pinCodeRef}
                    onSubmitEditing={() => phoneNumberRef.current?.focus()}
                    returnKeyType={'next'}
                  />

                  <Field
                    name={'phoneNumber'}
                    placeholder={'Phone Number'}
                    component={FTextInput}
                    innerRef={phoneNumberRef}
                    onSubmitEditing={handleSubmit}
                    keyboardType={'phone-pad'}
                    returnKeyType={'done'}
                    maxLength={10}
                  />

                  <CButton
                    title="Save"
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
  );
};

const styles = StyleSheet.create({
  formView: {
    flex: 1,
    marginHorizontal: 25,
  },
  userImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  imageView: {
    alignItems: 'center',
    marginBottom: 21,
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
    left: 230,
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
    marginBottom: 21,
  },
  contentView: {
    flex: 1,
    paddingBottom: 20,
  },
  createProfile: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.black,
    textAlign: 'center',
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default UserProfile;
