/**
 * SearchBar
 */

import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { SearchBarProp } from '@/types/types';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

// Define Props for the searchBar Component
const SearchBar = ({
  searchText,
  setsearchText,
  searchAction,
}: SearchBarProp) => {
  // Reusable Search Bar Component
  return (
    <View style={styles.container}>
      <TextInput
        value={searchText}
        onChangeText={setsearchText}
        placeholder="Search..."
        placeholderTextColor={Colors.darkGray}
        cursorColor={Colors.darkGray}
        style={styles.textInput}
      />
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => {
          Keyboard.dismiss();
          searchAction(searchText);
        }}
      >
        <FontAwesome
          name="search"
          size={24}
          color="white"
          style={styles.text}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryYellow,
    justifyContent: 'space-between',
    paddingRight: 4,
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
    overflow: 'hidden',
    borderRadius: 10,
  },
  textInput: {
    width: '80%',
    padding: 10,
    fontSize: 18,
  },
  text: { textAlign: 'center' },
  iconContainer: {
    backgroundColor: Colors.darkGray,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    borderRadius: 11,
    width: 40,
    height: 40,
  },
});
