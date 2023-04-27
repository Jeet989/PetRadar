import React, { useEffect, useState } from 'react';
import { Modal, View } from 'react-native';
import { SafeAreaView, StyleSheet, Text, TextInput, } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Colors from '../../utils/Colors/Colors';
import { Icon, Image } from '@rneui/themed';
import { TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CButton from '../../components/CButton';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
import { actionPost } from './redux/actionTypes';
import { Keyboard } from 'react-native';
import { LatLng } from 'react-native-maps';
import { store } from '../../redux/store';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import CMapView from '../addMedicalHistory/mapView';

interface Props { }

const CreatePost: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch()
  const navigation = useNavigation();

  const [createPostData, setcreatePostData] = useState<any>(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState<LatLng>();
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const focs = navigation.addListener('blur', () => {
      setcreatePostData(null)
      setDescription('')
      setLocation(undefined)
    })
    return () => focs()
  }, [])

  const addPost = async () => {
    Keyboard.dismiss()

    if (!createPostData) {
      Toast.show({ type: 'error', text1: 'Please select image', position: 'bottom' })
      return
    }

    if (!description) {
      Toast.show({ type: 'error', text1: 'Please enter description', position: 'bottom' })
      return
    }

    if (!location) {
      Toast.show({ type: 'error', text1: 'Please select location', position: 'bottom' })
      return
    }

    // @ts-ignore
    dispatch(actionPost({ Description: description, latitude: location?.latitude, longitude: location?.longitude, image: createPostData, time: new Date().toLocaleString(), userId: store.getState().auth.userId, userName: store.getState().auth.firstName + ' ' + store.getState().auth?.lastName }))
  }

  const uploadPost = async () => {
    try {
      const PostData = await DocumentPicker.pickSingle({
        allowMultiSelection: false,
        type: DocumentPicker.types.images,
      });

      setcreatePostData(PostData);
    } catch (error) {
      console.log(error);
    }
  }

  const addCoordinates = (data: LatLng) => {
    setLocation(data)
    setShowMap(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{
        flexDirection: 'row',
        marginHorizontal: 13,
        marginTop: 13
      }}>
        <AntDesign name="arrowleft" style={{ alignSelf: 'center' }} size={24} color="black" onPress={() => navigation.goBack()} />
        <Text style={styles.Posttitle}>Add Post</Text>
      </View>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageView}>
          {/* <HeaderBackButton onPress={() => navigation.goBack()} /> */}
          <Text style={styles.Postupload}>Upload Photo</Text>
          <Image
            // @ts-ignore
            ImageComponent={() => (
              <FastImage
                source={{
                  uri: createPostData
                    ? createPostData.uri
                    : 'cloud-upload',
                  priority: FastImage.priority.high,
                }}
                style={styles.CreatePost}
              />
            )}
          />

          <View style={{
            position: 'absolute',
            alignSelf: 'center',
            marginTop: 100
          }}>
            <TouchableOpacity
              style={styles.cloudView}
              onPress={uploadPost}
              activeOpacity={0.6}>
              <Icon name="cloud-upload" size={25} color={Colors.black} />
            </TouchableOpacity>
          </View>
        </View>


        <Text style={styles.Enterdescription}> Description </Text>
        <TextInput
          style={styles.descriptionbox}
          placeholder={'Describe about the pet'}
          placeholderTextColor="black"
          onChangeText={(text: React.SetStateAction<string>) =>
            setDescription(text)
          }
          value={description}
          multiline={true}
          numberOfLines={4}
        />

        <CButton
          title="Choose location on map"
          // onPress={() => navigate('mapView', { callback: (data: LatLng) => addCoordinates(data) })}
          onPress={() => setShowMap(true)}
          containerStyle={{ marginTop: 40, marginLeft: 35, marginRight: 35 }}
          buttonStyle={{ backgroundColor: "#676767" }}
        />

        <CButton
          title="Add post"
          onPress={addPost}
          containerStyle={{ marginTop: 40, marginLeft: 35, marginRight: 35 }}
        />

        <Modal
          visible={showMap}
        >
          <CMapView
            callback={(data: LatLng) => addCoordinates(data)}
          />
        </Modal>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Posttitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    color: Colors.black,
    textAlign: 'center',
    flex: 1
  },
  cloudView: {
    backgroundColor: Colors.primary,
    width: 45,
    height: 45,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Enterdescription: {
    textAlign: 'left',
    color: Colors.black,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    marginLeft: 20,
    paddingTop: 25,
    paddingBottom: 10,
  },
  descriptionbox: {
    borderWidth: 1,
    flex: 1,
    borderColor: Colors.borderColor,
    borderRadius: 10,
    padding: 20,
    width: 300,
    height: 100,
    backgroundColor: 'white',
    color: Colors.black,
    marginLeft: 30,
    marginRight: 30
  },
  locationbox: {
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 10,
    padding: 15,
    width: 300,
    height: 50,
    backgroundColor: 'white',
    color: Colors.black,
    marginLeft: 30,
    marginRight: 30
  },
  Postupload: {
    textAlign: 'left',
    color: Colors.black,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    marginLeft: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  Location: {
    textAlign: 'left',
    color: Colors.black,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    marginLeft: 20,
    paddingTop: 25,
    paddingBottom: 10,
  },
  style: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 100,
  },

  container: {
    flex: 1,
    backgroundColor: 'rgba(92, 186, 181, 0.2)',
  },
  formView: {
    flex: 1,
    marginHorizontal: 25,
  },
  imageView: {
    // alignItems: 'center',
    // marginTop: 45,
    marginBottom: 21,
  },
  CreatePost: {
    width: 300,
    height: 150,
    borderRadius: 10,
    backgroundColor: 'white',
    alignSelf: 'center'
  },
});


export default CreatePost;