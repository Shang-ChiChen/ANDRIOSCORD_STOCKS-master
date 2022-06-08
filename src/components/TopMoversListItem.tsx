import React, { FC } from 'react';
import {
  TouchableHighlight,
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
} from 'react-native';
import {useColorMode} from 'native-base';

import Colors from '../constants/Colors';

interface TopMoversListItemProps {
  id: number;
  symbol: string;
  price: number;
  percentChange: number;
}

const TopMoversListItem: FC<TopMoversListItemProps> = ({
  id,
  symbol,
  price,
  percentChange,
}) => {
  const animatedValue = new Animated.Value(1);

  const { colorMode, toggleColorMode } = useColorMode();
  const styles = colorMode == 'dark' ? stylesDark : stylesLight;

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
    <TouchableHighlight
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      underlayColor='#FAFBFE'
      onPress={() => {
        console.log(symbol);
      }}
      style={{ width: 143, marginRight: 17 }}
    >
      <Animated.View style={[styles.listItem, animatedStyle]}>
        <Image
          style={styles.logo}
          source={{
            uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/${id.toString()}.png`,
          }}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.tickerText}>{symbol}</Text>
          <Text style={styles.priceText}>
            $
            {price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
        </View>
        <View>
          <Text
            style={[
              {
                color:
                  percentChange > 0 ? Colors.lightColor.positiveGreen : Colors.lightColor.negativeRed,
              },
              styles.changeText,
            ]}
            numberOfLines={1}
            selectable
          >
            {percentChange > 0 ? '+' : ''}
            {percentChange.toFixed(2)}%
          </Text>
        </View>
      </Animated.View>
    </TouchableHighlight>
  );
};

const stylesLight = StyleSheet.create({
  listItem: {
    width: 143,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.lightColor.border,
    paddingHorizontal: 16,
    paddingVertical: 25,
  },
  logo: {
    width: 32,
    height: 32,
    marginBottom: 16,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: Colors.lightColor.border,
  },
  tickerText: {
    fontSize: 15,
    fontWeight: '600',
    marginRight: 5,
    color: '#000'
  },
  priceText: {
    fontSize: 15,
    color: Colors.lightColor.secondarySubtitle,
  },
  changeText: {
    fontSize: 26,
    marginTop: 2,
  },
});
const stylesDark = StyleSheet.create({
  listItem: {
    width: 143,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#202225",
    paddingHorizontal: 16,
    paddingVertical: 25,
    backgroundColor:"#202225"

  },
  logo: {
    width: 32,
    height: 32,
    marginBottom: 16,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: Colors.darkColor.border,
    backgroundColor:"#fff"
  },
  tickerText: {
    fontSize: 15,
    fontWeight: '600',
    marginRight: 5,
    color: Colors.darkColor.border,
  },
  priceText: {
    fontSize: 15,
    color: Colors.darkColor.secondarySubtitle,

  },
  changeText: {
    fontSize: 26,
    marginTop: 2,

  },
});

export default TopMoversListItem;
