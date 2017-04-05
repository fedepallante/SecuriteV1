 import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Button } from './common';
import Communications from 'react-native-communications';



class ListItem extends Component {
    onRowPress() {
        Actions.taskEdit({ task: this.props.task });
    }
    onCallPress() {
        const { phone, prompt } = this.props.task;

        Communications.phonecall(phone, true)
        //Communications.text(phone, `Message automatisé de Global Sécurité. Votre technicien est en route on sera là dans 30 minute`);
    }


    render() {
        const { firstName, lastName, street, number, phone, equipment } = this.props.task;

        return (
              <View>
                <Card >
                    <View style={styles.cardStyle} >
                        <CardSection>
                            <Text style={styles.titleStyle}>
                                Adresse : {number}, {street}
                            </Text>
                        </CardSection>
                        <CardSection >
                            <Text style={styles.titleStyle}>
                                Nom du client : {firstName} </Text>
                        </CardSection >
                            <CardSection>
                            <Text style={styles.titleStyle}>
                                Equipement nécessaire: {equipment}
                            </Text>
                        </CardSection>
                        <CardSection>
                            <Button onPress={this.onCallPress.bind(this)}>
                                Appeler
                            </Button>
                            <Button onPress={this.onRowPress.bind(this)}>
                                Détails de la tâche
                            </Button>
                        </CardSection>

                    </View>


                </Card>
              </View>
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15,

    },
    viewStyle: {
        height: 100,
        flex: 2,
    },
    buttonStyleLeft: {
        height:50,
        width: 100,
        backgroundColor: 'blue',
    },
    buttonStyleRight: {
        height:50,
        width: 200,
        backgroundColor: 'green'
    },
    holder: {
        flex: 0.25,
        justifyContent: 'center',
    },
    text: {
        fontSize: 32,
    },
    cardStyle:{
        borderColor: 'red',
        borderWidth: 1,
        backgroundColor: "black"
    }
};

export default ListItem;