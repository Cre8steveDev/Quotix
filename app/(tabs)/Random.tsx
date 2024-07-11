import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import { useAppContext } from '@/providers/context/AppContext';
import { auth } from '@/providers/firebase/firebaseConfig';
import { useLocalSearchParams } from 'expo-router';
import { QuotesData } from '@/types/types';
import axios from 'axios';
import { BASE_API } from '@/constants/ApiLinks';
import QuotesCard from '@/components/ui/QuotesCard';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import ActivityIndicatorComp from '@/components/ActivityIndicatorComp';
import EmptyQuotesList from '@/components/ui/EmptyQuotesList';
import useToast from '@/components/ui/Toasts';

const Random = () => {
  // Set State for updating Fetched Quotes
  const [quotes, setQuotes] = useState<QuotesData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Get Authentication Status
  const user = auth.currentUser;
  const { tag, search } = useLocalSearchParams();

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

  // Fetch Data based on what came in.
  useEffect(() => {
    setLoading(true);
    setError(false);
    setQuotes([]);

    try {
      // Fetch Quotes based on Tag
      if (tag) {
        console.log(tag);
        axios
          .get(`https://api.quotable.io/quotes/random?tags=${tag}&limit=20`)
          .then((res) => {
            console.log(res.data);
            setQuotes(res.data);
          });
      }
      // Fetch Random Quotes based on search query
      else if (search) {
      }
      // Fetch Random Data when no query params
      else {
        setQuotes([]);
      }
    } catch (error) {
      useToast('An Error occured trying to fetch quotes.', 'red', 'white');
    } finally {
      setLoading(false);
    }
  }, [tag, search]);

  //  Return JSX to View
  // Return activity indicator while saved quotes loading
  if (loading) return <ActivityIndicatorComp text="Loading Quotes..." />;

  // Return No Quotes have been saved Component
  if (quotes && quotes?.length < 1)
    return (
      <EmptyQuotesList
        title="Oops! 🤔"
        message="You do not have any saved quotes at the moment. Explore the Home or Random Tab"
      />
    );

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <RandomQuotesHeader />

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
            renderItem={({ item, index, separators }) => (
              <QuotesCard
                key={item._id}
                _id={item._id}
                content={item.content}
                author={item.author}
                tags={item.tags}
                index={index}
              />
            )}
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
    fontSize: 32,
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

const RandomQuotesHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headingText1}>Random Quotes Page</Text>
      <Text style={styles.headingText2}>
        Be inspired by quotes you saved previously. 😊
      </Text>
    </View>
  );
};
