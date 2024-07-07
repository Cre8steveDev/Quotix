import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';

const Random = () => {
  const user = null;
  if (!user) {
    return (
      <SafeAreaView style={styles.loading}>
        <ActivityIndicator
          size="large"
          color={Colors.primaryYellow}
          style={styles.indicator}
        />
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <View style={styles.container}>
        <Text>Random</Text>
      </View>
    </SafeAreaView>
  );
};

export default Random;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primaryYellow,
  },

  container: {
    flex: 1,
    // backgroundColor: 'white',
    padding: 20,
  },

  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    transform: 'scale(1.3)',
    marginBottom: 10,
  },
});
