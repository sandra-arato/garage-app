import React from 'react';
import { connect } from 'react-redux';
import { TabNavigator } from 'react-navigation';
import { LinkDeviceScreen, OpenDoorScreen } from '../index';
import { StatusBarWrapper } from '../../components';

let HomeScreenNavigator = {};

class HomeScreen extends React.Component {

  constructor() {
    super();
    HomeScreenNavigator = TabNavigator({
      Open: { screen: OpenDoorScreen },
      Link: { screen: LinkDeviceScreen },
    });
    HomeScreenNavigator.router = HomeScreen.router;
  }

  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      title: `${params.username}' Garage`,
      headerLeft: null
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({
      username: this.props.username
    });
  }

  render() {
    return (
      <StatusBarWrapper>
        <HomeScreenNavigator />
      </StatusBarWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    username: state.signIn.username,
    linkedDevice: state.ble.linkedDevice,
  }
}

HomeScreen = connect(
  mapStateToProps
)(HomeScreen);

export { HomeScreen }
