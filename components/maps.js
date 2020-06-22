import React from 'react';
import MapView, { Marker } from "react-native-maps"
import { Text, View, StyleSheet, Dimensions, Modal, Button, TouchableHighlight } from 'react-native';
import { getAllCoords } from '../services/coords.service'
import FormCords from './forms/FormCords'

var _mapView = MapView;
class Map extends React.Component {
    constructor(props) {
        super()
        this.state = {
            modalVisible: false,
            dataSource: []
        };
    }

    componentDidMount() {
        let resp = getAllCoords().then(obj => {
            this.setState({
                dataSource: [
                    {
                        id: 1,
                        name: "Calle 1",
                        latitude: -33.453750,
                        longitude: -70.598085,
                    },
                    {
                        id: 2,
                        name: "Calle 2",
                        latitude: -33.450306,
                        longitude: -70.622406,
                    },
                ]
            })
            console.log(this.state.dataSource[0].name);

        })


    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    render() {
        const { modalVisible } = this.state;
        return (
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <MapView
                    style={styles.mapStyle}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0032,
                        longitudeDelta: 0.0101,
                    }}
                    annotations={this.state.dataSource}
                    ref={(mapView) => { _mapView = mapView; }}
                >
                    {this.state.dataSource.map((prop, key) => {
                        return (<Marker
                            draggable
                            coordinate={{
                                latitude: prop.latitude,
                                longitude: prop.longitude,
                            }}
                            onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
                            title={prop.name}
                            description={prop.desc}
                        />)
                    })}
                </MapView>
                {this.state.dataSource.map((prop, key) => {
                    return (<Button
                        title={prop.name}
                        onPress={() => _mapView.animateToCoordinate({
                            latitude: prop.latitude,
                            longitude: prop.longitude,
                            latitudeDelta: 0.0032,
                            longitudeDelta: 0.0101,
                        }, 1000)}
                    />)
                })}


                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <FormCords />

                            <Text style={styles.modalText}>Hello World!</Text>

                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                onPress={() => {
                                    this.setModalVisible(!modalVisible);
                                }}
                            >
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>

                <TouchableHighlight
                    style={styles.openButton}
                    onPress={() => {
                        this.setModalVisible(true);
                    }}
                >
                    <Text style={styles.textStyle}>Show Modal</Text>
                </TouchableHighlight>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'stretch',
        paddingTop: 20,
        paddingBottom: 5,
        backgroundColor: '#f3f3f3'
    },
    header_text: {
        fontWeight: 'bold',
        fontSize: 17,
        textAlign: 'center'
    },
    mapStyle: {
        bottom: Dimensions.get('window').height / 4,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 2,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },
    modalView: {
        margin: 50,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 100,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default Map;