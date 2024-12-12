import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';

type BarSlideLoaderProps = {
  show: boolean;
};

export const CircleLoader = ({show}: BarSlideLoaderProps) => {
  return show ? (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(4, 18, 29, 0.1)',
    height: '100%',
    zIndex: 9999,
  },
});
