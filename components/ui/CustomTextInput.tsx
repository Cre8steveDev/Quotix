import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { CustomTextInputProp } from '@/types/types';
import Colors from '@/constants/Colors';

const CustomTextInput = ({
  value,
  setValue,
  placeholder,
  textColor,
  bgColor,
  keyBoardType = 'default',
}: CustomTextInputProp) => {
  return (
    <View>
      <TextInput
        style={[
          styles.input,
          {
            color: textColor ? textColor : Colors.secondaryBlack,
            backgroundColor: bgColor ? bgColor : '#e6e6e6',
          },
        ]}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        placeholderTextColor={'#b3b3b3'}
        cursorColor={'#b3b3b3'}
        keyboardAppearance="light"
        keyboardType={keyBoardType}
        autoComplete="off"
        // textContentType="none" // iOS-specific
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  input: {
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
    padding: 8,
    paddingTop: 11,
    borderRadius: 10,
  },
});
