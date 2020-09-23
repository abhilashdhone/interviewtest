import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import Main from "./components/main";

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000000" />
      <Main />
    </View>
  )
};

const styles = StyleSheet.create({
	container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#171330',
	},
})

export default App;
