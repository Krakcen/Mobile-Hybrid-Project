import React from 'react';
import { View, ScrollView, PanResponder } from 'react-native';
import firebase from 'react-native-firebase';
import { Avatar, Text, ListItem } from 'react-native-elements';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import AV from '../../AppVariables';
import ErrorMessage from '../../utils/ErrorMessage';

const database = firebase.database();

class ProfileScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'My Profile',
    tabBarIcon: ({ tintColor }) => (
      <View>
        <FontAwesomeIcon color={tintColor} size={20} name="user-circle" />
      </View>
    )
  };

  state = {
    profileError: false,
    eventList: []
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

  componentDidMount = async () => {
    const { login } = this.props;
    const { eventList } = this.state;

    try {
      const eventRef = database.ref('/Events');

      eventRef
        .orderByChild('owner')
        .equalTo(login.uid)
        .on('child_added', (snapshot) => {
          const dataEvent = snapshot.val();

          eventList.push({
            ...dataEvent,
            avatar_url:
              'https://i0.wp.com/menaentrepreneur.org/wp-content/uploads/2017/06/Event-management-1.png',
            subtitle: dataEvent.description
          });

          this.setState({
            eventList
          });
        });
    } catch (error) {
      this.setState({ profileError: error.message });
    }
  };

  goToSingleEvent = (event) => {
    const { navigation } = this.props;

    navigation.navigate('SingleEvent', { event });
  };

  render() {
    const { login } = this.props;
    const { eventList, profileError } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 225, backgroundColor: AV.primaryColor }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Avatar size="large" rounded title="HV" />
            <Text style={{ marginTop: 10, color: 'white', fontSize: 17 }}>{login.email}</Text>
            <Text style={{ marginTop: 10, color: 'white' }}>{`@${login.nick}`}</Text>
          </View>
        </View>
        <View>
          <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 25 }}>Vos Événements</Text>
        </View>
        <ScrollView style={{ marginTop: 20 }}>
          {eventList.map((l, i) => (
            <ListItem
              topDivider={i === 0}
              bottomDivider
              chevron
              onPress={() => this.goToSingleEvent(l)}
              key={l.name}
              leftAvatar={{ source: { uri: l.avatar_url } }}
              title={l.name}
              subtitle={l.subtitle}
            />
          ))}
        </ScrollView>
        <ErrorMessage
          active={profileError}
          setOff={() => this.setState({ profileError: false })}
          errorText={profileError}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { login } = state;
  return { login };
};

export default connect(mapStateToProps)(ProfileScreen);
