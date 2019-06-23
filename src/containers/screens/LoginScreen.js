import React from 'react';
import { View } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import * as firebaseService from '../../services/firebase';
import { logUser } from '../../redux/actions/loginActions';

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

  componentDidMount = async () => {
    const { connectUser, navigation } = this.props;
    firebaseService.listenToAuthUser((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
    const uid = await firebaseService.getCurrentUser();
    if (uid) {
      const user = await firebaseService.fetchUser(uid);
      user.once('value').then((snapshot) => {
        console.log(snapshot);

        connectUser(
          snapshot.val() && snapshot.val().email,
          (snapshot.val() && snapshot.val().nick) || 'Anonymous',
          uid
        );
        navigation.navigate('Main');
      });
    }
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
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-evenly'
        }}
      >
        {countFinished && <Text>You logged in !</Text>}
        <Text
          style={{
            marginTop: 100,
            fontSize: 25,
            fontWeight: 'bold'
          }}
        >
          Log In
        </Text>
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
          style={{ marginBottom: 35 }}
          onPress={async () => {
            const { email, password } = this.state;
            const { connectUser } = this.props;
            if (email && password && email.length && password.length) {
              await firebaseService.loginUser(email, password).then(async () => {
                const uid = await firebaseService.getCurrentUser();
                if (uid) {
                  const user = await firebaseService.fetchUser(uid);

                  user.once('value').then((snapshot) => {
                    connectUser(email, (snapshot.val() && snapshot.val().nick) || 'Anonymous', uid);
                    navigation.navigate('Main');
                  });
                  // alert(this.props.logUser);
                } else {
                  this.setState({ passwordError: 'Invalid Password or email' });
                }
              });
            } else {
              this.setState({ passwordError: 'Password Required', emailError: 'Email Required' });
            }
          }}
          title="Login"
        />
        <Text style={{ marginTop: 35, fontSize: 25, fontWeight: 'bold' }}>Sign Up</Text>
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
            const { connectUser } = this.props;
            firebaseService.signUpUser(email, password).then(async () => {
              console.log('Signup Worked');

              firebaseService
                .loginUser(email, password)
                .then(async () => {
                  console.log('Login Worked');

                  const { loggedIn } = this.state;
                  if (loggedIn) {
                    firebaseService.createUser(email, nick);
                    const uid = await firebaseService.getCurrentUser();
                    const user = await firebaseService.fetchUser(uid);
                    user.once('value').then((snapshot) => {
                      connectUser(
                        email,
                        (snapshot.val() && snapshot.val().nick) || 'Anonymous',
                        uid
                      );
                    });
                    navigation.navigate('Main');
                  }
                })
                .catch((e) => {
                  console.error(e);
                });
            });
          }}
          title="Sign-Up"
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { login } = state;
  return { login };
};

export default connect(
  mapStateToProps,
  { connectUser: logUser }
)(LoginScreen);
