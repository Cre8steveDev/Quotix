import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { CustomTextInputProp } from '@/types/types';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const CustomPasswordInput = ({
  value,
  setValue,
  placeholder,
  textColor,
  bgColor,
  keyBoardType,
}: CustomTextInputProp) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View
      style={[
        styles.inputContainer,
        { backgroundColor: bgColor ? bgColor : '#e6e6e6' },
      ]}
    >
      <TextInput
        style={[
          styles.input,
          {
            color: textColor ? textColor : Colors.secondaryBlack,
          },
        ]}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        secureTextEntry={!showPassword}
        placeholderTextColor={'#b3b3b3'}
        cursorColor={'#b3b3b3'}
        keyboardAppearance="light"
        keyboardType={keyBoardType}
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TouchableOpacity
        onPress={() => setShowPassword(!showPassword)}
        style={styles.iconContainer}
      >
        <Ionicons
          name={showPassword ? 'eye-off' : 'eye'}
          size={24}
          color="#b3b3b3"
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomPasswordInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    padding: 8,
    paddingTop: 11,
    borderRadius: 10,
  },
  input: {
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
    width: '90%',
  },
  iconContainer: {},
});
