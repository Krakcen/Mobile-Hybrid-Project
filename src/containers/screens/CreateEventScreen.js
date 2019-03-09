import React from 'react';
import {
  View, ScrollView, Platform, DatePickerAndroid, DatePickerIOS
} from 'react-native';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import {
  Input, Text, CheckBox, Button
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

import firebase from 'react-native-firebase';

import StatusBarIphone from '../../components/StatusBarIphone';
import AV from '../../AppVariables';

const DISPLAY_DEV = false;

const database = firebase.database();

const TextInputOsef = ({
  input,
  osefLabel,
  osefIcon,
  errorMessage = null,
  onPress = () => {},
  ...inputProps
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
      onTouchStart={() => onPress(input)}
      errorMessage={errorMessage}
      leftIcon={osefIcon}
      onChangeText={input.onChange}
      onBlur={input.onBlur}
      onFocus={input.onFocus}
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

  state = {
    dateOpen: false,
    chosenDate: new Date(),
    formError: ''
  };

  componentDidMount = () => {
    const { change } = this.props;

    const curDate = new Date();
    const formatDate = `${curDate.getDate().toString()}/${(curDate.getMonth() + 1).toString()}/${(
      curDate.getYear() + 1900
    ).toString()}`;

    change('event_date', formatDate);
    // this.setState({ chosenDate: formatDate });
  };

  handleTextChange = (text) => {
    console.log(`Changed with ${text}`);
  };

  handleDatePickerOpen = async (input) => {
    const { change } = this.props;
    try {
      if (Platform.OS === 'ios') {
        // console.log(DatePickerIOS);
        this.setState({ formError: 'runnin the picker on IOS', dateOpen: true });
      } else if (Platform.OS === 'android') {
        const {
          action, year, month, day
        } = await DatePickerAndroid.open({
          date: new Date()
        });

        if (action === DatePickerAndroid.dateSetAction) {
          change('event_date', `${day}/${month + 1}/${year}`);
          // Selected year, month (0-11), day
        }
        this.setState({ formError: 'runnin the picker on Android' });
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };

  formatIosDate = (date) => {
    const { change } = this.props;

    const iosDate = `${date.getDate().toString()}/${(date.getMonth() + 1).toString()}/${(
      date.getYear() + 1900
    ).toString()}`;

    change('event_date', iosDate);
    this.setState({ chosenDate: date });
  };

  validateEventOnSubmit = (values) => {
    if (!values) return false;

    if (!values.event_name || !values.event_name.length) return false;
    if (!values.event_date || !values.event_date.length) return false;
    if (!values.event_description || !values.event_description.length) return false;

    return true;
  };

  onEventSubmit = async () => {
    const { eventForm, reset } = this.props;

    const eventRef = database.ref('/Events');

    try {
      if (!eventForm || !eventForm.createEvent) throw new Error('Le formulaire est vide');

      const { values } = eventForm.createEvent;

      // Form Sanitizing
      if (values.event_private == null) values.event_private = false;
      if (!this.validateEventOnSubmit(values)) throw new Error('Le formulaire est incomplet');

      // Ready to Send
      this.setState({ formError: '' });
      console.log('sending the form');

      const eventChild = eventRef.child(`event_${Date.now()}`);

      eventChild.update({
        date: values.event_date,
        description: values.event_description,
        name: values.event_name,
        isPrivate: values.event_private,
        address: values.event_address,
      });

      reset();

      // navigate to map, with the intent to show the event
    } catch (error) {
      setTimeout(() => {
        this.setState({ formError: '' });
      }, 5000);
      this.setState({ formError: error.message });
    }
  };

  render() {
    const { formError, dateOpen, chosenDate } = this.state;

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
          <Text style={{ color: 'red', textAlign: 'center', fontSize: 18 }}>{formError}</Text>
          <Field
            osefIcon={<Icon name="tag" size={24} color={AV.primaryColor} />}
            osefLabel="Nom"
            name="event_name"
            component={TextInputOsef}
          />

          {!dateOpen && (
            <Field
              osefIcon={<Icon name="calendar" size={24} color={AV.primaryColor} />}
              osefLabel="Date"
              name="event_date"
              onPress={this.handleDatePickerOpen}
              component={TextInputOsef}
            />
          )}
          {dateOpen && (
            <React.Fragment>
              <DatePickerIOS mode="date" date={chosenDate} onDateChange={this.formatIosDate} />
              <Button
                onPress={() => this.setState({ dateOpen: false })}
                title="Valider la date"
                ViewComponent={LinearGradient}
                linearGradientProps={{
                  colors: [AV.primaryColor, '#7aa8ff'],
                  start: { x: 0, y: 1 },
                  end: { x: 0, y: 0 }
                }}
              />
            </React.Fragment>
          )}

          <Field
            osefIcon={<EntypoIcon name="address" size={24} color={AV.primaryColor} />}
            osefLabel="Adresse"
            name="event_address"
            component={TextInputOsef}
          />

          <Field osefLabel="Privé" name="event_private" component={CheckBoxOsef} />

          <Field
            osefIcon={<Icon name="file" size={24} color={AV.primaryColor} />}
            osefLabel="Description"
            name="event_description"
            component={TextInputOsef}
          />

          <Button
            onPress={this.onEventSubmit}
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
  eventForm: state.form
});

export default connect(
  mapStateToProps,
  null
)(reduxForm({ form: 'createEvent' })(CreateEventScreen));
