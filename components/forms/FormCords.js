import React from 'react';
import { TextInput, Text, View, StyleSheet, Dimensions, TouchableOpacity, Button } from 'react-native';
// import { getAllCoords } from '../services/coords.service'
import t from 'tcomb-form-native';
import Map from '../maps'
import * as Config from '../../config.json'
import { addCord } from '../../services/coords.service'

const Form = t.form.Form;

const Direccion = t.struct({
    latitude: t.Number,
    longitude: t.Number,
    name: t.String,
});


class FormCords extends React.Component {
    constructor(props) {
        super()
        this.state = {
            dataSource: []
        };
        var cordsForm
    }

    render() {
        return (
            <View style={styles.container}>
                <Form
                    type={Direccion}
                    ref={c => this.cordsForm = c} />
                <TouchableOpacity style={styles.button} >
                    <Button
                        title="Crear"
                        onPress={() => {
                            this.submitForm()
                        }}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    submitForm() {
        var formValues = this.cordsForm.getValue();
        if (formValues) {
            //Form correcto
            addCord(formValues.latitude, formValues.longitude, formValues.name).then(obj => {
                if (obj)
                    alert("Se creó la coordenada")
            })
        }
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