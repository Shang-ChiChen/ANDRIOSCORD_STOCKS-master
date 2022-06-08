import React,{useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import {useRoute} from '@react-navigation/native';
import {useColorMode} from 'native-base';
import Colors from '../constants/Colors';

export const TabBar = ({ state, navigation }: BottomTabBarProps) => {

  const { colorMode, toggleColorMode } = useColorMode();
  const styles = colorMode == 'dark' ? stylesDark : stylesLight;
  const cbBlue= (colorMode == 'dark' ? Colors.darkColor.cbBlue : Colors.lightColor.cbBlue);
  const subtitle= (colorMode == 'dark' ? Colors.darkColor.subtitle : Colors.lightColor.subtitle);
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const isActions = route.name == 'Actions';

        const itemColor = isFocused ? cbBlue : subtitle;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }

          if (isActions) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          }
        };

        let iconName;
        switch (route.name) {
          case '首頁':
            iconName = 'home';
            break;
          case '我的最愛':
            iconName = 'heart';
            break;
          case '新聞':
            iconName = 'newspaper';
            break;
          case '設定':
            iconName = 'hammer';
            break;
          default:
            iconName = 'person';
        }

        const animatedValue = new Animated.Value(1);

        const handlePressIn = () => {
          Animated.spring(animatedValue, {
            toValue: 0.98,
            useNativeDriver: true,
          }).start();
        };

        const handlePressOut = () => {
          Animated.spring(animatedValue, {
            toValue: 1,
            useNativeDriver: true,
          }).start();
        };

        const animatedStyle = {
          transform: [{ scale: animatedValue }],
        };

        return (
          <Animated.View
            style={[
              styles.tabBarItem,
              isActions ? { marginTop: 7 } : { marginTop: 10 },
              animatedStyle,
            ]}
            key={route.name}
          >
            <TouchableOpacity
              onPress={onPress}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            >
              {isActions ? (
                <View style={styles.actionsButton}>
                  <Ionicons name='search' size={20} color='white' />
                </View>
              ) : (
                <View style={{ alignItems: 'center' }}>
                  <Ionicons
                    name={iconName as any}
                    size={20}
                    color={itemColor}
                    style={{ marginBottom: 2 }}
                  />
                  <Text
                    style={[{ color: itemColor }, styles.tabBarText]}
                    selectable
                  >
                    {route.name}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </Animated.View>
        );
      })}
    </View>
  );
};

const stylesLight = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 65,
    borderColor: Colors.lightColor.tabBarBackground,
    borderTopColor: Colors.lightColor.border,
    borderWidth: 1,
    justifyContent: 'space-evenly',
    backgroundColor:Colors.lightColor.tabBarBackground,
  },
  tabBarItem: {
    width: 60,
  },
  tabBarText: {
    fontSize: 10,
    fontWeight: '700',
  },
  actionsButton: {
    width: 42,
    height: 42,
    backgroundColor: Colors.lightColor.cbBlue,
    borderRadius: 21,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});

const stylesDark = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 65,
    borderColor: Colors.darkColor.tabBarBackground,
    borderTopColor: Colors.darkColor.cbBlue,
    borderWidth: 1,
    justifyContent: 'space-evenly',
    backgroundColor:Colors.darkColor.tabBarBackground,
  },
  tabBarItem: {
    width: 60,
  },
  tabBarText: {
    fontSize: 10,
    fontWeight: '700',
  },
  actionsButton: {
    width: 42,
    height: 42,
    backgroundColor: Colors.darkColor.cbBlue,
    borderRadius: 21,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});
