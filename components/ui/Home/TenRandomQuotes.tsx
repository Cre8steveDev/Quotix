import {
  Alert,
  StyleSheet,
  Text,
  TouchableHighlight,
  FlatList,
  View,
  Button,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import SkeletonLoader from '../SkeletonLoader';
import { GET_TEN_RANDOM_QUOTES } from '@/constants/ApiLinks';
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';
import axios from 'axios';

import { QuotesData } from '@/types/types';
import QuotesCard from '../QuotesCard';
import CategoryList from './CategoryList';

import useToast from '../Toasts';
import EmptyQuotesList from '../EmptyQuotesList';

const TenRandomQuotesList = () => {
  const [quotes, setQuotes] = useState<QuotesData[] | null>(null);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(false);

  // Function to get quotes
  const handleFetchTenQuotes = () => {
    setError(false);

    // Perform fetch
    fetch(GET_TEN_RANDOM_QUOTES, { method: 'GET' })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setQuotes(data);
        setError(false);
      })
      .catch((error) => {
        useToast('There was an error Fetching Quotes.', 'red', 'white');
        setError(true);
      });
  };

  useEffect(() => {
    handleFetchTenQuotes();
  }, []);

  return (
    <View>
      {/* Ten Skeleton Loaders For the Quotes  */}
      {quotes === null &&
        !error &&
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <SkeletonLoader
            key={item}
            width={'100%'}
            height={165}
            style={styles.skeleton}
          />
        ))}
      {error && (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Text style={styles.errorText}>Error getting Data.</Text>
          <Button
            title="Tap to Try Again. 🫣"
            color={Colors.primaryYellow}
            onPress={() => handleFetchTenQuotes()}
          />
        </View>
      )}

      {/* Display the quotes  */}
      {quotes && (
        <FlatList
          style={styles.mainContainer}
          data={quotes}
          showsVerticalScrollIndicator={false}
          extraData={null}
          numColumns={1}
          initialNumToRender={10}
          keyExtractor={(item) => item._id}
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={<CategoryList />}
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

export default TenRandomQuotesList;

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: Colors.gray75,
    marginBottom: 15,
  },
  mainContainer: { paddingBottom: 15 },
  container: {
    backgroundColor: Colors.gray75,
    borderRadius: 5,
    padding: 10,
    marginRight: 8,
  },

  headingText1: {
    fontFamily: 'PoppinsExtraBold',
    fontSize: 21,
  },
  headingText2: {
    fontSize: 14,
    alignSelf: 'center',
  },
  text: { color: Colors.darkGray },
  errorText: {
    fontSize: 24,
    fontFamily: 'PoppinsBold',
    marginBottom: 10,
  },
  errorBtn: {},
});
