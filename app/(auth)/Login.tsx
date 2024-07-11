// Welcome Screen that will be used to welcome the user

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';

import React, { useState } from 'react';
import Colors from '@/constants/Colors';
import Logo from '@/constants/Logo';

import { LoginFormData } from '@/types/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomTextInput from '@/components/ui/CustomTextInput';
import CustomPasswordInput from '@/components/ui/CustomPasswordInput';
import CustomSubmitBtn from '../../components/ui/CustomSubmitBtn';
import { Ionicons } from '@expo/vector-icons';
import blurhash from '@/constants/BlurHash';
import { signIn } from '@/providers/firebase/firebaseFunctions';
import { useAppContext } from '@/providers/context/AppContext';

const initialFormData: LoginFormData = {
  email: '',
  password: '',
};

const LoginScreen = () => {
  const router = useRouter();
  const { setUser, state } = useAppContext();

  //   Define state to hold form values
  const [formData, setFormData] = useState<LoginFormData>(initialFormData);
  const [formError, setFormError] = useState({
    emailError: false,
    passwordError: false,
  });
  const [loading, setLoading] = useState(false);

  //   Handle Login Form Submission
  const handleSubmitForm = async () => {
    try {
      setLoading(true);
      const response = await signIn(
        formData.email.toLowerCase(),
        formData.password,
        setUser
      );

      if (!response.success) throw new Error(response.message);

      // Catch Errors
    } catch (error: any) {
      Alert.alert('An Error Occured 🤔', error.message);
    } finally {
      setLoading(false);
    }
  };

  //   Handle Google Auth Submission
  const handleGoogleAuth = () => {
    try {
      setLoading(true);
      console.warn('GoogleAuth Processed');
      router.push('/(tabs)/Home');
    } catch (error) {
      console.warn(error);
    } finally {
    }
  };

  //   Return JSX
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      {/* View container begins here */}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <View style={styles.imgContainer}>
          <Image
            source={Logo}
            style={styles.img}
            placeholder={{ blurhash }}
            contentFit="cover"
            alt="Quotix Logo"
            transition={1000}
          />
        </View>

        {/* Introductory Text Copy */}
        <View>
          <Text style={styles.headerText}>Nice to See You Again! 😁</Text>
          <Text style={styles.subtitle}>Enter Your Details to Log In</Text>
        </View>

        {/* Form View Begins */}
        <View style={styles.formContainer}>
          {/* Email Address */}
          <CustomTextInput
            value={formData.email}
            placeholder="Enter Your Email Address"
            keyBoardType="email-address"
            setValue={(value) => {
              setFormData((prev) => {
                return { ...prev, email: value };
              });
            }}
          />

          {/* Password  */}
          <CustomPasswordInput
            value={formData.password}
            placeholder="Enter Your Password"
            setValue={(value) => {
              setFormData((prev) => {
                return { ...prev, password: value };
              });
            }}
          />
          {/* Submit Form For Sign In */}
          <CustomSubmitBtn
            text={loading ? 'Processing...' : 'Log In'}
            textColor={Colors.darkGray}
            bgColor={Colors.primaryYellow}
            onPress={async () => await handleSubmitForm()}
            children={
              <Ionicons
                name="person-add"
                color={loading ? '#bfbfbf' : Colors.darkGray}
                size={20}
              />
            }
            disabled={loading}
          />

          {/* Google Sign In Button */}
          <CustomSubmitBtn
            text={loading ? 'Processing' : 'Sign In With Google'}
            textColor={'white'}
            bgColor={Colors.googleBlue}
            // onPress={() => handleGoogleAuth()}
            onPress={() => Alert.alert('Feature Coming soon...')}
            children={
              <Ionicons
                name="logo-google"
                color={loading ? '#bfbfbf' : Colors.white}
                size={20}
              />
            }
            disabled={loading}
          />

          {/* Already Logged In Text Copy */}
          <TouchableOpacity onPress={() => router.push('/(auth)/Register')}>
            <Text style={styles.subtext}>
              Already have an account?
              <Text style={styles.textCTA}> Sign Up Now!</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
    padding: 30,
  },

  headerText: {
    fontSize: 20,
    fontFamily: 'PoppinsBold',
    color: Colors.primaryYellow,
  },
  subtitle: { textAlign: 'center', fontSize: 16 },
  subtext: { textAlign: 'center', fontSize: 14 },
  formContainer: {
    width: '100%',
    gap: 10,
  },
  textCTA: { fontFamily: 'PoppinsBold' },
  imgContainer: {
    width: '100%',
    alignItems: 'center',
  },
  img: { width: 100, height: 50, borderRadius: 10 },
});
