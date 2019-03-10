import React from 'react';
import { Text, View, Button } from 'react-native';
import { Input } from 'react-native-elements';
import * as firebaseService from '../../services/firebase';

class LoginScreen extends React.Component {
  state = {
    email: null,
    password: null,
    passwordError: null,
    emailError: null,
    loggedIn: false,
    suEmailError: null,
    suPasswordError: null,
    suNickError: null
  };

  interval = null;

  componentDidMount = () => {
    const { navigation } = this.props;

    navigation.navigate('Main');
    // firebaseService.listenToAuthUser((user) => {
    //   if (user) {
    //     this.setState({ loggedIn: true });
    //   } else {
    //     this.setState({ loggedIn: false });
    //   }
    // });
    // const { loggedIn } = this.state;
    // if (loggedIn) {
    //   firebaseService.logOutCurrentUser();
    // }
  };

  componentWillUnmount = () => {};

  render() {
    const { navigation } = this.props;
    const {
      countFinished,
      passwordError,
      emailError,
      suEmailError,
      suPasswordError,
      suNickError
    } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {countFinished && <Text>You logged in !</Text>}
        <Text>Login</Text>
        <Input
          placeholder="Email Address"
          textContentType="emailAddress"
          errorMessage={emailError}
          onChangeText={(text) => {
            if (!text.length) {
              this.setState({ emailError: 'Email Required' });
            }
            this.setState({ email: text });
          }}
        />
        <Input
          placeholder="Password"
          textContentType="password"
          secureTextEntry
          errorMessage={passwordError}
          onChangeText={(text) => {
            if (!text.length) {
              this.setState({ passwordError: 'Password Required' });
            }
            this.setState({ password: text });
          }}
        />
        <Button
          onPress={async () => {
            const { email, password, loggedIn } = this.state;
            if (email && password && email.length && password.length) {
              await firebaseService.loginUser(email, password);
              if (loggedIn) {
                navigation.navigate('Main');
              } else {
                this.setState({ passwordError: 'Invalid Password or email' });
              }
            } else {
              this.setState({ passwordError: 'Password Required', emailError: 'Email Required' });
            }
          }}
          title="Login"
        />
        <Text>Sign Up</Text>
        <Input
          placeholder="Email Address"
          textContentType="emailAddress"
          errorMessage={suEmailError}
          onChangeText={(text) => {
            if (!text.length) {
              this.setState({ suEmailError: 'Email Required' });
            }
            this.setState({ email: text });
          }}
        />
        <Input
          placeholder="Password"
          textContentType="password"
          secureTextEntry
          errorMessage={suPasswordError}
          onChangeText={(text) => {
            if (!text.length) {
              this.setState({ suPasswordError: 'Password Required' });
            }
            this.setState({ password: text });
          }}
        />
        <Input
          placeholder="Nickname"
          textContentType="nickname"
          errorMessage={suNickError}
          onChangeText={(text) => {
            if (!text.length) {
              this.setState({ suNickError: 'Nickname Required' });
            }
            this.setState({ nick: text });
          }}
        />
        <Button
          onPress={async () => {
            const { email, password, nick } = this.state;
            firebaseService.signUpUser(email, password).then(() => {
              firebaseService.loginUser(email, password).then(() => {
                const { loggedIn } = this.state;
                if (loggedIn) {
                  firebaseService.createUser(email, nick);
                  navigation.navigate('Main');
                }
              });
            });
          }}
          title="Sign-Up"
        />
      </View>
    );
  }
}

export default LoginScreen;
