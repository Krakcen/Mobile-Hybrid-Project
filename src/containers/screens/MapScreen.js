import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
// import Spinner from 'react-native-loading-spinner-overlay';

import MainLoader from '../../utils/MainLoader';
import customMapStyle from '../../utils/CustomMapStyle';
import AV from '../../AppVariables';

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
    mapLoading: true
  };

  componentDidMount = () => {};

  handleMapReady = () => {
    this.setState({ mapLoading: false });
  };

  render() {
    const { mapLoading } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <MapView
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
        {mapLoading && (
          <MainLoader backgroundColor={AV.primaryAlpha} loaderColor={AV.secondaryColor} />
        )}
        {/* <Text>Here, we display the map with the events</Text>
        <AntDesignIcon size={100} name={Platform.OS === 'ios' ? 'apple1' : 'android1'} /> */}
      </View>
    );
  }
}

export default MapScreen;
