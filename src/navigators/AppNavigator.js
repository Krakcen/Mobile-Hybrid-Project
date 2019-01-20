import React, { Component } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';

const AppNavigator = createAppContainer(
  createSwitchNavigator(
    {
      Main: MainNavigator,
      Auth: AuthNavigator
    },
    {
      initialRouteName: 'Auth'
    }
  )
);

class Nav extends Component {
  componentDidMount = () => {};

  render() {
    return <AppNavigator />;
  }
}

export default Nav;
