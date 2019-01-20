import React from 'react';
import {
  Text, View
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

class CreateEventScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'New Event',
    tabBarIcon: ({ tintColor }) => ((
      <View><AntDesignIcon color={tintColor} size={20} name="pluscircle" /></View>
    ))
  };

  componentDidMount = () => {
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Create Event Screen</Text>
      </View>
    );
  }
}

export default CreateEventScreen;
