import React from 'react';
import { Text, View, Platform } from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

class MapScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Map',
    tabBarIcon: ({ tintColor }) => ((
      <View><IoniconsIcon color={tintColor} size={20} name="md-map" /></View>
    ))
  };

  componentDidMount = () => {};

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Here, we display the map with the events</Text>
        <AntDesignIcon size={100} name={Platform.OS === 'ios' ? 'apple1' : 'android1'} />
      </View>
    );
  }
}

export default MapScreen;
