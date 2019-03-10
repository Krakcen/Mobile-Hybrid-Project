import React from 'react';
import { Text, View, PanResponder } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

class ProfileScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'My Profile',
    tabBarIcon: ({ tintColor }) => (
      <View>
        <FontAwesomeIcon color={tintColor} size={20} name="user-circle" />
      </View>
    )
  };

  constructor(props) {
    super(props);
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {},
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        const { navigation } = props;
        if (gestureState.dx < -200) {
          navigation.navigate('About');
        } else if (gestureState.dx > 200) {
          navigation.navigate('Map');
        }
      },
      onPanResponderTerminate: (evt, gestureState) => {}
    });
  }

  componentDidMount = () => {};

  render() {
    const { login } = this.props;
    return (
      <View
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        {...this.panResponder.panHandlers}
        collapsable={false}
      >
        <Text>Profile Screen</Text>
        <Text>
          {login.email}
          {' '}
          {login.nick}
          {' '}
          {login.uid}
        </Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { login } = state;
  return { login };
};

export default connect(mapStateToProps)(ProfileScreen);
