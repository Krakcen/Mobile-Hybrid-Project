import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const stylesMainLoading = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20
  },
  loader: {
  }
});

export default ({ loaderColor, backgroundColor }) => (
  <View style={{ ...stylesMainLoading.container, backgroundColor }}>
    <ActivityIndicator style={stylesMainLoading.loader} color={loaderColor} size="large" />
  </View>
);
