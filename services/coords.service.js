import React from 'react';
import MapView, { Marker } from "react-native-maps"
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Button } from 'react-native';
import * as Config from '../config.json'

export function getAllCoords() {
    return fetch(Config.API + "/getCords", {
        method: 'GET',
    })
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

export function deleteCord(id) {
    let request = {
        id: id
    }
    return fetch(Config.API + "/delete", {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(request)
    })
        .then(response => response.json())
        .then((responseJson) => {
            return Promise.resolve(true)
        })
        .catch(error => console.log(error))
}

export function addCord(latitude, longitude, name) {
    let request = {
        latitude: latitude,
        longitude: longitude,
        name: name
    }
    return fetch(Config.API + "/insert", {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(request)
    })
        .then(response => response.json())
        .then((responseJson) => {
            //Se creó la coordenada
            return Promise.resolve(true)
        })
        .catch(error => console.log(error))
}
