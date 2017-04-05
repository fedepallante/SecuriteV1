/**
 * Created by fedepallante on 2017-04-01.
 */
import React, {Component} from 'react';
import {View, Image} from 'react-native';
import LoginForm from './LoginForm';


class LoginView extends Component {

    render ()  {
        return(
            <View>
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={require('./../img/logo.jpg')}/>
            </View>
                <View>
            <LoginForm/>
            </View>
            </View>
        )
};
}

const styles = {
    container: {
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',


    },
    image: {

        justifyContent: "center",    //  <-- you can use "center", "flex-start
    }
};

export default LoginView;