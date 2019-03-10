import React from 'react';
import { View, ScrollView, PanResponder } from 'react-native';
import { Avatar, Text, ListItem } from 'react-native-elements';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import AV from '../../AppVariables';

const listItems = [
  {
    name: 'Mon premier événement',
    avatar_url:
      'https://i0.wp.com/menaentrepreneur.org/wp-content/uploads/2017/06/Event-management-1.png',
    subtitle: "16/03/19 - C'est mon premier événement crée avec l'application !",
    event_address: '18 place Paul Mistral, Grenoble, France',
    event_description: 'C’est la date de mon anniversaire',
    event_isPrivate: false,
    event_name: 'Mon premier événement',
    event_date: '13/12/1995'
  },
  {
    name: 'Manif gilets jaunes du 30 mars',
    avatar_url: 'https://media.intersport.fr/is/image/intersportfr/2248472AJ5_Q1',
    subtitle: '30/03/19 - Venez nombreux pour la 2436ème édition de la manif des gilets jaunes.',
    event_address: '50 Rue Baldner, Strasbourg, France',
    event_description:
      'Cet événement est crée à partir de l’app en mode développement par hugo.villevieille@epitech.eu',
    event_isPrivate: true,
    event_name: 'Manif gilets jaunes du 30 mars',
    event_date: '15/3/2024'
  }
];

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

  goToSingleEvent = (event) => {
    const { navigation } = this.props;

    navigation.navigate('SingleEvent', { event });
  };

  render() {
    const { login } = this.props;
    return (
      <View style={{ flex: 1 }} {...this.panResponder.panHandlers}>
        <View style={{ height: 225, backgroundColor: AV.primaryColor }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Avatar size="large" rounded title="HV" />
            <Text>
              {login.email}
              {' '}
              {login.nick}
              {' '}
              {login.uid}
            </Text>
            <Text style={{ marginTop: 10, color: 'white' }}>hugo.villevieille@epitech.eu</Text>
          </View>
        </View>
        <View>
          <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 25 }}>Vos Événements</Text>
        </View>
        <ScrollView style={{ marginTop: 20 }}>
          {listItems.map((l, i) => (
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
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { login } = state;
  return { login };
};

export default connect(mapStateToProps)(ProfileScreen);
