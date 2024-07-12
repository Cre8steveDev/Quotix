import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '@/providers/context/AppContext';
import { auth } from '@/providers/firebase/firebaseConfig';

import ProfilePic from '@/constants/ProfilePic';
import Colors from '@/constants/Colors';

const Profile = () => {
  const { state } = useAppContext();
  const user = auth.currentUser;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          source={ProfilePic}
          style={styles.imageContainer}
          resizeMode="cover"
        />
        <Text style={styles.headingText}>{state.user?.userName}</Text>
        <Text style={styles.details}>{user?.email}</Text>
        {/* Saved Quote Counts */}
        <View style={styles.headingContainer}>
          <Text style={styles.subHeading}>Saved Quotes</Text>
          <Text style={styles.quoteNumber}>
            {state.savedQuotes
              ? state.savedQuotes.length.toString().padStart(2, '0')
              : '00'}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  imageContainer: {
    borderRadius: 15,
    width: 150,
    height: 150,
  },
  headingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText: {
    fontSize: 35,
    fontFamily: 'PoppinsExtraBold',
  },
  subHeading: {
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'PoppinsBold',
    color: Colors.gray75,
    fontSize: 24,
  },
  quoteNumber: {
    textAlign: 'center',
    fontFamily: 'PoppinsBold',
    color: Colors.primaryYellow,
    fontSize: 80,
    marginTop: -20,
  },
  details: {
    backgroundColor: Colors.gray75,
    color: Colors.darkGray,
    fontSize: 16,
    padding: 6,
    marginTop: -6,
    paddingHorizontal: 10,
    textAlign: 'center',
    borderRadius: 10,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
