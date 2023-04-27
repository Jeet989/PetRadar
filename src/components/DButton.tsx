import { Button } from '@rneui/themed';
import React from 'react';
import { Platform } from 'react-native';
import { StyleSheet } from 'react-native';
import Colors from '../utils/Colors/Colors';

interface Props {
    title: string,
    iconPosition?: "left" | "right" | "bottom" | "top",
    icon?: JSX.Element,
    isPrimaryBttn?: boolean,
    onPress: any,
    containerStyle?: any,
    iconContainerStyle?: any,
    titleStyle?: any,
    buttonStyle?: any
}

const DButton: React.FC<Props> = (props: Props) => {
    return (
        <Button
            icon={props.icon}
            title={props.title}
            onPress={props.onPress}
            style={styles.style}
            titleStyle={{  ...styles.titleStyle }}
            buttonStyle={{ ...styles.buttonStyle}}
            iconPosition={props.iconPosition}
            iconContainerStyle={{ ...props.iconContainerStyle }}
            containerStyle={{ ...styles.containerStyle, ...props.containerStyle }}
        />
    )
}

const styles = StyleSheet.create({
    titleStyle: {
        fontFamily: "Poppins-SemiBold",
        color: Colors.white,
        fontSize: 20
    },
    buttonStyle: {
        backgroundColor: Colors.black,
        paddingVertical: Platform.OS === 'ios' ? 12 : 7,
        borderColor: Colors.transparent,
        borderWidth: 0,
    },
    style: {
    },
    containerStyle: {
        borderRadius: 27,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.white
    }
})

export default DButton;