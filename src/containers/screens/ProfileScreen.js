import React from 'react';
import { View, ScrollView } from 'react-native';
import { Avatar, Text, ListItem } from 'react-native-elements';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AV from '../../AppVariables';

const listItems = [
  {
    name: 'Mon premier événement',
    avatar_url:
      'https://i0.wp.com/menaentrepreneur.org/wp-content/uploads/2017/06/Event-management-1.png',
    subtitle: "16/03/19 - C'est mon premier événement crée avec l'application !"
  },
  {
    name: 'Manif gilets jaunes du 30 mars',
    avatar_url: 'https://media.intersport.fr/is/image/intersportfr/2248472AJ5_Q1',
    subtitle: '30/03/19 - Venez nombreux pour la 2436ème édition de la manif des gilets jaunes.'
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

  componentDidMount = () => {
    // Récupération des events
  };

  goToSingleEvent = () => {
    const { navigation } = this.props;

    navigation.navigate('SingleEvent');
  };

  render() {
    return (
      <React.Fragment>
        <View style={{ height: 225, backgroundColor: AV.primaryColor }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Avatar size="large" rounded title="HV" />
            <Text style={{ marginTop: 10, color: 'white' }}>hugo.villevieille@epitech.eu</Text>
          </View>
        </View>
        <View>
          <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 25 }}>Vos Événements</Text>
        </View>
        <ScrollView style={{ marginTop: 20 }}>
          {listItems.map(l => (
            <ListItem
              chevron
              onPress={this.goToSingleEvent}
              key={l.name}
              leftAvatar={{ source: { uri: l.avatar_url } }}
              title={l.name}
              subtitle={l.subtitle}
            />
          ))}
        </ScrollView>
      </React.Fragment>
    );
  }
}

export default ProfileScreen;
