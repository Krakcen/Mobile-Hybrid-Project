// import { createBottomTabNavigator, cre } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import MapScreen from '../containers/screens/MapScreen';
import AboutScreen from '../containers/screens/AboutScreen';
import SearchEventScreen from '../containers/screens/SearchEventScreen';
import CreateEventScreen from '../containers/screens/CreateEventScreen';
import ProfileScreen from '../containers/screens/ProfileScreen';

import AV from '../AppVariables';

export default createMaterialBottomTabNavigator(
  {
    SearchEvent: { screen: SearchEventScreen },
    CreateEvent: { screen: CreateEventScreen },
    Map: { screen: MapScreen },
    Profile: { screen: ProfileScreen },
    About: { screen: AboutScreen }
  },
  {
    initialRouteName: 'CreateEvent',
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
