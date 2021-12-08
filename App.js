import React from 'react';
import { StyleSheet, Text, View , SafeAreaView } from 'react-native';
import Livelocation from './components/livelocation';
// import Search from './SearchBar.js';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text}>Weather APP</Text>  
      </View>
      <Livelocation />
      {/* <Search /> */}
    </SafeAreaView> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20
  }
});
