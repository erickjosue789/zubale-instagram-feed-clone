import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const ErrorStateImage = ({ style, onRetry }) => {
  return (
    <View style={[style, styles.errorContainer]}>
      <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
        <Ionicons name="reload-outline" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  retryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});

export default ErrorStateImage;
