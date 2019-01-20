import React from 'react';
import {
  Text, View
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

class AboutScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Info',
    tabBarIcon: ({ tintColor }) => ((
      <View><AntDesignIcon color={tintColor} size={20} name="infocirlce" /></View>
    ))
  };

  componentDidMount = () => {
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>About Screen</Text>
      </View>
    );
  }
}

export default AboutScreen;
