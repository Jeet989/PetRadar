import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, FlatList, Modal, Pressable, RefreshControl, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../utils/Colors/Colors';
import { Divider, Image } from '@rneui/themed';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import GeoLocation from 'react-native-geolocation-service'
import axiosInstance from '../../utils/API/axiosInstance';
import { deletePostAPI, getPetProfile, getPostAPI } from '../../utils/API/routes';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

interface Props { }

const Feed: React.FC<Props> = (props: Props) => {
    const reduxData = useSelector(state => state)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [postData, setPostData] = useState([]);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [isFound, setIsFound] = useState<boolean>(false);
    const [value, setValue] = useState<any>();
    const [showQRCode, setShowQRCode] = useState<boolean>(false);
    const [qrCode, setQrCode] = useState<string>('');

    const fetchUserPosts = () => {
        requestMultiple([PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION, PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION])
            .then((statuses) => {
                if (statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] === 'granted' && statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === 'granted') {
                    GeoLocation.getCurrentPosition(async (position) => {
                        await axiosInstance.get(getPostAPI + position.coords.latitude + '/' + position.coords.longitude)
                            .then(res => {
                                setIsLoading(false)
                                setRefreshing(false)
                                setPostData(res.data.data.posts)
                            })
                            .catch(er => {
                                console.log('er ==+>', er)
                                setRefreshing(false)
                            });
                    }, (error) => {
                        console.log('error', error)
                    }, {
                        enableHighAccuracy: true,
                        timeout: 15000,
                        maximumAge: 10000,
                    })
                } else {
                    Alert.alert('Please allow location permission to get nearby alerts')
                }
            })
    }

    useEffect(() => {
        fetchUserPosts()
    }, [])

    const onRefresh = () => {
        setRefreshing(true);
        fetchUserPosts()
    }

    const onPressFound = (item: any) => {
        setIsFound(true)
        setValue(item)
    }

    const renderItem = ({ item, _ }: any) => {
        return (
            <View style={styles.rednerView}>
                <View style={styles.cardHeader}>
                    <Image
                        // @ts-ignore
                        ImageComponent={() => <FastImage
                            source={{ uri: item.userProfilePicture ? item.userProfilePicture : 'https://1.bp.blogspot.com/-kK7Fxm7U9o0/YN0bSIwSLvI/AAAAAAAACFk/aF4EI7XU_ashruTzTIpifBfNzb4thUivACLcBGAsYHQ/s1280/222.jpg', priority: FastImage.priority.high }}
                            style={styles.profilePic}
                        />}
                    />

                    <View style={styles.userDetailsView}>
                        <Text style={styles.username}>{item.userName}</Text>
                    </View>

                </View>
                {/* <Divider color={Colors.borderColor} width={1.2} style={styles.divider} /> */}

                <View>
                    <Text style={styles.description}>{item.description}</Text>
                    <Image
                        // @ts-ignore
                        ImageComponent={() => <FastImage
                            source={{ uri: item.imageUrl, priority: FastImage.priority.high }}
                            style={styles.feedImage}
                        />}
                    />

                    <TouchableOpacity style={styles.foundBttn} onPress={() => onPressFound(item)}>
                        <Text style={styles.found}>Found?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    if (isLoading) {
        return (
            <SafeAreaView style={styles.indicatorView}>
                <ActivityIndicator
                    size={'large'}
                    color={Colors.primary}
                />
            </SafeAreaView>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Fluffy Alert</Text>
            <FlatList
                data={postData}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                ListEmptyComponent={() => <View style={styles.emptyView}><Text style={styles.emptyPosts}>No Posts Found</Text></View>}
                keyExtractor={(_, index) => index.toString()}
            />

            <Modal
                visible={isFound}
                transparent={true}
                onRequestClose={() => setIsFound(false)}
            >
                <View
                    style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}
                >
                    <Pressable
                        style={styles.modalDismissView}
                        onPress={() => setIsFound(false)}>

                        <View style={styles.genderContentView}>

                            <TouchableOpacity
                                style={styles.bttnMale}
                                onPress={async () => {
                                    setIsFound(false);
                                    if (value.userId === reduxData?.auth?.userId) {
                                        axiosInstance.delete(deletePostAPI + '/' + value.item.postId)
                                            .then(res => {
                                                const updatedPostData = postData.filter((item: any) => item.postId !== value.item.postId)
                                                setPostData(updatedPostData)
                                            })
                                            .catch(err => {
                                                Toast.show({ type: 'error', text1: 'Error', text2: 'Something went wrong' })
                                            })
                                    } else {
                                        const response = await axiosInstance.get(getPetProfile + '/' + value.userId);
                                        const petProfile = response?.data?.data?.petProfile;
                                        if (petProfile) {
                                            setIsFound(false)
                                            setShowQRCode(true)
                                            setQrCode('data:image/jpeg;base64,' + petProfile.petQrImage)
                                        } else {
                                            setIsFound(false)
                                            setValue(null)
                                        }
                                    }
                                }}>

                                <Fontisto
                                    name="checkbox-active"
                                    color={Colors.borderColor}
                                    size={20}
                                    style={styles.caret}
                                />
                                <Text style={styles.male}>Yes!!! Found It</Text>
                            </TouchableOpacity>
                            <Divider color={Colors.black} />
                            <TouchableOpacity
                                style={styles.bttnMale}
                                onPress={() => {
                                    setIsFound(false);
                                    setValue(null)
                                }}>

                                <Fontisto
                                    name="checkbox-active"
                                    size={20}
                                    color={Colors.borderColor}
                                    style={styles.caret}
                                />
                                <Text style={styles.male}>No Luck. Still Finding...</Text>
                            </TouchableOpacity>
                        </View>
                    </Pressable>
                </View>
            </Modal>

            <Modal
                visible={showQRCode}
                transparent={true}
                style={{ flex: 1 }}
                onRequestClose={() => setShowQRCode(false)}
            >
                <Pressable
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}
                    onPress={() => setShowQRCode(false)}
                >
                    <Image
                        // @ts-ignore
                        ImageComponent={() => <FastImage
                            source={{ uri: qrCode, priority: FastImage.priority.high }}
                            style={{ width: 300, height: 300 }}
                        />}
                    />
                </Pressable>
            </Modal>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    male: {
        color: Colors.black,
        fontFamily: 'Poppins-Regular',
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
    emptyPosts: {
        textAlign: 'center',
        paddingVertical: 20,
        color: Colors.black,
        fontSize: 20,
        fontFamily: 'Poppins-Regular',
        flex: 1,
    },
    emptyView: {
        flex: 1,
        justifyContent: 'center'
    },
    description: {
        color: Colors.black,
        fontSize: 16,
        fontFamily: 'Poppins-Regular'
    },
    indicatorView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    found: {
        color: Colors.black,
        textAlign: 'center',
        paddingVertical: 18,
        fontFamily: 'Poppins-Bold',
        fontSize: 16
    },
    foundBttn: {
        backgroundColor: Colors.found
    },
    feedImage: {
        width: '100%',
        height: 300,
    },
    divider: {
        width: Dimensions.get('window').width / 1.1,
        marginHorizontal: 20
    },
    location: {
        color: Colors.lightGrey,
        fontSize: 10,
        fontFamily: 'Poppins-Regular',
    },
    username: {
        color: Colors.black,
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
    },
    userDetailsView: {
        marginLeft: 10,
        justifyContent: 'center'
    },
    cardHeader: {
        flexDirection: 'row',
        marginHorizontal: 7,
        marginBottom: 15
    },
    rednerView: {
        flex: 1,
        marginBottom: 15
    },
    profilePic: {
        height: 42,
        width: 42,
        borderRadius: 24.5,
    },
    header: {
        color: Colors.black,
        fontSize: 24,
        fontFamily: 'Poppins-Bold',
        textAlign: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})

export default Feed;
