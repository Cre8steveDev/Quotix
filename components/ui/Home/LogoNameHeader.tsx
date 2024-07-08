import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import React from 'react';
import Logo from '@/constants/Logo';
import Colors from '@/constants/Colors';

type LogoNameHeaderProp = {
  userName: string;
};
const LogoNameHeader = ({ userName }: LogoNameHeaderProp) => {
  return (
    <View style={styles.container}>
      <Image
        source={Logo}
        style={styles.image}
        contentFit="cover"
        transition={1000}
        alt="Logo"
      />
      <Text style={styles.text}>
        Hello, <Text>{userName}</Text>
      </Text>
    </View>
  );
};

export default LogoNameHeader;

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 30,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    fontFamily: 'PoppinsExtraBold',
    fontSize: 20,
    color: Colors.darkGray,
  },
});
