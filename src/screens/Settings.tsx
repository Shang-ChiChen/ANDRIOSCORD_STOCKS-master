import React,{useState} from 'react';
import { View, Text, StyleSheet ,Switch} from 'react-native';
import {useColorMode,Box} from 'native-base';
import { background } from 'native-base/lib/typescript/theme/styled-system';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import Colors from '../constants/Colors';

const Settings = () => {

  const { colorMode, toggleColorMode } = useColorMode();
  const styles = colorMode == 'dark' ? stylesDark : stylesLight;






  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={styles.screen}>
      <Box style={{width: '100%',height: 60}}></Box>
      <Box style={styles.optionBox}>
                <Text style={styles.optionText}>深色模式</Text>
                <Switch
        trackColor={{ false: "#0053f8", true: "#5865F2" }}
        thumbColor={colorMode == 'dark' ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleColorMode}
        value={colorMode === "dark"}
      />
            </Box>
    
    </View>
  );
};


const stylesLight = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: Colors.lightColor.homeBackground,
  },
  optionBox: {
    width: '100%',
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    paddingRight: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    
    justifyContent: 'space-between',
},
optionText: {
    fontSize: 14,
    color: "#000",
},
});

const stylesDark = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: Colors.darkColor.homeBackground,

  },
  optionBox: {
    backgroundColor:"#202225",
    width: '100%',
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    paddingRight: 16,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
},
optionText: {
    fontSize: 14,
    color: Colors.darkColor.border,
},
});

export default Settings;
