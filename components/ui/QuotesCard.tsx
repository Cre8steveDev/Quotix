import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { QuotesData } from '@/types/types';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useAppContext } from '@/providers/context/AppContext';

const QuotesCard = ({
  _id,
  content,
  author,
  tags,
  index,
}: QuotesData & { index: number }) => {
  const { state } = useAppContext();

  const alternating = index % 2 === 0;
  const isAlreadySaved = state.savedQuotes.find((quote) => quote._id === _id);

  // Save Quote Function
  const handleSaveQuote = () => {};

  // Remove Quote From Saved
  const removeSavedQuote = () => {
    if (!isAlreadySaved) return;
  };
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
        <View>
          {!isAlreadySaved && (
            <Ionicons
              name="bookmark"
              style={styles.saveContainer}
              size={20}
              color={alternating ? 'white' : 'black'}
              onPress={(e) => handleSaveQuote()}
            />
          )}

          {isAlreadySaved && (
            <Ionicons
              name="remove"
              style={styles.saveContainer}
              size={20}
              color={alternating ? 'white' : 'black'}
              onPress={(e) => removeSavedQuote()}
            />
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
    height: 170,
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
  saveContainer: {},
});
