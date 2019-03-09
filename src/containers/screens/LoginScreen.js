import React from 'react';
import { Text, View } from 'react-native';

class LoginScreen extends React.Component {
  state = {
    count: 3,
    countFinished: false
  };

  interval = null;

  incrementCounter = () => {
    const { count } = this.state;
    const { navigation } = this.props;

    if (count - 1 <= 0) {
      this.setState({ countFinished: true, count: 0 });
      navigation.navigate('Main');
    } else this.setState({ count: count - 1 });
  };

  componentDidMount = () => {
    this.props.navigation.navigate('Main');
    this.interval = setInterval(() => {
      this.incrementCounter();
    }, 1000);
  };

  componentWillUnmount = () => {
    clearInterval(this.interval);
  }

  render() {
    const { count, countFinished } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{`Login in ${count}`}</Text>
        {countFinished && <Text>You logged in !</Text>}
      </View>
    );
  }
}

export default LoginScreen;
