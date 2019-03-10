import React from 'react';
import { Text, TouchableOpacity, Platform } from 'react-native';

export default ({ active, setOff, errorText }) => (
  <React.Fragment>
    {active ? (
      <TouchableOpacity
        onPress={setOff}
        style={{
          position: 'absolute',
          bottom: 0,
          height: 50,
          width: 1000,
          backgroundColor: 'crimson',
          padding: 10,
          alignSelf: 'stretch',
          textAlign: 'center'
        }}
      >
        <Text style={{ fontWeight: 'bold', color: 'white' }}>{errorText}</Text>
      </TouchableOpacity>
    ) : null}
  </React.Fragment>
);
