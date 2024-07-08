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
import { GET_ALL_TAGS } from '@/constants/ApiLinks';
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';
import axios from 'axios';

type ListsData = {
  _id: string;
  name: string;
  slug: string;
  quoteCount: number;
};

const CategoryList = () => {
  const [list, setLists] = useState<ListsData[] | null>(null);

  useEffect(() => {
    axios
      .get(GET_ALL_TAGS)
      .then((response) => {
        setLists(response.data.slice(0, 10));
      })
      .catch((error) => {
        // setLists([]);
        setLists(null);
        console.log('Error Occurred', error);
      });
  }, []);

  return (
    <View>
      {/* Text heading */}
      <View style={styles.headingContainer}>
        <Text style={styles.headingText1}>Categories</Text>
        <Text style={styles.headingText2}>View All</Text>
      </View>

      {/* Skeleton Loader for while loading  */}
      {!list && (
        <SkeletonLoader width={'100%'} height={50} style={styles.skeleton} />
      )}

      {/* ScrollView that has the categories 
	  retrieved from quotable.io API */}
      {list && list.length > 1 && (
        <FlatList
          style={styles.mainContainer}
          data={list}
          horizontal
          extraData={null}
          numColumns={1}
          initialNumToRender={10}
          keyExtractor={(item) => item._id}
          showsHorizontalScrollIndicator={false}
          //   onEndReached={() => Alert.alert('End of List Reached.')}
          renderItem={({ item, index, separators }) => (
            <Link href={`/modal?quoteId=${item._id}`} style={styles.container}>
              <View>
                <Text style={styles.text}>{item.name}</Text>
              </View>
            </Link>
          )}
        />
      )}
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: Colors.gray75,
  },
  mainContainer: { paddingBottom: 15 },
  container: {
    backgroundColor: Colors.gray75,
    borderRadius: 5,
    padding: 10,
    marginRight: 8,
  },
  headingContainer: {
    justifyContent: 'space-between',
    alignContent: 'center',
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
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
