// Welcome Screen that will be used to welcome the user

import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import React from 'react';
import { WelcomeScreenProp } from '@/types/types';
import Colors from '@/constants/Colors';

const WelcomeScreen = ({
  image,
  content,
  itemNumber,
  setItemNumber,
}: WelcomeScreenProp) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Image Component */}
      <View style={styles.imageTextContainer}>
        <Image source={image} />
        <Text style={styles.text}>{content}</Text>
      </View>

      {itemNumber < 2 && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => router.push('/(auth)/Login')}
            style={[styles.skipBtn, styles.Btn]}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setItemNumber(++itemNumber)}
            style={[styles.nextBtn, styles.Btn]}
          >
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}

      {itemNumber === 2 && (
        <TouchableOpacity
          onPress={() => router.push('/(auth)/Register')}
          style={[styles.skipBtn, styles.Btn, styles.welcomeBtn]}
        >
          <Text style={[styles.welcomeText]}>Welcome to Quotix</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 100,
    padding: 30,
  },
  imageTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  text: {
    textAlign: 'center',
    fontFamily: 'PoppinsSemiBold',
    fontSize: 16,
    marginTop: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },

  Btn: {
    minWidth: 60,
    padding: 4,
    borderRadius: 6,
  },
  skipBtn: {
    backgroundColor: Colors.primaryYellow,
  },
  skipText: {
    textAlign: 'center',
  },
  nextBtn: {
    backgroundColor: Colors.secondaryBlack,
  },
  nextText: {
    textAlign: 'center',
    color: 'white',
  },
  welcomeBtn: {
    // marginTop: -40,
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontFamily: 'PoppinsBold',
    fontSize: 18,
  },
});
