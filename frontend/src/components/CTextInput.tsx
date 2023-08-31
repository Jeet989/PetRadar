import React, { useState } from 'react';
import { Platform, StyleSheet, TextInput } from 'react-native';
import Colors from '../utils/Colors';

interface Props {
  placeholder: string;
  onSubmitEditing: any;
  inputStyle: any;
  keyboardType?: any;
}

const CTextInput: React.FC<Props> = (props: Props) => {
  const [input, setInput] = useState<string>('');
  return (
    <TextInput
      placeholder={props.placeholder}
      placeholderTextColor={Colors.placeholderColor}
      style={{ ...styles.input, ...props.inputStyle }}
      value={input}
      onChangeText={setInput}
      keyboardType={props.keyboardType}
      onSubmitEditing={() => props.onSubmitEditing()}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: Colors.borderColor,
    borderWidth: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    paddingHorizontal: 22,
    borderRadius: 30,
    color: Colors.black,
    height: Platform.OS === 'ios' ? 50 : 52,
  },
});

export default CTextInput;
