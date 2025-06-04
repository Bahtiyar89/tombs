import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  PermissionsAndroid,
  TouchableOpacity,
  Modal,
  Text,
  Pressable,
  Animated,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Button,
  Alert,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MinusSvg from '../svgs/MinusSvg';
import CloseSvg from '../svgs/CloseSvg';
import PlusSvg from '../svgs/PlusSvg';
import CountriesMap from '../components/CountriesMap';
import StateMap from '../components/StateMap';
import TownsMap from '../components/TownsMap';
import database from '../database/data.json';

export default function HomeScreen() {
  const mapRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState(null);
  const [countrycode, setCountrycode] = useState(null);
  const [state, setState] = useState(null);
  const [ev, setEv] = useState({});
  const [town, setTown] = useState(null);
  const [db, setDb] = useState([]);

  const defaultLocation = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLocation({
          latitude: position?.coords?.latitude,
          longitude: position?.coords?.longitude,
          latitudeDelta: 5,
          longitudeDelta: 0.01,
        });
      },
      error => {
        Alert.alert(
          'Error',
          `Failed to get your location: ${error.message}` +
            ' Make sure your location is enabled.',
        );
        setLocation(defaultLocation);
      },
    );
  };

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getCurrentLocation();
          } else {
            Alert.alert(
              'Permission Denied',
              'Location permission is required to show your current location on the map.',
            );
            setLocation(defaultLocation);
          }
        } catch (err) {
          console.warn(err);
          setLocation(defaultLocation);
        }
      } else {
        getCurrentLocation();
      }
    };

    requestLocationPermission();
  }, []);

  const handleMapPress = e => {
    const coordinate = e?.nativeEvent?.coordinate;
  };

  const handleZoomInMapPress = e => {
    mapRef?.current?.getCamera().then(cam => {
      console.log('cam:2222', cam);
      cam.zoom += 1;
      mapRef?.current?.animateCamera(cam);
    });
  };
  const handleZoomOutMapPress = e => {
    mapRef?.current?.getCamera().then(cam => {
      console.log('cam: ', cam);

      cam.zoom -= 1;
      mapRef?.current?.animateCamera(cam);
    });
  };

  const getCountryOptions = () => {
    if (!database) {
      return [];
    }

    const data = database.filter(function (item) {
      return item.key == countrycode;
    });
    console.log('data: ', data);

    return data;
  };

  const getStateOptions = () => {
    if (!database) {
      return [];
    }

    const data = database.filter(function (item) {
      return item.il_plaka == state;
    });
    console.log('state: ', data);

    return data;
  };

  const getTownOptions = () => {
    if (!database) {
      return [];
    }

    const data = database.filter(function (item) {
      return item.ilce_id == town;
    });
    console.log('state: ', data);

    return data;
  };

  useEffect(() => {
    setDb(getCountryOptions());
  }, [countrycode]);

  useEffect(() => {
    setDb(getStateOptions());
  }, [state]);

  useEffect(() => {
    setDb(getTownOptions());
  }, [town]);

  console.log('r: ', ev);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        showsUserLocation={true}
        region={location}
        onPress={handleMapPress}>
        {/* Render default markers */}

        {db.map((r, index) => {
          return (
            <Marker
              onPress={() => {
                setModalVisible(!modalVisible);
                setEv(r);
              }}
              key={index}
              coordinate={{
                latitude: r?.lat,
                longitude: r?.lon,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              title={r?.ismi}
            />
          );
        })}

        {/*     <Marker
          coordinate={{
            latitude: 41.022297,
            longitude: 29.014352,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        />
        

        {/* Render main markers */}
      </MapView>
      <View
        style={{
          position: 'absolute',
          padding: 0,
          margin: 0,
          top: 80,
          right: 0,
          width: 150,
        }}>
        <CountriesMap country={countrycode} setCountry={setCountrycode} />
        <StateMap country={countrycode} state={state} setState={setState} />
        <TownsMap town={town} state={state} setTown={setTown} />
      </View>
      <TouchableOpacity
        style={{position: 'absolute', bottom: 60, right: 30}}
        onPress={handleZoomOutMapPress}>
        <MinusSvg />
      </TouchableOpacity>
      <TouchableOpacity
        style={{position: 'absolute', bottom: 120, right: 30}}
        onPress={handleZoomInMapPress}>
        <PlusSvg />
      </TouchableOpacity>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <ScrollView style={{backgroundColor: 'pink'}}>
            <View
              style={{
                margin: 20,
                backgroundColor: 'white',
                borderRadius: 20,
                padding: 35,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}>
              <Pressable
                onPress={() => setModalVisible(!modalVisible)}
                style={{position: ''}}>
                <CloseSvg />
              </Pressable>
              <Text style={{fontSize: 16, fontWeight: 700}}>{ev?.ismi}</Text>

              <Text style={styles.textStyle}>{ev?.life}</Text>

              <Pressable
                onPress={() => setModalVisible(!modalVisible)}
                style={{
                  marginTop: 10,
                  width: '100%',
                  backgroundColor: '#2096F3',
                  padding: 5,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 500,
                    color: 'white',
                  }}>
                  Закрыть
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </Modal>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',

    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});
