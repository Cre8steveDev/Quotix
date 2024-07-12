import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import { auth } from '@/providers/firebase/firebaseConfig';
import { Redirect, useLocalSearchParams } from 'expo-router';
import { QuotesData } from '@/types/types';
import axios from 'axios';
import QuotesCard from '@/components/ui/QuotesCard';
import ActivityIndicatorComp from '@/components/ActivityIndicatorComp';
import EmptyQuotesList from '@/components/ui/EmptyQuotesList';
import useToast from '@/components/ui/Toasts';

const Random = () => {
  // Set State for updating Fetched Quotes
  const [quotes, setQuotes] = useState<QuotesData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [headingTitle, setHeadingTitle] = useState('Random Quotes Page');
  const [refreshing, setRefreshing] = useState(false);

  // Get Authentication Status
  const user = auth.currentUser;
  const { tag, search } = useLocalSearchParams();

  if (!user) {
    return <Redirect href={'/(auth)/Login'} />;
  }

  // Fetch Quotes based on Tag
  const handleFetchByTag = async () => {
    try {
      const response = await axios.get(
        `https://api.quotable.io/quotes/random?tags=${tag}&limit=20`
      );
      setQuotes(response.data);
      setRefreshing(false);
    } catch (error: any) {
      useToast('An Error occured trying to fetch quotes.', 'red', 'white');
    }
  };
  // Fetch Random Quotes based on search query
  const handleFetchBySearch = async () => {
    try {
      const response = await axios.get(
        `https://api.quotable.io/quotes/random?query=${search}&limit=20`
      );
      setQuotes(response.data);
      setRefreshing(false);
    } catch (error: any) {
      useToast('An Error occured trying to fetch quotes.', 'red', 'white');
    }
  };
  // Fetch Random Data when no query params
  const handleNormalFetch = async () => {
    try {
      const response = await axios.get(
        `https://api.quotable.io/quotes/random?limit=20`
      );
      setQuotes(response.data);
      setRefreshing(false);
    } catch (error: any) {
      useToast('An Error occured trying to fetch quotes.', 'red', 'white');
    }
  };

  //  Handle Refresh of the list
  const handleRefresh = async () => {
    setRefreshing(true);
    if (tag) return await handleFetchByTag();
    if (search) return await handleFetchBySearch();

    return await handleNormalFetch();
  };
  // Fetch Data based on what came in.
  useEffect(() => {
    setLoading(true);
    setError(false);

    try {
      if (tag) {
        setHeadingTitle(`Random Quotes by Tag: ${tag}`);
        handleFetchByTag();
      } else if (search) {
        setHeadingTitle(`Search For: ${search}`);
        handleFetchBySearch();
      } else {
        handleNormalFetch();
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [tag, search]);

  // Return activity indicator while quotes loading
  if (!quotes && loading)
    return <ActivityIndicatorComp text="Loading Quotes..." />;

  // Return No Quotes have been saved Component
  if ((quotes && quotes.length < 1) || !quotes)
    return (
      <EmptyQuotesList title="Errrm🤕" message="Nothing to Show here yet." />
    );

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <RandomQuotesHeader heading={headingTitle} />

        {/* Display the quotes  */}
        {quotes && quotes.length > 1 && (
          <FlatList
            style={styles.listContainer}
            data={quotes}
            showsVerticalScrollIndicator={false}
            extraData={null}
            numColumns={1}
            initialNumToRender={10}
            keyExtractor={(item) => item._id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <QuotesCard
                key={item._id}
                _id={item._id}
                content={item.content}
                author={item.author}
                tags={item.tags}
                index={index}
              />
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={[Colors.primaryYellow, Colors.googleBlue]} // Android
                tintColor={Colors.googleBlue} // iOS
                title="Refreshing..." // iOS
                titleColor={Colors.primaryYellow} // iOS
              />
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Random;

const styles = StyleSheet.create({
  listContainer: { paddingBottom: 0 },
  container: {
    borderRadius: 5,
    padding: 10,
    height: '99%',
    width: '97%',
    marginHorizontal: 'auto',
  },

  headingText1: {
    fontFamily: 'PoppinsExtraBold',
    fontSize: 28,
    textAlign: 'center',
    marginTop: 10,
  },
  headingText2: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: -10,
    marginBottom: 15,
  },
  text: { color: Colors.darkGray },
  headerContainer: {},
  safeArea: {
    flex: 1,
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

const RandomQuotesHeader = ({ heading }: { heading: string }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headingText1}>{heading}</Text>
      <Text style={styles.headingText2}>
        Be inspired by random quotes from great minds. 😊
      </Text>

      <Text style={styles.headingText2}>Draw down to refresh.</Text>
    </View>
  );
};
