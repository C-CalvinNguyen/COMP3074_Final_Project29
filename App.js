import React from 'react';
import { StyleSheet, Text, View , SafeAreaView } from 'react-native';
import Livelocation from './components/livelocation';


export default function App() {


  return (
    <SafeAreaView >
      <View style={styles.container, {marginTop:10}}>
        <Text style={styles.text}>Weather APP</Text>  
      </View>
      <Livelocation />
    </SafeAreaView> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#00d4ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    textAlign:'center'
  }
});
