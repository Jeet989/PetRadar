import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Switch } from 'react-native';
import Background from '../../components/Background';
import Colors from '../../utils/Colors/Colors';
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import OneSignal, { DeviceState } from 'react-native-onesignal';
import { PERMISSIONS, check, request } from 'react-native-permissions';
interface Props { }

const Notification: React.FC<Props> = (props: Props) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    useEffect(() => {

        check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS).then(async res => {

            //   console.log("onesignalUserId", onesignalUserId)
            request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS).then(async res => {
                const oneSignalId = await OneSignal.getDeviceState()
                setIsEnabled(oneSignalId?.userId ? true : false)
            })
        })
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Background />
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.notificationHeader}>Notification</Text>
                <View style={styles.horizontalLine} />
                <View style={styles.contentView}>

                    <View style={{ flexDirection: 'row' }}>
                        <View >
                            <Text style={styles.notificationContentTitle}>Allow App to send Post Notification</Text>
                            <Text style={styles.notificationContentDesc}>Allow App to send Post Notification</Text>

                        </View>
                        <Switch
                            trackColor={{ false: '#767577', true: Colors.primary }}
                            thumbColor={isEnabled ? Colors.white : Colors.white}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                            style={{ flex: 1 }}
                        />
                    </View>
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
        paddingTop: 12,
        paddingBottom: 0
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
        paddingBottom: 20
    },
    horizontalLine: {
        borderBottomColor: Colors.black,
        borderBottomWidth: StyleSheet.hairlineWidth,
    }
})



export default Notification;