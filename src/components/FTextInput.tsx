import React from 'react';
import { Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import Colors from '../utils/Colors/Colors';

interface Props {
  field: {
    name: string;
    onBlur: any;
    onChange: any;
    value: string;
  };
  form: {
    errors: any;
    touched: any;
    setFieldTouched: any;
  };
  multiline: boolean;
  numberOfLines: number;
  inputProps: any;
  editable: boolean;
  innerRef: React.Ref<TextInput> | null;
}

const FTextInput: React.FC<Props> = (props: Props) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    innerRef,
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <View>
      <TextInput
        ref={innerRef}
        style={[
          props.multiline ? styles.multiLineTextInput : styles.textInput,
          hasError && styles.errorInput,
          props.editable === false ? { color: Colors.placeholderColor } : {},
        ]}
        placeholderTextColor={Colors.placeholderColor}
        value={value}
        onChangeText={text => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        blurOnSubmit={false}
        {...inputProps}
      />

      {hasError ? <Text style={styles.errorText}>{errors[name]}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    position: 'absolute',
    bottom: 5,
    left: 20,
    color: Colors.errorRed,
    fontFamily: 'Poppins-SemiBold',
  },
  errorInput: {
    marginBottom: 30,
  },
  multiLineTextInput: {
    borderColor: Colors.borderColor,
    borderWidth: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    paddingHorizontal: 22,
    borderRadius: 30,
    color: Colors.black,
    marginBottom: 21,
    height: 100,
    paddingTop: 15,
    textAlignVertical: 'top',
  },
  textInput: {
    borderColor: Colors.borderColor,
    borderWidth: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    paddingHorizontal: 22,
    borderRadius: 30,
    color: Colors.black,
    height: Platform.OS === 'ios' ? 50 : 52,
    marginBottom: 21,
  },
});

export default FTextInput;
