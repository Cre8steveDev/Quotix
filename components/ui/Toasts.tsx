import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '@/constants/Colors';

type ToastProp = {
  title?: string;
  message?: string;
  category?: 'info' | 'success' | 'error';
  onClose: () => void;
};

const Toasts = ({ title, message, category, onClose }: ToastProp) => {
  if (category === 'success')
    return (
      <TouchableOpacity
        onPress={onClose}
        style={[styles.container, styles.success]}
      >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </TouchableOpacity>
    );

  if (category === 'error')
    return (
      <TouchableOpacity onPress={onClose}>
        <Text>{title}</Text>
        <Text>{message}</Text>
      </TouchableOpacity>
    );

  if (category === 'info')
    return (
      <TouchableOpacity onPress={onClose}>
        <Text>{title}</Text>
        <Text>{message}</Text>
      </TouchableOpacity>
    );
};

export default Toasts;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    left: 10,
    width: '85%',
    height: 40,
    padding: 15,
  },
  success: {
    backgroundColor: Colors.primaryYellow,
  },
  title: {},
  message: {},
});
