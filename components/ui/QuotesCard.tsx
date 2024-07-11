import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { QuotesData } from '@/types/types';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useAppContext } from '@/providers/context/AppContext';
import {
  addQuoteToFirestore,
  removeQuoteFromFirestore,
} from '@/providers/firebase/firebaseFunctions';
import useToast from './Toasts';

import * as Clipboard from 'expo-clipboard';

const QuotesCard = ({
  _id,
  content,
  author,
  tags,
  index,
}: QuotesData & { index: number }) => {
  const { state, addQuoteToLocalState, removeQuoteFromLocalState } =
    useAppContext();

  const alternating = index % 2 === 0;
  const isAlreadySaved = state.savedQuotes.find((quote) => quote._id === _id);
  const quoteObj = { _id, content, author, tags, index };

  // Save Quote Function
  const handleSaveQuote = async () => {
    // Store Quote to Local Storage
    try {
      await addQuoteToLocalState(quoteObj);
    } catch (error) {
      useToast('Error Saving Quote to Local Storage', '#ff6666', 'white');
    }
    // Store Quote to FireStore Database for remote access
    try {
      const response = await addQuoteToFirestore(state.user?.uid, quoteObj);
      if (!response.success) throw new Error();
    } catch (error) {
      useToast('Error Saving Quote to Remote Storage', '#ff6666', 'white');
    }
  };

  // Remove Quote From Saved
  const removeSavedQuote = async () => {
    if (!isAlreadySaved) return;
    try {
      await removeQuoteFromLocalState(quoteObj);
    } catch (error) {
      useToast('Error Removing Quote to Remote Storage', '#ff6666', 'white');
    }
    // Remove quote from FireStore Database
    try {
      const response = await removeQuoteFromFirestore(
        state.user?.uid,
        quoteObj
      );
      if (!response.success) throw new Error();
    } catch (error) {
      Alert.alert('Error Removing Quote from Remote Storage');
      console.log(error);
    }
  };

  // Copy the quote Content and Author to Clipboard
  const handleCopyToClipBoard = async () => {
    try {
      await Clipboard.setStringAsync(`${content} - ${author}`);
      useToast(`Quote by ${author} copied.`);
    } catch (error) {
      useToast('Error Copying to Clipboard', 'red', 'white');
    }
  };

  // Return JSX
  return (
    <View
      style={[
        styles.container,
        alternating ? styles.container1 : styles.container2,
        index === 9 ? { marginBottom: 120 } : {},
      ]}
      accessibilityLabel={'Individual Quotes Card'}
      accessibilityRole={'none'}
      accessible={true}
      importantForAccessibility={'auto'}
      nativeID={_id}
      pointerEvents={'auto'}
      removeClippedSubviews={false}
    >
      {/* Quote Text Container */}
      <View style={styles.textContainer}>
        <Text style={[styles.text, alternating ? styles.text1 : styles.text2]}>
          {content}
        </Text>
        <Text
          style={[styles.subtitle, alternating ? styles.text1 : styles.text2]}
        >
          {author}
        </Text>
      </View>

      {/*  Container for Tag and Save Buttons */}
      <View style={styles.actionContainer}>
        {/* Tag */}
        {tags.length >= 1 && <Text style={styles.tagContainer}>{tags[0]}</Text>}
        <View style={styles.saveContainer}>
          {/* Copy Quote Content to Clip Board */}
          <TouchableOpacity onPress={handleCopyToClipBoard}>
            <Ionicons
              name="copy"
              style={styles.saveContainer}
              size={20}
              color={alternating ? 'white' : 'black'}
            />
          </TouchableOpacity>

          {/* Show button to save to local */}
          {!isAlreadySaved && (
            <TouchableOpacity>
              <Ionicons
                name="bookmark"
                style={styles.saveContainer}
                size={20}
                color={alternating ? 'white' : 'black'}
                onPress={async (e) => await handleSaveQuote()}
              />
            </TouchableOpacity>
          )}

          {isAlreadySaved && (
            <TouchableOpacity>
              <Ionicons
                name="remove"
                style={styles.saveContainer}
                size={20}
                color={alternating ? 'white' : 'black'}
                onPress={async (e) => await removeSavedQuote()}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default QuotesCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 15,
    padding: 20,
  },
  container1: {
    backgroundColor: Colors.darkGray,
  },
  container2: {
    backgroundColor: Colors.primaryYellow,
    color: 'black',
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
  },
  text1: {
    color: 'white',
  },
  text2: {
    color: 'black',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 8,
  },
  actionContainer: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tagContainer: {
    backgroundColor: Colors.gray75,
    padding: 2,
    paddingHorizontal: 5,
    borderRadius: 7,
    fontSize: 12,
  },
  textContainer: {
    height: '87%',
    justifyContent: 'center',
  },
  saveContainer: {
    flexDirection: 'row',
    gap: 10,
  },
});
