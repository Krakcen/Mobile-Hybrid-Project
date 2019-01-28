import React from 'react';
import { View, ScrollView, TextInput } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import {
  Input, Text, CheckBox, Button
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

import StatusBarIphone from '../../components/StatusBarIphone';
import AV from '../../AppVariables';

const DISPLAY_DEV = false;

const TextInputOsef = ({
  input, osefLabel, osefIcon, ...inputProps
}) => (
  <View
    style={{
      paddingTop: 20,
      paddingBottom: 20,
      backgroundColor: DISPLAY_DEV && 'rgba(231, 34, 23, 0.5)'
    }}
  >
    <Text>{osefLabel}</Text>
    <Input
      style={{ borderBottomWidth: 1, borderBottomColor: 'black' }}
      {...inputProps}
      leftIcon={osefIcon}
      onChangeText={input.onChange}
      onBlur={input.onBlur}
      onFocus={input.onFocus}
      value={input.value}
    />
  </View>
);

const TextAreaOsef = ({
  input, osefLabel, osefIcon, ...inputProps
}) => (
  <View
    style={{
      paddingTop: 20,
      paddingBottom: 20,
      backgroundColor: DISPLAY_DEV && 'rgba(231, 34, 23, 0.5)'
    }}
  >
    <Text>{osefLabel}</Text>
    {
      <Icon
        style={{ paddingLeft: 15, paddingTop: 15 }}
        name={osefIcon}
        size={24}
        color={AV.primaryColor}
      />
    }
    <TextInput
      style={{ borderBottomWidth: 1, borderBottomColor: 'black' }}
      {...inputProps}
      onChangeText={text => input.onChange(text)}
      onBlur={input.onBlur}
      onFocus={input.onFocus}
      multiline
      numberOfLines={4}
      value={input.value}
    />
  </View>
);

const CheckBoxOsef = ({
  input, osefLabel, osefIcon, ...inputProps
}) => (
  <View
    style={{
      paddingTop: 20,
      paddingBottom: 20,
      backgroundColor: DISPLAY_DEV && 'rgba(27, 34, 70, 0.5)'
    }}
  >
    <Text>{osefLabel}</Text>
    <CheckBox
      {...inputProps}
      checkedIcon="dot-circle-o"
      uncheckedIcon="circle-o"
      checked={!!input.value}
      onPress={() => input.onChange(!input.value)}
    />
  </View>
);

class CreateEventScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'New Event',
    tabBarIcon: ({ tintColor }) => (
      <View>
        <AntDesignIcon color={tintColor} size={20} name="pluscircle" />
      </View>
    )
  };

  componentDidMount = () => {};

  handleTextChange = (text) => {
    console.log(`Changed with ${text}`);
  };

  render() {
    // const { form } = this.props;

    // console.log(form);

    return (
      <View
        style={{
          padding: 20,
          paddingTop: 35,
          flex: 1,
          backgroundColor: DISPLAY_DEV ? 'rgba(231, 34, 23, 0.5)' : 'white'
        }}
      >
        <StatusBarIphone />
        <Text h4 style={{ textAlign: 'center' }}>
          Créer un Évènement
        </Text>
        <ScrollView
          style={{ backgroundColor: DISPLAY_DEV && 'rgba(50, 34, 23, 0.5)' }}
          contentContainerStyle={{
            paddingTop: 35
          }}
        >
          <Field
            osefIcon={<Icon name="tag" size={24} color={AV.primaryColor} />}
            osefLabel="Nom"
            name="event_name"
            component={TextInputOsef}
          />

          <Field
            osefIcon={<Icon name="calendar" size={24} color={AV.primaryColor} />}
            osefLabel="Date"
            name="event_date"
            component={TextInputOsef}
          />

          <Field osefLabel="Privé" name="event_private" component={CheckBoxOsef} />

          <Field
            osefIcon="file"
            osefLabel="Description"
            name="event_description"
            component={TextAreaOsef}
          />

          <Button
            containerStyle={{ paddingTop: 30 }}
            title="Créer l'Évènement"
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: [AV.primaryColor, '#7aa8ff'],
              start: { x: 0, y: 1 },
              end: { x: 0, y: 0 }
            }}
          />
        </ScrollView>
        {/* <ScrollView style={{ paddingTop: '20' }}>
          <Field osefLabel="Nom de l'event" name="email" component={TextInputOsef} />
        </ScrollView> */}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  form: state.form
});

export default connect(
  mapStateToProps,
  null
)(reduxForm({ form: 'createEvent' })(CreateEventScreen));
