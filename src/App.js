// @flow

import React from 'react';
import { Provider } from 'react-redux';
import AppNavigator from './navigators/AppNavigator';
import store from './redux/configureStore';

type Props = {};

type State = {};

export default class App extends React.Component<Props, State> {
  componentDidMount = () => {};

  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

/*
  OLD

  in componentDidMount:
    console.log('allo');
    Do firebase things
    const { user } = await firebase.auth().signInAnonymously();
    console.warn('User -> ', user.toJSON());
    await firebase.analytics().logEvent('foo', { bar: '123'});

  in render:
    const database = firebase.database();
      database
        .ref('/users/User1')
        .once('value')
        .then(() => {
          // param snapshot
          // console.log((snapshot.val() && snapshot.val().username) || 'Anonymous');
          // ...
        });
      // console.log('test');
 */
