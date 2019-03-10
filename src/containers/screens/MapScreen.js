import React from 'react';
import {
  View, StyleSheet, Platform, ActivityIndicator, TouchableOpacity
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'react-native-firebase';
import { NavigationEvents } from 'react-navigation';
import {
  SearchBar, Text, Card, Button
} from 'react-native-elements';

import MainLoader from '../../utils/MainLoader';
import customMapStyle from '../../utils/CustomMapStyle';
import AV from '../../AppVariables';
import makeId from '../../utils/makeId';
import ErrorMessage from '../../utils/ErrorMessage';

const database = firebase.database();

const listItems = [
  {
    name: 'Mon premier événement',
    avatar_url:
      'https://i0.wp.com/menaentrepreneur.org/wp-content/uploads/2017/06/Event-management-1.png',
    subtitle: "16/03/19 - C'est mon premier événement crée avec l'application !",
    address: '18 place Paul Mistral, Grenoble, France',
    description: 'C’est la date de mon anniversaire',
    isPrivate: false,
    date: '13/12/1995'
  },
  {
    name: 'Manif gilets jaunes du 30 mars',
    avatar_url: 'https://media.intersport.fr/is/image/intersportfr/2248472AJ5_Q1',
    subtitle: '30/03/19 - Venez nombreux pour la 2436ème édition de la manif des gilets jaunes.',
    address: '50 Rue Baldner, Strasbourg, France',
    description:
      'Cet événement est crée à partir de l’app en mode développement par hugo.villevieille@epitech.eu',
    isPrivate: true,
    date: '15/3/2024'
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
    mapError: false,
    marker: null
  };

  map = null;

  // map.getBounds().contains(marker.getPosition());

  componentDidMount = async () => {};

  navigateToEvent = async (event) => {
    // Navigates to the coord, and create the marker

    try {
      const { map } = this;
      const camera = await map.getCamera();
      const newCam = camera;
      // const newCam = camera;
      newCam.center.longitude = event.mapEvent.geometry.location.lng;
      newCam.center.latitude = event.mapEvent.geometry.location.lat;
      newCam.zoom = 15.4114351272583;

      map.animateCamera(newCam, { duration: 2000 });

      // set marker
      this.setState({
        marker: {
          latlng: {
            latitude: event.mapEvent.geometry.location.lat,
            longitude: event.mapEvent.geometry.location.lng
          },
          title: event.mapEvent.name,
          description: event.mapEvent.description
        }
      });
    } catch (error) {
      this.setState({ mapError: error.message });
    }
  };

  handleMapDisplay = () => {
    const { navigation } = this.props;
    const { currentParamID, mapLoading } = this.state;
    const mapEvent = navigation.getParam('mapEvent', null);
    if (mapEvent && !mapLoading) {
      // display the portion of the map corresponding, and set the marker.
      if (!mapEvent.id) return;
      if (mapEvent.id !== currentParamID) {
        this.setState({ currentParamID: mapEvent.id });
        this.navigateToEvent(mapEvent);
      }
    } else {
      // if no params, show the current position
    }
  };

  handleMapReady = () => {
    const { navigation } = this.props;
    const { currentParamID } = this.state;
    const mapEvent = navigation.getParam('mapEvent', null);

    if (mapEvent) {
      if (!mapEvent.id) return;
      if (mapEvent.id !== currentParamID) {
        this.navigateToEvent(mapEvent);
      }
    } else {
      this.handleGeolocation();
    }
    this.setState({ mapLoading: false });
  };

  updateSearch = async (search) => {
    try {
      const eventRef = database.ref('/Events');

      this.setState({ searchValue: search, searchLoading: true });

      const snapshot = await eventRef
        .orderByChild('name')
        .limitToLast(50)
        .once('value');
      const value = snapshot.val();
      const searchResults = [];

      let count = 0;
      Object.keys(value).forEach((key) => {
        if (count < 3) {
          const nameLower = value[key].name.toLowerCase();
          const searchLower = search.toLowerCase();
          if (nameLower.includes(searchLower)) {
            searchResults.push(value[key]);
          }
        }
        count += 1;
      });

      this.setState({ searchResults, searchLoading: false });

      // setTimeout(() => {
      //   this.setState({ searchLoading: false });
      // }, 1000);
    } catch (error) {
      this.setState({ mapError: error.message });
    }
  };

  handleSearchResultPress = (l) => {
    this.navigateToEvent({ mapEvent: l });
    this.setState({ searchValue: '' });
  };

  handleGeolocation = async () => {
    try {
      const camera = await this.map.getCamera();
      const { map } = this;

      this.setState({ geoLoading: true });
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const newCam = camera;

          this.setState({ geoLoading: false });
          newCam.center.longitude = position.coords.longitude;
          newCam.center.latitude = position.coords.latitude;
          newCam.zoom = 15.4114351272583;

          map.animateCamera(newCam, { duration: 2000 });
        },
        error => this.setState({ mapError: error.message }),
        { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
      );
    } catch (error) {
      this.setState({ mapError: error.message });
    }
  };

  render() {
    const {
      mapLoading,
      searchValue,
      searchLoading,
      searchResults,
      searchFocused,
      geoLoading,
      mapError,
      marker
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
        >
          {marker && (
            <Marker
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
            />
          )}
        </MapView>
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
                        <Text>{l.date}</Text>
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
            icon={
              geoLoading ? (
                <MaterialIcon name="timer-sand" size={30} color={AV.primaryColor} />
              ) : (
                <EntypoIcon name="location-pin" size={30} color={AV.primaryColor} />
              )
            }
          />
        </View>
        {mapLoading && (
          <MainLoader backgroundColor={AV.primaryAlpha} loaderColor={AV.secondaryColor} />
        )}
        <ErrorMessage
          active={mapError}
          setOff={() => this.setState({ mapError: false })}
          errorText={mapError}
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
  null
)(MapScreen);
