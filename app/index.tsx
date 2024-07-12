import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import wc from '@/constants/WelcomeScreenAction';

import WelcomeScreen from '@/components/WelcomeScreen';
import { Redirect, useRouter } from 'expo-router';
import { useAppContext } from '@/providers/context/AppContext';
import { auth } from '@/providers/firebase/firebaseConfig';

const Index = () => {
  const [itemNumber, setItemNumber] = useState(0);
  const router = useRouter();

  // Get User Data and Auth Status for
  // Redirecting to Home Page if auth
  // is valid or user is in state
  const { state } = useAppContext();
  const user = auth.currentUser;

  if (user || state.user) {
    return <Redirect href={'/(tabs)/Home'} />;
  }

  // Return the Welcome Screen when app loads
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
