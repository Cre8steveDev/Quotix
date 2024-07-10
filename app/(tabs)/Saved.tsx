import { StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SavedQuotesTab from '../../components/ui/SavedQuotesTab';

const Saved = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <SavedQuotesTab />
    </SafeAreaView>
  );
};

export default Saved;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
    padding: 20,
  },
});
