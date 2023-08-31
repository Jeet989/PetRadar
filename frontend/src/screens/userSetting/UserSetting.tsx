import React from 'react';
import { SafeAreaView, StyleSheet, Text, View , TouchableOpacity} from 'react-native';
import Background from '../../components/Background';
import Colors from '../../utils/Colors/Colors';
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Image } from '@rneui/themed';
import DocumentPicker from 'react-native-document-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FastImage from 'react-native-fast-image';
import { ListItem,Avatar, Card, Icon } from '@rneui/base';
import CButton from '../../components/CButton';




interface Props { }

const UserSetting: React.FC<Props> = (props: Props) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [userImageData, setUserImageData] = useState<any>(null);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const selectImage = async () => {
    try {
        const ImageData = await DocumentPicker.pickSingle({ allowMultiSelection: false, type: DocumentPicker.types.images })
        let data = new FormData();
        data.append('image', { uri: ImageData.uri, type: ImageData.type, name: ImageData.name })
        setUserImageData(ImageData)
    } catch (error) {
        console.log(error)
    }
}

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
                        ImageComponent={() => (<FastImage
                        source={{ uri: userImageData ? userImageData.uri : 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80', priority: FastImage.priority.high }}
                        style={styles.userImage}
                    />)}
                />
                </View>   
                <View style={styles.rightToImageContent}>
                    <Text style={styles.userTitleText}>Hi Full Name</Text>
                    <Text style={styles.userSubTitleText}>Let's find your furry friend's way back home </Text>
                </View>
            </View>
            {/* <Text style={styles.userSubTitleText}>Let's find your furry friend's way back home </Text> */}

            </View>
            {/* <View>
                <Text style={styles.userSubTitleText}>Let's find your furry friend's way back home </Text>

            </View>
            <Text style={styles.userSubTitleText}>Let's find your furry friend's way back home </Text>
            <Text style={styles.userSubTitleText}>Let's find your furry friend's way back home </Text>
            <ListItem bottomDivider containerStyle={styles.listItemContainer}>
                <Avatar
                rounded
                source={{ uri: 'https://randomuser.me/api/portraits/men/36.jpg' }}
                />
            <ListItem.Content>
            <ListItem.Title style={styles.listItemTitle}>John Doe</ListItem.Title>
            <ListItem.Subtitle>President</ListItem.Subtitle>
            </ListItem.Content>
            </ListItem> */}
           
           <View style={styles.horizontalLine}/>

            <View
                style={styles.tileContainer}>
                <View style={styles.tileIcon} >
                    <Icon
                        name='person'
                        type='material'
                        color={Colors.lightGrey}
                        size={50}
                    />   
                </View>
                <View style={styles.tileContent} >
                    <Text style={styles.tileTitle}>Personal Details</Text>
                    <Text style={styles.tileSubtitle}>Update your name, email and account password at any time</Text>
                </View>
            </View>

            <View style={styles.horizontalLine}/>

            <View
                style={styles.tileContainer}>
                <View style={styles.tileIcon} >
                    <Icon
                        name='list'
                        type='material'
                        color={Colors.lightGrey}
                        size={50}
                    />   
                </View>
                <View style={styles.tileContent} >
                    <Text style={styles.tileTitle}>Your Posts</Text>
                    <Text style={styles.tileSubtitle}>Manage your post name</Text>
                </View>
            </View>

            <View style={styles.horizontalLine}/>

            <View
                style={styles.tileContainer}>
                <View style={styles.tileIcon} >
                    <Icon
                        name='pets'
                        type='material'
                        color={Colors.lightGrey}
                        size={50}
                    />   
                </View>
                <View style={styles.tileContent} >
                    <Text style={styles.tileTitle}>Pets Details</Text>
                    <Text style={styles.tileSubtitle}>Manage your pet name, breed type and more</Text>
                </View>
            </View>

            <View style={styles.horizontalLine}/>

            <View
                style={styles.tileContainer}>
                <View style={styles.tileIcon} >
                    <Icon
                        name='notifications'
                        type='material'
                        color={Colors.lightGrey}
                        size={50}
                    />   
                </View>
                <View style={styles.tileContent} >
                    <Text style={styles.tileTitle}>Notification</Text>
                    <Text style={styles.tileSubtitle}>Manage the types of notification you receive</Text>
                </View>
            </View>

            <View style={styles.horizontalLine}/>

            <View
                style={styles.tileContainer}>
                <View style={styles.tileIcon} >
                    <Icon
                        name='delete'
                        type='material'
                        color={Colors.lightGrey}
                        size={50}
                    />   
                </View>
                <View style={styles.tileContent} >
                    <Text style={styles.tileTitle}>Delete Account</Text>
                    <Text style={styles.tileSubtitle}>Submit a request to delete your account</Text>
                </View>
            </View>

            <View style={styles.horizontalLine}/>

            <View style={styles.bottomBtn}>
            <CButton
                    isPrimaryBttn={true}
                    title={'Signup'}
                    onPress={{}}
                    titleStyle={styles.loginBttn}
            />
            </View>
            <View>
            <Text style={styles.versionText}>App Version: 0.0.1</Text>

            </View>
            
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    notificationHeader: {
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
        color: Colors.black,
        textAlign: 'center',
        paddingVertical: 20
    },
    notificationContentTitle: {
        fontFamily: 'Poppins-Bold',
        fontSize: 14,
        color: Colors.black,
        textAlign: 'left',
        paddingTop:12,
        paddingBottom:0
    },
    notificationContentDesc: {
        fontFamily: 'Poppins',
        fontSize: 12,
        color: Colors.lightGrey,
        textAlign: 'left',
        paddingTop:0,
    },
    contentView: {
        flex: 1,
        paddingTop:30,
        paddingBottom: 20,
        height:175,
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
        marginTop:0,
        width:170,
        top:0
        // width:100
        // paddingVertical: 0,
        // alignContent:'flex-end'
        // alignContent: 'center'

        // flex:1
    },
    horizontalLine : {
    borderBottomColor: Colors.black,
    borderBottomWidth: StyleSheet.hairlineWidth,
    },
    imageView: {
        alignItems: 'center',
        marginBottom: 21
    },
    userImage: {
        // box: 'border-box',

        // position: 'absolute',
        width: 73.5,
        height: 70,
        borderRadius:50
        // left: 7,
        // top: 7
        
    },
    rightToImageContent:{
        flexDirection: 'column',
        alignContent: 'center',
        paddingLeft:20
    },
    imageContentTile:{
        flexDirection:'row',
        left:50,
        top:27
    },
    cardContainer:{
        opacity:0.5
    },
    listItemContainer:{
        opacity:0.5
    },
    listItemTitle:{
        opacity:1
    },
    tileContainer : {
        flexDirection: 'row',
        height: 70,
        // padding: 10,
        // borderBottomColor: Colors.black,
        // borderBottomWidth: StyleSheet.hairlineWidth,
        paddingBottom:0,
        paddingTop:8
        // borderTopColor:Colors.black,
        // borderTopWidth: StyleSheet.hairlineWidth
    },
    tileIcon:{
        // backgroundColor: 'blue', 
        flex: 0.2,
        // alignContent:'center',
        // justifyContent:'center'
    },
    tileContent:{
        // backgroundColor: 'red', 
        flex: 0.8,
        paddingTop:5
        // borderBottomColor: Colors.black,
        // borderBottomWidth: StyleSheet.hairlineWidth,
    },
    tileTitle:{
        fontFamily: 'Poppins-Bold',
        fontSize: 14,
        color: Colors.black,
        textAlign: 'left',
        paddingTop:0,
        paddingBottom:0
    },
    tileSubtitle:{
        fontFamily: 'Poppins',
        fontSize: 10,
        color: Colors.lightGrey,
        textAlign: 'left',
        paddingTop:0,
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
        paddingTop:100,
        padding:20,
        // flex:0.5
    },
    versionText:{
        fontFamily: 'Poppins-Bold',
        fontSize: 10,
        color: Colors.black,
        textAlign: 'center',
        paddingTop:0,
        paddingBottom:0
    },
})



export default UserSetting;