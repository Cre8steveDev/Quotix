import {
  Alert,
  StyleSheet,
  Text,
  TouchableHighlight,
  FlatList,
  View,
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

const TenRandomQuotesList = () => {
  const [quotes, setQuotes] = useState<QuotesData[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);

    axios
      .get(GET_TEN_RANDOM_QUOTES)
      .then((response) => {
        setQuotes(response.data.slice(0, 10));
      })
      .catch((error) => {
        setQuotes([]);
        setError(true);
        console.log('Error Occurred', error);
      });
  }, []);

  return (
    <View>
      {/* Ten Skeleton Loaders For the Quotes  */}
      {!quotes &&
        !error &&
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <SkeletonLoader
            key={item}
            width={'100%'}
            height={165}
            style={styles.skeleton}
          />
        ))}

      {/* Display the quotes  */}
      {quotes && quotes.length > 1 && (
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
});
