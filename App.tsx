import React, { Component }  from 'react';
import { View, Button, Text } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import favlistReducer from './src/store/reducers/favlist';
import watchlistReducer from './src/store/reducers/watchlist';
import topMoversReducer from './src/store/reducers/topmovers';
import newsReducer from './src/store/reducers/news';
import cartItemsReducer  from './src/store/reducers/cartItems';
import AppNavigator from './src/navigation/AppNavigator';

import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import {useEffect} from 'react';
import {LogBox} from 'react-native';
import { NativeBaseProvider } from 'native-base';
import * as SplashScreen from "expo-splash-screen";
import LottieView from 'lottie-react-native';

import { SafeAreaView, StatusBar } from 'react-native';
import {store} from './src/store/Store';

class Splash extends Component {
  constructor(props) {
      super();
  }

  render() {
      return (
          <View
              style={{
                  flex: 1,
                  backgroundColor: '#ffffff'
              }}
          >
              <LottieView
                  source={require('./assets/splash.json')}
                  autoPlay
                  loop={false}
                  speed={0.5}
                  onAnimationFinish={() => {
                      console.log('Animation Finished!');
                      this.props.navigation.replace('Nav', { user: 'Wojtek' })
                      
                  }}
              />
          </View>
      )
  }
}

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home!</Text>
      <Button
        title="Replace with Profile"
        onPress={() =>
          navigation.dispatch(
            StackActions.replace('Profile', { user: 'Wojtek' })
          )
        }
      />
    </View>
  );
}

function ProfileScreen({ navigation, route }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile!</Text>
      <Text>{route.params.user}'s profile</Text>
      <Button
        title="Push same screen on the stack"
        onPress={() => navigation.dispatch(StackActions.pop(1))}
      />
      <Button
        title="Pop one screen from stack"
        onPress={() =>
          navigation.dispatch(StackActions.push('Profile', { user: 'Wojtek' }))
        }
      />
      <Button
        title="Pop to top"
        onPress={() => navigation.dispatch(StackActions.popToTop())}
      />
    </View>
  );
}


const {Buffer} = require('buffer/');

const protobuf = require("protobufjs");



LogBox.ignoreLogs([
  "ReactNativeFiberHostComponent: Calling getNode() on the ref of an Animated component is no longer necessary. You can now directly use the ref instead. This method will be removed in a future release.",
]);


const Stack = createStackNavigator();

export default function MyIndex() {

  return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={store}>
      <NativeBaseProvider >    
          <NavigationContainer>
            <Stack.Navigator>
              
              <Stack.Screen name="Profile" component={Splash} />
              <Stack.Screen name="Nav" component={AppNavigator} />
            </Stack.Navigator>
          </NavigationContainer>  
          <StatusBar backgroundColor="#EEEEEE" barStyle='dark-content' />
      </NativeBaseProvider>
    </Provider>



</SafeAreaView>
  
  );
}
