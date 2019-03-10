import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

const StatusBarIphone = ({ style }) => <View style={[styles.statusBarBackground, style || {}]} />;

const styles = StyleSheet.create({
  statusBarBackground: {
    height: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: 'white'
  }
});

export default StatusBarIphone;
