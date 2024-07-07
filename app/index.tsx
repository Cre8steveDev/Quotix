import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import wc from '@/constants/WelcomeScreenAction';

import WelcomeScreen from '@/components/WelcomeScreen';
import { useRouter } from 'expo-router';
import { useAppContext } from '@/providers/context/AppContext';
import { auth } from '@/providers/firebase/firebaseConfig';

const Index = () => {
  const [itemNumber, setItemNumber] = useState(0);
  const router = useRouter();

  // Get User Data and Auth Status for
  // Redirecting to Home Page if auth
  // has expired.
  const { state } = useAppContext();
  const user = auth.currentUser;

  // Introduce a local state to help handle conditional
  // Navigation for when the user's data is stored in DB
  const [shouldNavigate, setShouldNavigate] = useState(false);

  useEffect(() => {
    if (state.user && user) {
      setShouldNavigate(true);
    } else {
      setShouldNavigate(false);
    }
  }, [state.user]);

  // When the component mounts and the auth status
  // of the user is valid, or if
  // the user is coming from a forward page then redirect to Home Page.
  useEffect(() => {
    if (shouldNavigate || user) {
      router.dismissAll();
      router.replace('/(tabs)/Home');
    }
  }, [shouldNavigate, router]);

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
