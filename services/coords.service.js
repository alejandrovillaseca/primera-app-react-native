import React from 'react';
import MapView, { Marker } from "react-native-maps"
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Button } from 'react-native';

export function getAllCoords() {
    return fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then((responseJson) => {
            // this.setState({
            //     loading: false,
            //     dataSource: responseJson
            // })

            return responseJson

        })
        .catch(error => console.log(error))
}
