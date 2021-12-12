import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import Weather from './weather';

export default function Livelocation() {
    const [errorMsg, setErrorMsg] = useState(null);
    const [latitude, setLat] = useState(null);
    const [longitude, setLong] = useState(null);
  
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return{
          };
        }
  
        let location = await Location.getCurrentPositionAsync({});
        const {latitude, longitude} = location.coords
        setLat(latitude);
        setLong(longitude);
      })();
    }, []);


    if(errorMsg){
        return(
        <Text>errorMsg</Text>
        )
    } else {
    return (
      <View >
        <Text style={styles.text}>latitude: {latitude}  longitude: {longitude}</Text>
        <Weather lat={latitude} long={longitude} />
      </View>
    )
    }
  }

  const styles = StyleSheet.create({
    text: {
        textAlign:'center'
    }
  });
