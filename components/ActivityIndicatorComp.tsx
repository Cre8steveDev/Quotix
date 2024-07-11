import { ActivityIndicator, StyleSheet, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';

const ActivityIndicatorComp = ({ text }: { text: string }) => {
  return (
    <SafeAreaView style={styles.loading}>
      <ActivityIndicator
        size="large"
        color={Colors.primaryYellow}
        style={styles.indicator}
      />
      <Text>{text}</Text>
    </SafeAreaView>
  );
};

export default ActivityIndicatorComp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
