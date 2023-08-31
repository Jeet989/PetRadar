import React from 'react';
import  DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Button, Platform, Text, View,StyleSheet, } from "react-native";
import DButton from './DButton';
import CButton from './CButton';
import Colors from '../utils/Colors/Colors';

interface Props{
  title:string,
  containerStyle?: any,
  returnData: (value: any) => any,
  initialDate?: any
}
const CDateTimePicker:React.FC<Props> = (props: Props) => {
  const [date, setDate] = useState( new Date());
  const [visibleDate, setVisibleDate] = useState( new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
  
    const onChange = (event: any, selectedDate: any) => {
      const currentDate = selectedDate;
      setShow(false);
      console.log(currentDate)
      setDate(currentDate);
      setVisibleDate(currentDate)
      props.returnData(currentDate.toString())
    };
  
    const showMode = (currentMode: any) => {
      if (Platform.OS === 'android') {
        setShow(true);
        // for iOS, add a button that closes the picker
      }
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      console.log('opennnnn')
      showMode('date');
    };
  
    const showTimepicker = () => {
      showMode('time');
    };
  
    return (
      <View>
        <DButton  onPress={showDatepicker} isPrimaryBttn={true} title={props.title}  />
        {/* <Button onPress={showTimepicker} title="Show time picker!" /> */}
          {/* <Text style={styles.dateTextstyle}>selected: {date.toLocaleString()} </Text> */}
          {visibleDate ? <Text style={styles.dateTextstyle}>selected: {visibleDate.toLocaleDateString()}</Text> : 
          <Text style={styles.dateTextstyle}>Select Appropriate Date</Text>
          } 
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            maximumDate={new Date()}
            is24Hour={true}
            onChange={onChange}
          />
        )}
      </View>
    );

  
  };
  const styles =StyleSheet.create({
    dateTextstyle:{
      fontFamily: 'Poppins-Bold',
      fontSize: 15,
      color: Colors.black,
      textAlign: 'center',
      paddingVertical: 20

    }

  })

export default CDateTimePicker