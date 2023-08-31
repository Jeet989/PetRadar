import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Image } from '@rneui/themed';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import FastImage from 'react-native-fast-image';
import { Icon } from '@rneui/base';
import Background from '../../components/Background';
import Colors from '../../utils/Colors/Colors';
import CButton from '../../components/CButton';
import {
  navigate,
  navigationRef,
  reset,
} from '../../utils/customNav/customNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { actionLogout } from '../auth/redux/actionTypes';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axiosInstance from '../../utils/API/axiosInstance';
import { deleteUser } from '../../utils/API/routes';
import { store } from '../../redux/store';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useNavigation } from '@react-navigation/native';

interface Props { }

const Profile: React.FC<Props> = (props: Props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isEnabled, setIsEnabled] = useState(false);
  const reduxData = useSelector((state: any) => state);
  const [userImageData, setUserImageData] = useState<DocumentPickerResponse>({
    uri: reduxData?.auth?.profilePic,
    name: '12345t6y',
    type: 'image/jpeg',
    fileCopyUri: null,
    size: 1244,
  });
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const selectImage = async () => {
    try {
      const ImageData = await DocumentPicker.pickSingle({
        allowMultiSelection: false,
        type: DocumentPicker.types.images,
      });
      let data = new FormData();
      data.append('image', {
        uri: ImageData.uri,
        type: ImageData.type,
        name: ImageData.name,
      });
      setUserImageData(ImageData);
    } catch (error) {
      console.log(error);
    }
  };

  const onLogout = async () => {
    dispatch(actionLogout());
    if (await GoogleSignin.isSignedIn()) {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    }
    reset('onboarding', {}, []);
  };

  const onDeleteAccount = async () => {
    axiosInstance
      .delete(deleteUser + store.getState().auth.userId)
      .then(res => {
        onLogout();
      })
      .catch(err => {
        console.log('error inside deletre accoutn ==> ', err);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Something went wrong',
        });
      });
  };

  useEffect(() => {
    const nav = navigation.addListener('focus', () => {
      console.log('focus', store.getState());
      setUserImageData({
        uri: store.getState()?.auth.profilePic,
        name: '12345t6y',
        type: 'image/jpeg',
        fileCopyUri: null,
        size: 1244,
      });
    });

    return () => nav();
  }, []);
  console.log('userImageData', userImageData);
  return (
    <SafeAreaView style={styles.container}>
      <Background />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        {/* <View style={styles.horizontalLine}/> */}
        <View style={styles.contentView}>
          <View style={styles.imageContentTile}>
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
                    key={new Date().toString()}
                    style={styles.userImage}
                  />
                )}
              />
            </View>
            <View style={styles.rightToImageContent}>
              <Text style={styles.userTitleText} numberOfLines={1}>
                Hi {reduxData.auth.firstName}
              </Text>
              <Text style={styles.userSubTitleText}>
                Let's find your furry friend's way back home
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.horizontalLine} />
        <TouchableOpacity
          onPress={() => navigate('personalDetails')}
          style={styles.tileContainer}>
          <View style={styles.tileIcon}>
            <Icon
              name="person"
              type="material"
              color={Colors.lightGrey}
              size={50}
            />
          </View>
          <View style={styles.tileContent}>
            <Text style={styles.tileTitle}>Personal Details</Text>
            <Text style={styles.tileSubtitle}>
              Update your name, email and account password at any time
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
        <TouchableOpacity
          style={styles.tileContainer}
          onPress={() => navigate('myPosts')}>
          <View style={styles.tileIcon}>
            <Icon
              name="list"
              type="material"
              color={Colors.lightGrey}
              size={50}
            />
          </View>
          <View style={styles.tileContent}>
            <Text style={styles.tileTitle}>Your Posts</Text>
            <Text style={styles.tileSubtitle}>Manage your post name</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
        <TouchableOpacity
          onPress={() => navigate('petDetails')}
          style={styles.tileContainer}>
          <View style={styles.tileIcon}>
            <Icon
              name="pets"
              type="material"
              color={Colors.lightGrey}
              size={50}
            />
          </View>
          <View style={styles.tileContent}>
            <Text style={styles.tileTitle}>Pets Details</Text>
            <Text style={styles.tileSubtitle}>
              Manage your pet name, breed type and more
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
        <TouchableOpacity
          onPress={() => navigate('notification')}
          style={styles.tileContainer}>
          <View style={styles.tileIcon}>
            <Icon
              name="notifications"
              type="material"
              color={Colors.lightGrey}
              size={50}
            />
          </View>
          <View style={styles.tileContent}>
            <Text style={styles.tileTitle}>Notification</Text>
            <Text style={styles.tileSubtitle}>
              Manage the types of notification you receive
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
        <TouchableOpacity
          style={styles.tileContainer}
          onPress={onDeleteAccount}>
          <View style={styles.tileIcon}>
            <Icon
              name="delete"
              type="material"
              color={Colors.lightGrey}
              size={50}
            />
          </View>
          <View style={styles.tileContent}>
            <Text style={styles.tileTitle}>Delete Account</Text>
            <Text style={styles.tileSubtitle}>
              Submit a request to delete your account
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
        <View style={styles.bottomBtn}>
          <CButton
            isPrimaryBttn={true}
            title={'Logout'}
            onPress={onLogout}
            titleStyle={styles.loginBttn}
          />
        </View>
        <View>
          <Text style={styles.versionText}>App Version: 0.0.1</Text>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  notificationHeader: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.black,
    textAlign: 'center',
    paddingVertical: 20,
  },
  notificationContentTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: Colors.black,
    textAlign: 'left',
    paddingTop: 12,
    paddingBottom: 0,
  },
  notificationContentDesc: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: Colors.lightGrey,
    textAlign: 'left',
    paddingTop: 0,
  },
  contentView: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 20,
    height: 175,
    // width:200
  },
  userTitleText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: Colors.black,
    textAlign: 'left',
    width: '90%',
    // paddingVertical: -5,
    // flex:1
  },
  userSubTitleText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: Colors.lightGrey,
    textAlign: 'left',
    marginTop: 0,
    width: 170,
    top: 0,
    // width:100
    // paddingVertical: 0,
    // alignContent:'flex-end'
    // alignContent: 'center'
    // flex:1
  },
  horizontalLine: {
    borderBottomColor: Colors.black,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  imageView: {
    alignItems: 'center',
    marginBottom: 21,
  },
  userImage: {
    // box: 'border-box',
    // position: 'absolute',
    width: 73.5,
    height: 70,
    borderRadius: 50,
    // left: 7,
    // top: 7
  },
  rightToImageContent: {
    flexDirection: 'column',
    alignContent: 'center',
    paddingLeft: 20,
  },
  imageContentTile: {
    flexDirection: 'row',
    left: 50,
    top: 27,
  },
  cardContainer: {
    opacity: 0.5,
  },
  listItemContainer: {
    opacity: 0.5,
  },
  listItemTitle: {
    opacity: 1,
  },
  tileContainer: {
    flexDirection: 'row',
    height: 70,
    // padding: 10,
    // borderBottomColor: Colors.black,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 0,
    paddingTop: 8,
    // borderTopColor:Colors.black,
    // borderTopWidth: StyleSheet.hairlineWidth
  },
  tileIcon: {
    // backgroundColor: 'blue',
    flex: 0.2,
    // alignContent:'center',
    // justifyContent:'center'
  },
  tileContent: {
    // backgroundColor: 'red',
    flex: 0.8,
    paddingTop: 5,
    // borderBottomColor: Colors.black,
    // borderBottomWidth: StyleSheet.hairlineWidth,
  },
  tileTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: Colors.black,
    textAlign: 'left',
    paddingTop: 0,
    paddingBottom: 0,
  },
  tileSubtitle: {
    fontFamily: 'Poppins',
    fontSize: 10,
    color: Colors.lightGrey,
    textAlign: 'left',
    paddingTop: 0,
  },
  loginBttn: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    textAlignVertical: 'center',
    // width:100
  },
  bottomBtn: {
    // position:'absolute',
    // top:30
    paddingTop: 100,
    padding: 20,
    // flex:0.5
  },
  versionText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 10,
    color: Colors.placeholderColor,
    textAlign: 'center',
    paddingTop: 0,
    paddingBottom: 0,
  },
});
export default Profile;
