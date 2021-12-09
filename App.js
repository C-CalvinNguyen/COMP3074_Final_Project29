import React from 'react';
import { StyleSheet, Text, View , SafeAreaView } from 'react-native';
import Livelocation from './components/livelocation';

// import Search from './SearchBar.js';

export default function App() {


  return (
    <SafeAreaView >
      <View style={styles.container, {marginTop:10}}>
        <Text style={styles.text}>Weather APP</Text>  
      </View>
      <Livelocation />
      {/* <Search /> */}
    </SafeAreaView> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    textAlign:'center'
  }
});
