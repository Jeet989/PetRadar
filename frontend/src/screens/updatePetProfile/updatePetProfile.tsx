import {Divider, Image} from '@rneui/themed';
import {Field, Formik} from 'formik';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Keyboard,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import Background from '../../components/Background';
import CButton from '../../components/CButton';
import FTextInput from '../../components/FTextInput';
import Constants from '../../utils/Constants/Constants';
import Colors from '../../utils/Colors/Colors';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {useDispatch, useSelector} from 'react-redux';
import axiosInstance from '../../utils/API/axiosInstance';
import {getPetProfile} from '../../utils/API/routes';
import {store} from '../../redux/store';
import {actionRequestPetProfile} from '../petProfile/redux/petProfileActionTypes';

interface Props {}

const UpdatePetProfile: React.FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>('');
  const [genderError, setGenderError] = useState<string | null>(null);
  const [image, setImage] = useState<DocumentPickerResponse>();
  const [petDetails, setPetDetails] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showQRCode, setShowQRCode] = useState(false);

  const breedRef = useRef<TextInput>(null);
  const bioRef = useRef<TextInput>(null);
  const heightRef = useRef<TextInput>(null);
  const ageRef = useRef<TextInput>(null);
  const weightRef = useRef<TextInput>(null);
  const specialMarksRef = useRef<TextInput>(null);

  const dispatch = useDispatch();
  const reduxStore = useSelector(state => state);

  useEffect(() => {
    if (value && genderError) setGenderError(null);
  }, [value]);

  const fetchPetDetails = async () => {
    // @ts-ignore
    axiosInstance
      .get(getPetProfile + '/' + store.getState().auth.userId)
      .then(res => {
        console.log('Response is ', res.data);
        setPetDetails(res.data.data.petProfile);
        setImage({
          fileCopyUri: null,
          name: new Date().getTime().toString(),
          size: 2323,
          type: 'image/jpeg',
          uri: res.data.data.petProfile.imageUrl,
        });
        setIsLoading(false);
        setValue(
          res.data.data.petProfile.gender
            ? res.data.data.petProfile.gender
            : '',
        );
      })
      .catch(err => console.log('Error inside fetching petDetails ==>', err));
  };

  useEffect(() => {
    fetchPetDetails();
  }, []);

  const onImageSelect = () => {
    DocumentPicker.pickSingle({
      allowMultiSelection: false,
      type: DocumentPicker.types.images,
    })
      .then(res => {
        setImage(res);
      })
      .catch(err => {
        console.log('error in image selection', err);
      });
  };

  const onSubmit = ({
    name,
    breed,
    bio,
    height,
    age,
    weight,
    specialMarks,
  }: {
    name: string;
    breed: string;
    bio: string;
    height: string;
    age: string;
    weight: string;
    specialMarks: string;
  }) => {
    if (!value) {
      setGenderError('Invalid Gender');
      return;
    }

    if (!image) {
      Toast.show({
        type: 'error',
        text1: 'Please select image',
        position: 'bottom',
        visibilityTime: 2000,
      });
      return;
    }

    setGenderError(null);

    dispatch(
      actionRequestPetProfile({
        petName: name,
        petBreed: breed,
        petAge: age,
        petBio: bio,
        petGender: value,
        petHeight: height,
        petProfilePic: image,
        petSpecialMarks: specialMarks,
        petWeight: weight,
        petId: petDetails.petId,
        isEdit: true,
      }),
    );
  };

  console.log('reduxStore', reduxStore, petDetails.petHeightInCms);

  const validateValues = ({
    name,
    breed,
    bio,
    height,
    age,
    weight,
    specialMarks,
  }: {
    name: string;
    breed: string;
    bio: string;
    height: string;
    age: string;
    weight: string;
    specialMarks: string;
  }) => {
    const errors: {
      name?: string;
      breed?: string;
      bio?: string;
      height?: string;
      age?: string;
      weight?: string;
      specialMarks?: string;
    } = {};

    if (!Constants.nameRegex.test(name)) {
      errors.name = 'Invalid name';
    }
    if (!Constants.nameRegex.test(breed)) {
      errors.breed = 'Invalid breed';
    }
    if (!bio) {
      errors.bio = 'Invalid bio';
    }
    if (!Constants.ageRegex.test(height.toString())) {
      errors.height = 'Invalid height';
    }
    if (!Constants.ageRegex.test(age.toString())) {
      errors.age = 'Invalid age';
    }
    if (!Constants.ageRegex.test(weight.toString())) {
      errors.weight = 'Invalid weight';
    }
    if (!Constants.nameRegex.test(specialMarks)) {
      errors.specialMarks = 'Invalid special marks';
    }
    return errors;
  };

  if (isLoading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <ActivityIndicator
          size="large"
          color={Colors.primary}
          animating={true}
        />
      </SafeAreaView>
    );
  }
  console.log('petDetails', petDetails);
  return (
    <SafeAreaView style={styles.container}>
      <Background />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Update Pet Profile</Text>
        <View style={styles.petImageContent}>
          <View style={styles.petImageView}>
            <Image
              // @ts-ignore
              ImageComponent={() => (
                <FastImage
                  source={{
                    uri: image?.uri
                      ? image.uri
                      : petDetails.imageUrl
                      ? petDetails.imageUrl
                      : 'https://images.unsplash.com/photo-1678560482177-445935d68c43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=685&q=80',
                    priority: 'high',
                  }}
                  style={styles.petImage}
                />
              )}
            />
          </View>
          <TouchableOpacity onPress={onImageSelect} style={styles.penButton}>
            <FontAwesome5 name="pen" size={25} color={Colors.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.contenView}>
          <Formik
            initialValues={{
              name: petDetails?.petName ? petDetails?.petName : '',
              breed: petDetails?.petBreed ? petDetails?.petBreed : '',
              gender: petDetails?.petGender ? petDetails?.petGender : '',
              bio: petDetails?.bio ? petDetails?.bio : '',
              height: petDetails.petHeightInCms
                ? petDetails.petHeightInCms.toString()
                : '',
              age: petDetails?.age ? petDetails?.age.toString() : '',
              weight: petDetails?.weightInLbs
                ? petDetails?.weightInLbs.toString()
                : '',
              specialMarks: petDetails?.petIdentificationMarks
                ? petDetails?.petIdentificationMarks
                : '',
            }}
            validate={validateValues}
            onSubmit={onSubmit}>
            {({handleSubmit}) => (
              <View>
                <Field
                  name="name"
                  placeholder="Enter Name"
                  component={FTextInput}
                  onSubmitEditing={() => breedRef.current?.focus()}
                  returnKeyType={'next'}
                />
                <Field
                  name="breed"
                  placeholder="Enter Breed"
                  component={FTextInput}
                  innerRef={breedRef}
                  onSubmitEditing={Keyboard.dismiss}
                />
                <View>
                  <View
                    style={[
                      styles.genderView,
                      genderError ? {marginBottom: 30} : {},
                    ]}>
                    <TouchableOpacity
                      style={styles.genderBttn}
                      onPress={() => setOpen(!open)}>
                      <Text style={styles.genderValue}>
                        {value
                          ? value === 'Male'
                            ? 'Male'
                            : 'Female'
                          : 'Select Gender'}
                      </Text>
                      <Entypo
                        name="chevron-small-down"
                        size={20}
                        color={Colors.placeholderColor}
                        style={styles.caretIcon}
                      />
                    </TouchableOpacity>
                  </View>
                  <Modal
                    visible={open}
                    onDismiss={() => setOpen(false)}
                    transparent>
                    <View style={styles.modalView}>
                      <TouchableOpacity
                        style={styles.modalDismissView}
                        onPress={() => setOpen(false)}>
                        <View style={styles.genderContentView}>
                          <Pressable
                            style={styles.bttnMale}
                            onPress={() => {
                              setOpen(false);
                              setValue('Male');
                            }}>
                            <FontAwesome5
                              name="dot-circle"
                              color={Colors.borderColor}
                              size={20}
                              style={styles.caret}
                            />
                            <Text style={styles.male}>Male</Text>
                          </Pressable>
                          <Divider color={Colors.black} />
                          <Pressable
                            style={styles.bttnMale}
                            onPress={() => {
                              setOpen(false);
                              setValue('Female');
                            }}>
                            <FontAwesome5
                              name="dot-circle"
                              size={20}
                              color={Colors.borderColor}
                              style={styles.caret}
                            />
                            <Text style={styles.male}>Female</Text>
                          </Pressable>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </Modal>
                </View>
                {genderError ? (
                  <View>
                    <Text style={styles.errorText}>{genderError}</Text>
                  </View>
                ) : null}
                <Field
                  name="bio"
                  placeholder="Enter Bio"
                  component={FTextInput}
                  multiline={true}
                  numberOfLines={5}
                  innerRef={bioRef}
                  onSubmitEditing={() => heightRef.current?.focus()}
                  returnKeyType={'next'}
                />
                <Field
                  name="height"
                  placeholder="Enter Pet Height"
                  component={FTextInput}
                  innerRef={heightRef}
                  onSubmitEditing={() => ageRef.current?.focus()}
                  keyboardType={'numbers-and-punctuation'}
                  returnKeyType={'next'}
                />
                <Field
                  name="age"
                  placeholder="Enter Pet Age"
                  component={FTextInput}
                  innerRef={ageRef}
                  onSubmitEditing={() => weightRef.current?.focus()}
                  keyboardType={'numbers-and-punctuation'}
                  returnKeyType={'next'}
                />
                <Field
                  name="weight"
                  placeholder="Enter Pet Weight"
                  component={FTextInput}
                  innerRef={weightRef}
                  onSubmitEditing={() => specialMarksRef.current?.focus()}
                  keyboardType={'numbers-and-punctuation'}
                  returnKeyType={'next'}
                />
                <Field
                  name="specialMarks"
                  placeholder="Enter Special Marks"
                  component={FTextInput}
                  multiline={true}
                  numberOfLines={10}
                  innerRef={specialMarksRef}
                  onSubmitEditing={handleSubmit}
                />
                <CButton
                  title="Show Pet QR Code"
                  onPress={() => setShowQRCode(true)}
                  containerStyle={{marginBottom: 20}}
                />
                <Field
                  name="submit"
                  component={CButton}
                  onPress={handleSubmit}
                  title="Update Profile"
                />
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAwareScrollView>

      <Modal
        visible={showQRCode}
        transparent={true}
        style={{flex: 1}}
        onRequestClose={() => setShowQRCode(false)}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            ImageComponent={() => (
              <FastImage
                source={{
                  uri: 'data:image/jpeg;base64,' + petDetails?.petQrImage,
                  priority: 'high',
                }}
                style={{width: 300, height: 300}}
              />
            )}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  male: {
    color: Colors.black,
  },
  caret: {
    marginRight: 15,
    marginLeft: 15,
  },
  bttnMale: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  genderContentView: {
    width: '85%',
    backgroundColor: Colors.white,
  },
  modalDismissView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
  },
  caretIcon: {
    flex: 0.1,
  },
  genderValue: {
    color: Colors.placeholderColor,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    flex: 1,
  },
  genderBttn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  genderView: {
    backgroundColor: Colors.transparent,
    borderColor: Colors.borderColor,
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 22,
    height: Platform.OS === 'android' ? 52 : 50,
    justifyContent: 'center',
    marginBottom: 21,
  },
  penButton: {
    position: 'absolute',
    backgroundColor: Colors.primary,
    padding: 9,
    borderRadius: 50,
    left: '55%',
    bottom: 0,
  },
  petImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  petImageContent: {
    flex: 1,
    marginBottom: 21,
    marginTop: 20,
  },
  petImageView: {
    alignItems: 'center',
  },
  errorText: {
    position: 'absolute',
    // backgroundColor: 'red',
    bottom: 5,
    left: 20,
    color: Colors.errorRed,
    fontFamily: 'Poppins-SemiBold',
  },
  contenView: {
    flex: 1,
    marginHorizontal: 25,
    paddingBottom: 20,
  },
  header: {
    color: Colors.black,
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    marginHorizontal: 23,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
export default UpdatePetProfile;
