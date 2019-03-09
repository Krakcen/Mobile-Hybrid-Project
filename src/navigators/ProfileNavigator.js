import { createStackNavigator } from 'react-navigation';

import ProfileScreen from '../containers/screens/ProfileScreen';
import SingleEventScreen from '../containers/screens/SingleEventScreen';

export default createStackNavigator(
  {
    ProfileMain: {
      screen: ProfileScreen,
      navigationOptions: () => ({
        headerMode: 'none'
      })
    },
    SingleEvent: { screen: SingleEventScreen }
  },
  {
    initialRouteName: 'ProfileMain'
  }
);
