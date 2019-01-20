import React from 'react';
import {
  Text, View
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

class ProfileScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'My Profile',
    tabBarIcon: ({ tintColor }) => ((
      <View><FontAwesomeIcon color={tintColor} size={20} name="user-circle" /></View>
    ))
  };

  componentDidMount = () => {
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Profile Screen</Text>
      </View>
    );
  }
}

export default ProfileScreen;
