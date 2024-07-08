import { Alert, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useAppContext } from '@/providers/context/AppContext';
import LogoNameHeader from '@/components/ui/Home/LogoNameHeader';
import SearchBar from '@/components/ui/Home/SearchBar';
import CategoryList from '@/components/ui/Home/CategoryList';

const Home = () => {
  // Retrieve User Data from App Context
  const { state } = useAppContext();

  // Set State for the search text input
  const [searchText, setSearchText] = useState('');

  // Handle Search
  const handleSearch = (text: string) => {
    if (searchText.length < 3) return;

    Alert.alert('SEARCH BUTTON CLICKED');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        {/* Place Logo and name  */}
        <LogoNameHeader userName={state.user?.userName} />

        {/* Search Bar Component for querying based on word in the quote */}
        <SearchBar
          searchText={searchText}
          setsearchText={(text) => setSearchText(text)}
          searchAction={(text) => handleSearch(text)}
        />

        {/* Component that renders Category List */}
        <CategoryList />
      </View>
    </SafeAreaView>
  );
};

export default Home;

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
