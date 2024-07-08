import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { SkeletonLoaderProp } from '@/types/types';

const SkeletonLoader = ({ width, height, style }: SkeletonLoaderProp) => {
  return (
    <MotiView
      from={{
        opacity: 0.1,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        type: 'timing',
        duration: 1000,
        loop: true,
      }}
      style={[styles.skeleton, { width, height }, style]}
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    borderRadius: 4,
  },
});

export default SkeletonLoader;
