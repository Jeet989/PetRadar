import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Background from '../../components/Background';
import Colors from '../../utils/Colors/Colors';
import {useState} from 'react';
import {Image} from '@rneui/themed';
import {Icon} from '@rneui/base';
import CButton from '../../components/CButton';
import {Dimensions, Platform} from 'react-native';
import {useEffect} from 'react';
import axiosInstance from '../../utils/API/axiosInstance';
import { getMedicalHistory, getPetProfile } from '../../utils/API/routes';
import { store } from '../../redux/store';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

interface Props {}

const PetDetails: React.FC<Props> = (props: Props) => {
  const navigation = useNavigation();

  const [data, setData] = useState<any>([]);

    const updatePetProfileNavigate = () => navigation.navigate('updatePetProfile')
    const showMedicalHistory = () => navigation.navigate('showMedHis', { petId: data.petId })

    const fetchData = async () => {
        // @ts-ignore
        const response = await axiosInstance.get(getPetProfile + '/' + store.getState().auth.userId);
        setData(response.data.data.petProfile);
    };

    useEffect(() => {
        const nav = navigation.addListener('focus', () => fetchData())
        return () => nav();
    }, []);

  useEffect(() => {
    const nav = navigation.addListener('focus', () => fetchData());
    return () => nav();
  }, []);

  console.log('date ==>', data);
  return (
    <SafeAreaView style={styles.container}>
      <Background />
      {/* <KeyboardAwareScrollView showsVerticalScrollIndicator={false}> */}
      <View>
        <Image
          // @ts-ignore
          ImageComponent={() => (
            <FastImage
              source={{uri: data.imageUrl, priority: FastImage.priority.high}}
              style={styles.img}
            />
          )}
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.petDescriptionTitle}>Description: </Text>
        {/* <ScrollView style={{ flex: 1}} contentContainerStyle={{ flexGrow: 1}}> */}
        <Text style={styles.petDescriptionContent}>{data.bio}</Text>

        {/* </ScrollView> */}
      </View>

            <View style={styles.bottomBtn}>
                <CButton
                    isPrimaryBttn={true}
                    title={'Update Pet Medical Details'}
                    // onPress={() => { console.log("data on press is ", data); calculateAge(data.pet) }}
                    onPress={showMedicalHistory}
                    titleStyle={styles.loginBttn}
                />
            </View>

            <View style={styles.bottomBtn}>
                <CButton
                    isPrimaryBttn={true}
                    title={'Update Pet Details'}
                    onPress={updatePetProfileNavigate}
                    titleStyle={styles.loginBttn}
                />
            </View>

      {/* </KeyboardAwareScrollView> */}
      <View style={styles.petTitleCard}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.petTitle}>{data.petName}</Text>
          <View style={styles.petGender}>
            {data.gender == 'Male' ? (
              <Icon
                name="venus"
                type="font-awesome"
                color={Colors.lightGrey}
                size={20}
              />
            ) : (
              <Icon
                name="mars"
                type="font-awesome"
                color={Colors.lightGrey}
                size={20}
              />
            )}
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.petBreed}>{data.petBreed}</Text>
          <Text style={styles.petAge}>{data.age} years old</Text>
        </View>
      </View>
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
    width: 73.5,
    height: 70,
    borderRadius: 50,
  },
  img: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.38,
    resizeMode: 'cover',
    marginTop: Platform.OS === 'ios' ? -20 : 0,
  },
  petTitleCard: {
    height: Dimensions.get('window').height * 0.12,
    width: Dimensions.get('window').width * 0.9,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    backgroundColor: Colors.white,
    top: Dimensions.get('window').height * 0.33,
    left: Dimensions.get('window').width * 0.05,
    zIndex: 1,
    shadowOffset: {
      width: 20,
      height: -10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    alignSelf: 'center',
    borderRadius: 4,
    shadowColor: 'black',
  },
  petTitle: {
    top: 20,
    fontSize: 24,
    left: 20,
    flex: 0.7,
    color: Colors.black,
  },
  petGender: {
    top: 20,
    // fontSize:20,
    // left:20,
    flex: 0.3,
    flexDirection: 'row-reverse',
    right: 20,
    color: Colors.black,
  },
  petBreed: {
    top: 25,
    fontSize: 14,
    left: 20,
    flex: 0.7,
    color: Colors.black,
  },
  petAge: {
    top: 25,
    fontSize: 14,
    right: 0,
    flex: 0.3,
    color: Colors.black,
  },
  titleContainer: {
    height: 300,
  },

  petDescriptionTitle: {
    fontFamily: 'Poppins',
    fontSize: 20,
    color: Colors.lightGrey,
    textAlign: 'left',
    paddingTop: 0,
    paddingBottom: 0,
    top: Dimensions.get('window').height * 0.1,
    // height:200,
    left: Dimensions.get('window').width * 0.11,
  },
  petDescriptionContent: {
    position: 'absolute',
    width: 285,
    height: 175,
    left: Dimensions.get('window').width * 0.11,
    top: Dimensions.get('window').height * 0.15,
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontSize: 12,
    lineHeight: 21,
    textAlign: 'justify',
    color: Colors.lightGrey,
  },
  loginBttn: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    textAlignVertical: 'center',
  },
  bottomBtn: {
    paddingTop: 10,
    padding: 12,
    // flex:0.5
  },
});

export default PetDetails;
