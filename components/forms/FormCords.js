import React from 'react';
import { TextInput, Text, View, StyleSheet, Dimensions, TouchableOpacity, Button } from 'react-native';
// import { getAllCoords } from '../services/coords.service'
import t from 'tcomb-form-native';

const Form = t.form.Form;
const Direccion = t.struct({
    email: t.String,
    username: t.String,
    password: t.String,
    terms: t.Boolean
});


class FormCords extends React.Component {
    constructor(props) {
        super()
        this.state = {
            dataSource: []
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Form type={Direccion} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      marginTop: 20,
      padding: 5,
      backgroundColor: '#ffffff',
    },
  });
  
export default FormCords;