import React from 'react';
import {
  Text, View
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

class SearchEventScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Search',
    tabBarIcon: ({ tintColor }) => ((
      <View><FontAwesomeIcon color={tintColor} size={20} name="search" /></View>
    ))
  };

  componentDidMount = () => {
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Search Event Screen</Text>
      </View>
    );
  }
}

export default SearchEventScreen;
