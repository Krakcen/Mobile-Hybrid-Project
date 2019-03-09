import React from 'react';
import {
  Text, View
} from 'react-native';

class SingleEventScreen extends React.Component {
  static navigationOptions = {
  };

  componentDidMount = () => {
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>SingleEventScreen</Text>
      </View>
    );
  }
}

export default SingleEventScreen;
