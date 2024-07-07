import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '@/providers/context/AppContext';
import { auth } from '@/providers/firebase/firebaseConfig';

const Profile = () => {
  const { state } = useAppContext();
  const user = auth.currentUser;
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text>Context User Profile</Text>
        <Text>{state.user?.email}</Text>
        <Text>{state.user?.uid}</Text>

        <Text>Auth User Profile</Text>
        <Text>{user?.email}</Text>
        <Text>{user?.uid}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
    // backgroundColor: 'white',
    padding: 20,
  },
});
