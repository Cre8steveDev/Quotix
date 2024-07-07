import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';

import Colors from '@/constants/Colors';
import wc from '@/constants/WelcomeScreenAction';

import WelcomeScreen from '@/components/WelcomeScreen';

const Index = () => {
  const [itemNumber, setItemNumber] = useState(0);
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" animated />

      <WelcomeScreen
        image={wc[itemNumber].imageURI}
        content={wc[itemNumber].content}
        itemNumber={itemNumber}
        setItemNumber={setItemNumber}
      />
    </SafeAreaView>
  );
};

export default Index;

const LightMode = StyleSheet.create({
  text: {
    color: Colors.darkGray,
    fontSize: 18,
  },
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
