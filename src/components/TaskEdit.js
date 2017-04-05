import _ from 'lodash';
import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions,
    ScrollView,
    Text,
    View,
    Linking
} from 'react-native';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import TaskForm from './TaskForm';
import { taskUpdate, taskSave, taskDelete } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';

import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 45.5016889;
const LONGITUDE = -73.56725599999999;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const SAMPLE_REGION = {
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
};


class TaskEdit extends Component {
  state = { showModal: false };

  componentWillMount() {
    _.each(this.props.task, (value, prop) => {
      this.props.taskUpdate({ prop, value });
    });
  }


  onTextPress() {
    const { phone, shift } = this.props;

    Communications.text(phone, `Votre technicien Global Sécurité arrivera dans 30 minutes`);
  }
    onNavPress() {
        const url = 'https://www.google.ca/maps/place/3000+Chemin+de+la+Côte-Sainte-Catherine,+Montréal,+QC+H3T+2A7/data=!4m2!3m1!1s0x4cc919ecd3bf5e2f:0x2f05adf3c53f6519?sa=X&ved=0ahUKEwjJpZSymITTAhVHxYMKHb2fCyEQ8gEIGzAA';
        Linking.openURL(url)
    }

  onAccept() {

    const { uid, firstName, lastName, type, number, street, phone, equipment } = this.props.task;

    this.props.taskDelete({ uid, firstName, lastName, type, number, street, phone, equipment });
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  render() {
      const { firstName, lastName, type, number, street, phone, equipment } = this.props.task;
    return (

      <Card>

          <MapView
              style={styles.map}
              initialRegion={SAMPLE_REGION}
          ><MapView.Marker
              coordinate={SAMPLE_REGION}
              title={street}
              description={street}
          />

          </MapView>

          <CardSection>
              <Text style={styles.titleStyle}>
                  Informations du client:
              </Text>
          </CardSection>
          <CardSection>
              <Text style={styles.titleStyle}>
                  Nom du client: {firstName} {lastName}{"\n"}
                  Adresse: {number} {street}{"\n"}
                  Numéro de téléphone: {phone}
              </Text>
          </CardSection>
          <CardSection>
          <Text style={styles.titleStyle}>
              Informations de la tâche:
          </Text>
      </CardSection>
          <CardSection>
              <Text style={styles.titleStyle}>
                  Type: {type}{"\n"}
                  Équipement requis: {equipment}
              </Text>
          </CardSection>
          <CardSection>
              <Button onPress={this.onNavPress}>
                  Ouvrir le navigateur
              </Button>
          </CardSection>
        <CardSection>
          <Button onPress={this.onTextPress.bind(this)}>
            Envoyer notification au client
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
            Terminer cette tâche
          </Button>
        </CardSection>

        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Are you sure you want to delete this?
        </Confirm>
      </Card>

    );
  }
}

const styles = StyleSheet.create({
    map: {
        height: 200,
    },
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15,

    }
});

const mapStateToProps = (state) => {
  const { name, address, taskType, equipment, phone } = state.taskForm;

  return { name, address, taskType, equipment, phone };
};

export default connect(mapStateToProps, {
  taskUpdate, taskSave, taskDelete
})(TaskEdit);
