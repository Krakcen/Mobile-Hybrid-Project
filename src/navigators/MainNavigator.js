import React from 'react';
import { View } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import ProfileNavigator from './ProfileNavigator';
import MapScreen from '../containers/screens/MapScreen';
import AboutScreen from '../containers/screens/AboutScreen';
import CreateEventScreen from '../containers/screens/CreateEventScreen';

import AV from '../AppVariables';

export default createMaterialBottomTabNavigator(
  {
    CreateEvent: { screen: CreateEventScreen },
    Map: { screen: MapScreen },
    Profile: {
      screen: ProfileNavigator,
      navigationOptions: () => ({
        tabBarLabel: 'My Profile',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <FontAwesomeIcon color={tintColor} size={20} name="user-circle" />
          </View>
        )
      })
    },
    About: { screen: AboutScreen }
  },
  {
    initialRouteName: 'Profile',
    shifting: true,
    activeColor: AV.primaryColor,
    inactiveColor: AV.gray,
    barStyle: { backgroundColor: 'white' }
  }
);

// export default createBottomTabNavigator(
//   {
//     SearchEventScreen: { screen: SearchEventScreen },
//     Map: { screen: MapScreen },
//     About: { screen: AboutScreen }
//   },
//   {
//     initialRouteName: 'Map',
//     headerMode: 'none', // I don't want a NavBar at top
//     tabBarPosition: 'bottom', // So your Android tabs go bottom
//     tabBarOptions: {
//       activeTintColor: '#3b5998',
//       inactiveTintColor: '#cccccc',
//       labelStyle: {
//         fontWeight: 'bold'
//       }
//     }
//   }
// );
