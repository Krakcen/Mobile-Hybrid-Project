import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import MainLoader from '../../utils/MainLoader';
import AV from '../../AppVariables';
import makeId from '../../utils/makeId';

const CardInfo = ({
  title, icon, description, button = false, onPress = () => {}
}) => (
  <Card key={title} title={title}>
    <View style={{ minHeight: button ? 150 : 100 }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center'
        }}
      >
        {icon}
        <Text style={{ marginBottom: 10, fontSize: 17 }}>{description}</Text>
      </View>
      {button && (
        <Button
          onPress={onPress}
          backgroundColor="#03A9F4"
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0
          }}
          title="Voir sur la map"
        />
      )}
    </View>
  </Card>
);

class SingleEventScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('event', null).name
  });

  state = {
    eventLoading: true,
    event: null
  };

  componentDidMount = async () => {
    const { navigation } = this.props;

    const event = navigation.getParam('event', null);

    this.setState({
      event,
      eventLoading: false
    });
  };

  goToMap = () => {
    const { navigation } = this.props;
    const { event } = this.state;

    navigation.navigate('Map', { mapEvent: { mapEvent: event, id: makeId(10) } });
  };

  render() {
    const { event, eventLoading } = this.state;

    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: AV.primaryAlpha
        }}
      >
        {eventLoading ? (
          <MainLoader backgroundColor={AV.primaryAlpha} loaderColor={AV.secondaryColor} />
        ) : (
          <View>
            <ScrollView style={{ paddingBottom: 30 }}>
              <CardInfo
                key="Date"
                description={event.date}
                title="Date"
                icon={<Icon name="calendar" size={40} color={AV.secondaryColor} />}
              />
              <CardInfo
                key="Adresse"
                description={event.address}
                button
                onPress={this.goToMap}
                title="Adresse"
                icon={<EntypoIcon name="address" size={40} color={AV.secondaryColor} />}
              />
              <CardInfo
                key="Description"
                description={event.description}
                title="Description"
                icon={<Icon name="file" size={40} color={AV.secondaryColor} />}
              />
              <CardInfo
                key="Visibility"
                description={event.isPrivate ? 'Événement privé' : 'Événement public'}
                title="Visibilité"
                icon={
                  event.isPrivate ? (
                    <EntypoIcon name="lock" size={40} color={AV.secondaryColor} />
                  ) : (
                    <MaterialIcon name="public" size={40} color={AV.secondaryColor} />
                  )
                }
              />
            </ScrollView>
          </View>
        )}
      </View>
    );
  }
}

export default SingleEventScreen;
