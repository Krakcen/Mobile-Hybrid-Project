import React from 'react';
import {
  Text, View, StyleSheet
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const styles = StyleSheet.create({
  members: {
    fontSize: 24,
    paddingLeft: 20,
  },
  mails: {
    fontSize: 20,
    paddingLeft: 20,
    height: 30,
    color: 'steelblue',
  }
})

class AboutScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Info',
    tabBarIcon: ({ tintColor }) => ((
      <View><AntDesignIcon color={tintColor} size={20} name="infocirlce"/></View>
    ))
  };

  componentDidMount = () => {
  };

  render() {
    return (
      <View style={{
        paddingTop: 35,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}>
        <Text style={{fontSize: 28, height: 80}}>About OSEF</Text>
        <Text style={{fontSize: 24, height: 50}}>Developers:</Text>
        <Text style={styles.members}>Ronan Courture</Text>
        <Text style={styles.mails}>ronan.courture@epitech.eu</Text>
        <Text style={styles.members}>Hugo Villevieille</Text>
        <Text style={styles.mails}>hugo.villevieille@epitech.eu</Text>
        <Text style={styles.members}>Zhitong He</Text>
        <Text style={styles.mails}>zhitong.he@epitech.eu</Text>
      </View>
    );
  }
}


export default AboutScreen;

