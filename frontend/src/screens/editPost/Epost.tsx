import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView, StyleSheet, Text, TextInput, } from 'react-native';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import Background from '../../components/Background';
import { Icon, Image } from '@rneui/themed';
import Colors from '../../utils/Colors/Colors';
import { TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FastImage from 'react-native-fast-image';
import FTextInput from '../../components/FTextInput';
import { Field } from 'formik';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CButton from '../../components/CButton';
import { navigate } from '../../utils/customNav/customNavigation';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
import { Keyboard } from 'react-native';
import { actionPost } from './redux/actionTypes';

interface Props { }

const EditPost: React.FC<Props> = (props: Props) => {

  const dispatch = useDispatch()

  const editPost = async (values: { Description: string, time: string }) => {
    Keyboard.dismiss()
    dispatch(actionPost({ Description: values.Description, time: values.time }))
  }

  const gobackcomponent = () => { };
  const navigation = useNavigation();

  const [editPostData, seteditPostData] = useState<any>(null);

  const [description, setDescription] = useState('');

  const [location, setLocation] = useState('');

  const EditPost = async () => {
    try {
      const EditPostData = await DocumentPicker.pickSingle({
        allowMultiSelection: false,
        type: DocumentPicker.types.images,
      });
      let data = new FormData();
      data.append('image', {
        uri: EditPostData.uri,
        type: EditPostData.type,
        name: EditPostData.name,
      });
      seteditPostData(EditPostData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{
        flexDirection: 'row',
        marginHorizontal: 13,
        marginTop: 13
      }}>
        <AntDesign name="arrowleft" style={{ alignSelf: 'center' }} size={24} color="black" onPress={() => navigation.goBack()} />
        <Text style={styles.Posttitle}> Edit Post </Text>
      </View>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageView}>
          {/* <HeaderBackButton onPress={() => navigation.goBack()} /> */}

          <Text style={styles.Postupload}> Update Photo </Text>
          <Image
            // @ts-ignore
            ImageComponent={() => (
              <FastImage
                source={{
                  uri: editPostData
                    ? editPostData.uri
                    : 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80',
                  priority: FastImage.priority.high,
                }}
                style={styles.EditPost}
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
              onPress={EditPost}
              activeOpacity={0.6}>
              <Icon name="cloud-upload" size={25} color={Colors.black} />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.Enterdescription}> Description </Text>
        <TextInput
          style={styles.descriptionbox}
          placeholder={'Lorem Ipsum Note that this is just an example, and you should customize the data to fit the specific product or service you are describing.'}
          placeholderTextColor="black"
          onChangeText={(text: React.SetStateAction<string>) =>
            setDescription(text)
          }
          value={description}
          multiline={true}
          numberOfLines={4}
        />
        <Text style={styles.Location}> Location </Text>

        <TextInput
          style={styles.locationbox}
          defaultValue="Default text"
          placeholder={'Halifax, Nova Scotia'}
          placeholderTextColor="black"
          onChangeText={(text: React.SetStateAction<string>) => setLocation(text)}
          value={location}
          multiline={true}
        />

        <CButton
          title="Choose location on map"
          onPress={() => navigate('')}
          containerStyle={{ marginTop: 40, marginLeft: 35, marginRight: 35 }}
          buttonStyle={{ backgroundColor: "#676767" }}
        />

        <CButton
          title="Update post"
          onPress={() => navigate('addpost')}
          containerStyle={{ marginTop: 40, marginLeft: 35, marginRight: 35 }}
        />
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
    textAlignVertical: 'top',
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
    textAlignVertical: 'top',
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
  EditPost: {
    width: 300,
    height: 150,
    borderRadius: 10,
    alignSelf: 'center'
  },
});

export default EditPost;
