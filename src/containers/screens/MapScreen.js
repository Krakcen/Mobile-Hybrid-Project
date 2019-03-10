import React from 'react';
import {
  View, StyleSheet, Platform, ActivityIndicator, TouchableOpacity
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { NavigationEvents } from 'react-navigation';
import {
  SearchBar, Text, Card, Button
} from 'react-native-elements';

import MainLoader from '../../utils/MainLoader';
import customMapStyle from '../../utils/CustomMapStyle';
import AV from '../../AppVariables';
import makeId from '../../utils/makeId';

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

const stylesMap = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

class MapScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Map',
    tabBarIcon: ({ tintColor }) => (
      <View>
        <IoniconsIcon color={tintColor} size={20} name="md-map" />
      </View>
    )
  };

  state = {
    mapLoading: true,
    currentParamID: '',
    searchValue: '',
    searchFocused: false,
    searchLoading: false,
    searchResults: listItems,
    geoLoading: false,
  };

  map = null;

  // map.getBounds().contains(marker.getPosition());

  componentDidMount = async () => {
    this.handleGeolocation();
  };

  handleMapDisplay = () => {
    const { navigation } = this.props;
    const { currentParamID } = this.state;

    const mapEvent = navigation.getParam('mapEvent', null);

    if (mapEvent) {
      // display the portion of the map corresponding.
      if (!mapEvent.id) return;
      if (mapEvent.id !== currentParamID) {
        console.log('Displaying the event', mapEvent);
        this.setState({ currentParamID: mapEvent.id });
      }
    } else {
      // if no params, show the current position
      console.log('NO PARAM');
    }
  };

  handleMapReady = () => {
    this.setState({ mapLoading: false });
  };

  updateSearch = (search) => {
    this.setState({ searchValue: search });

    this.setState({ searchLoading: true });
    setTimeout(() => {
      this.setState({ searchLoading: false });
    }, 1000);
  };

  handleSearchResultPress = (l) => {
    console.log(l);
  };

  handleGeolocation = async () => {
    const camera = await this.map.getCamera();
    const { map } = this;

    console.log(camera);


    // console.log(newCam.center);
    // newCam.center.longitude += 1;
    // newCam.heading += 40;
    // newCam.pitch += 10;
    // newCam.altitude += 1000;
    // newCam.zoom -= 2;
    // newCam.center.latitude += 0.5;

    this.setState({ geoLoading: true });
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const newCam = camera;

        this.setState({ geoLoading: false });
        console.log(position);
        newCam.center.longitude = position.coords.longitude;
        newCam.center.latitude = position.coords.latitude;
        newCam.zoom = 15.4114351272583;

        map.animateCamera(newCam, { duration: 2000 });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
    );
  };

  render() {
    const {
      mapLoading, searchValue, searchLoading, searchResults, searchFocused, geoLoading
    } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <NavigationEvents onDidFocus={payload => this.handleMapDisplay(payload)} />
        <MapView
          ref={(ref) => {
            this.map = ref;
          }}
          customMapStyle={customMapStyle}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={stylesMap.map}
          onMapReady={this.handleMapReady}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
        />
        <SearchBar
          onFocus={() => {
            this.setState({ searchFocused: true });
          }}
          onBlur={() => {
            this.setState({ searchFocused: false });
          }}
          containerStyle={{
            marginTop: Platform.OS === 'ios' ? 40 : 0,
            position: 'absolute',
            backgroundColor: Platform.OS === 'ios' ? 'transparent' : 'white'
          }}
          platform={Platform.OS === 'ios' ? 'ios' : 'android'}
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={searchValue}
        />
        {searchFocused && (
          <View
            style={{
              marginTop: Platform.OS === 'ios' ? 110 : 90,
              position: 'absolute',
              margin: 20
            }}
          >
            {searchLoading || !searchValue.length ? (
              <Card containerStyle={{ borderRadius: 25 }}>
                {!searchValue.length ? (
                  <Text style={{ fontSize: 18, color: AV.primaryColor }}>Recherche vide</Text>
                ) : (
                  <ActivityIndicator size="small" color={AV.primaryColor} />
                )}
              </Card>
            ) : (
              <View style={{ flex: 1, marginBottom: 20 }}>
                <View>
                  {searchResults.map(l => (
                    <TouchableOpacity
                      key={l.name + makeId(4)}
                      onPress={() => this.handleSearchResultPress(l)}
                    >
                      <Card containerStyle={{ borderRadius: 25 }}>
                        <Text style={{ color: AV.primaryColor, fontSize: 17, marginBottom: 3 }}>
                          {l.name}
                        </Text>
                        <Text>{l.event_date}</Text>
                      </Card>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            margin: 20,
            backgroundColor: '#f9f9f9',
            borderRadius: 25,
            padding: 8
          }}
        >
          <Button
            onPress={this.handleGeolocation}
            iconContainerStyle={{ margin: 20 }}
            buttonStyle={{ borderRadius: 25, backgroundColor: '#f9f9f9', elevation: 0 }}
            title=""
            icon={geoLoading ? <MaterialIcon name="timer-sand" size={30} color={AV.primaryColor} /> : <EntypoIcon name="location-pin" size={30} color={AV.primaryColor} />}
          />
        </View>
        {mapLoading && (
          <MainLoader backgroundColor={AV.primaryAlpha} loaderColor={AV.secondaryColor} />
        )}
      </View>
    );
  }
}

export default MapScreen;
