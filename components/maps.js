import React from 'react';
import MapView, { Marker } from "react-native-maps"
import { Text, View, StyleSheet, Dimensions, Modal, Icon, Button, TouchableHighlight } from 'react-native';
import { getAllCoords, deleteCord } from '../services/coords.service'
import FormCords from './forms/FormCords'
import * as Config from '../config.json'

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
        this.refreshCords()
    }
    refreshCords() {
        getAllCoords().then(obj => {
            this.setState({
                dataSource: obj
            })
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
                        latitude: Config.InitialLatitude,
                        longitude: Config.InitialLongitude,
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
                                latitude: parseFloat(prop.latitude),
                                longitude: parseFloat(prop.longitude),
                            }}
                            onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
                            title={prop.name}
                            description={prop.desc}
                        />)
                    })}
                </MapView>
                {this.state.dataSource.map((prop, key) => {
                    return (
                        <View>
                            <Button
                                type="outline"
                                title={prop.name}
                                onPress={() => _mapView.animateToCoordinate({
                                    latitude: parseFloat(prop.latitude),
                                    longitude: parseFloat(prop.longitude),
                                    latitudeDelta: 0.0032,
                                    longitudeDelta: 0.0101,
                                }, 1000)}
                            />
                            <Button
                                type="clear"
                                title="Eliminar"
                                icon={
                                    <Icon
                                        name="arrow-right"
                                        size={15}
                                        color="white"
                                    />
                                }
                                onPress={() => {
                                    deleteCord(prop._id).then(obj => {
                                        if (obj)
                                            this.refreshCords()
                                    })

                                }}
                            />
                        </View>
                    )
                })}


                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        this.refreshCords()
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <FormCords closeModal={this.closeModal} />

                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                onPress={() => {
                                    this.setModalVisible(!modalVisible);
                                }}
                            >
                                <Text style={styles.textStyle}>Cerrar</Text>
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
                    <Text style={styles.textStyle}>Crear Coordenada</Text>
                </TouchableHighlight>

            </View>
        );
    }

    closeModal() {
        this.setState({ modalVisible: visible });
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'green',
        width: '40%',
        height: 40
    },
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
        backgroundColor: "green",
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