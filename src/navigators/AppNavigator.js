import React, { Component } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import store from '../redux/configureStore';

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
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

export default Nav;
