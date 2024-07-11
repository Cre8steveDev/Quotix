import { Alert, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useAppContext } from '@/providers/context/AppContext';
import LogoNameHeader from '@/components/ui/Home/LogoNameHeader';
import SearchBar from '@/components/ui/Home/SearchBar';
import TenRandomQuotesList from '../../components/ui/Home/TenRandomQuotes';
import { useRouter } from 'expo-router';

const Home = () => {
  // Retrieve User Data from App Context
  const { state } = useAppContext();
  const router = useRouter();

  // Set State for the search text input
  const [searchText, setSearchText] = useState('');

  // Handle Search
  const handleSearch = (text: string) => {
    if (searchText.length < 3) return;
    const cleanText = searchText.trim().toLowerCase();
    router.push(`/(tabs)/Random?search=${cleanText}`);
  };
  console.log(state);

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

        {/* Component that renders the Top Ten Routes */}
        <TenRandomQuotesList />
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
