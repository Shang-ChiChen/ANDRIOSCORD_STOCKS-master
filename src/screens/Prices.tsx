import { useColorMode } from 'native-base';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const Prices = () => {
  
const { colorMode } = useColorMode();
  return (
    <View style={styles.screen}>
      <Text style={{color: colorMode == 'dark' ? '#fff' : '#484848',}}>Prices</Text>
     
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Prices;
