import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import Socrates from '@/constants/Socrates';

const EmptyQuotesList = ({
  title,
  message,
}: {
  title: string;
  message: string;
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          source={Socrates}
          style={styles.image}
          resizeMode="cover"
          alt="Socrates - No Quotes"
        />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </SafeAreaView>
  );
};

export default EmptyQuotesList;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '70%',
  },
  title: {
    textAlign: 'center',
    fontSize: 55,
    fontFamily: 'PoppinsExtraBold',
  },
  message: {
    textAlign: 'center',
    fontSize: 15,
    paddingHorizontal: 20,
  },
});
