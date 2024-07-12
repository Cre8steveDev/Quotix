import { Alert, StyleSheet, Text, FlatList, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import SkeletonLoader from './SkeletonLoader';
import Colors from '@/constants/Colors';
import axios from 'axios';

import { QuotesData } from '@/types/types';
import QuotesCard from './QuotesCard';
import { useAppContext } from '@/providers/context/AppContext';
import ActivityIndicatorComp from '../ActivityIndicatorComp';
import EmptyQuotesList from './EmptyQuotesList';
import { getCurrentUserData } from '@/providers/firebase/firebaseFunctions';
import useToast from './Toasts';

const SavedQuotesTab = () => {
  const [loading, setLoading] = useState(false);

  const { state, setState } = useAppContext();

  // Kindda weird that I'm preferring loading
  // saved quotes from remote, when I'm also
  // Persisting it on mobile storage. But allow lol
  useEffect(() => {
    setLoading(true);

    try {
      // Attempt to retrieve from remote DB
      getCurrentUserData().then((res) => {
        if (res) {
          setState((prev) => ({ ...prev, savedQuotes: res.savedQuotes }));
        }
      });
    } catch (error) {
      setState((prev) => ({ ...prev, savedQuotes: [] }));
      useToast('Sorry. There was an error saved quote.', 'red', 'white');
    } finally {
      setLoading(false);
    }
  }, []);

  // Return activity indicator while saved quotes loading
  if (loading || !state.savedQuotes)
    return <ActivityIndicatorComp text="Loading Saved Quotes..." />;

  // Return No Quotes have been saved Component
  if (state.savedQuotes.length === 0)
    return (
      <EmptyQuotesList
        title="Oops! 🤔"
        message="You do not have any saved quotes at the moment. Explore the Home or Random Tab"
      />
    );

  return (
    <View style={styles.container}>
      {/* Display the quotes  */}
      {state.savedQuotes.length > 0 && (
        <FlatList
          style={styles.listContainer}
          data={state.savedQuotes}
          showsVerticalScrollIndicator={false}
          extraData={null}
          numColumns={1}
          initialNumToRender={10}
          keyExtractor={(item) => item._id}
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={<SavedQuotesHeader />}
          // stickyHeaderIndices={[1]} This is used to make a particular
          // index of an element of the list to be sticky
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
  );
};

export default SavedQuotesTab;

const SavedQuotesHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headingText1}>Saved Quotes</Text>
      <Text style={styles.headingText2}>
        Be inspired by quotes you saved previously. 😊
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: Colors.gray75,
    marginBottom: 15,
  },

  listContainer: { paddingBottom: 0 },
  container: {
    // backgroundColor: Colors.gray75,
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
});
