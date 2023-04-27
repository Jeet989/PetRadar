import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import MapView, { ClickEvent, LatLng, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import Colors from '../../../utils/Colors/Colors';
import CButton from '../../../components/CButton';
import { useNavigation } from '@react-navigation/native';

interface Props {
    callback: any
}

const CMapView: React.FC<Props> = (props: Props) => {
    const navigation = useNavigation();
    console.log('CMapView', props)
    const [markerLocation, setMarkerLocation] = useState<LatLng>();
    const [userLocation, setUserLocation] = useState<LatLng>();

    useEffect(() => {
        requestMultiple([PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION, PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION])
            .then((statuses) => {
                if (statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] === 'granted' && statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === 'granted') {
                    Geolocation.getCurrentPosition((position) => {
                        console.log(position);
                        setUserLocation({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        })
                    }, (error) => {
                        console.log(error);
                    }, {
                        enableHighAccuracy: true,
                        timeout: 20000,
                        maximumAge: 1000
                    })
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    const dropMarker = (e: ClickEvent) => {
        setMarkerLocation({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude
        })
    }

    if (!userLocation) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size={'large'} color={Colors.primary} animating={true} />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={{
                    latitude: userLocation.latitude,
                    longitude: userLocation.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                showsUserLocation={true}
                onPress={dropMarker}
            >
                {markerLocation ? <Marker coordinate={{
                    latitude: markerLocation.latitude,
                    longitude: markerLocation.longitude
                }} /> : null}
            </MapView>

            <CButton
                title='Done'
                onPress={() => {
                    props.callback(markerLocation)
                    // navigation.goBack()
                }}
                containerStyle={{ width: 200, marginBottom: 30 }}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },

})

export default CMapView;