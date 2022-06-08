import React, { FC } from 'react';
import {useColorMode} from 'native-base';
import {
  TouchableHighlight,
  View,
  Text,
  StyleSheet,
  Image,
  useColorScheme,
} from 'react-native';
import Colors from '../constants/Colors';
import { connect } from 'react-redux'

import {store} from "../store/Store";




interface WatchlistItemProps {
  id: number;
  name: string;
  symbol: string;
  price: number;
  percentChange: number;
  Updown:number;
  drag: any;
  isActive: any;
}

const WatchlistItem: FC<WatchlistItemProps> = ({
  id,
  name,
  symbol,
  price,
  percentChange,
  Updown,
  drag,
  isActive,
}) => {


  const { colorMode, toggleColorMode } = useColorMode();
  const Styles = colorMode == 'dark' ? stylesDark : stylesLight;
  return (
    <TouchableHighlight
      underlayColor={isActive ? 'white' : '#FAFBFE'}
      onLongPress={drag}
      onPress={() => {
        console.log(symbol);
        store.dispatch({ type: 'ADD_TO_CART', payload: "tse_"+symbol+".tw" });
        console.log(store.getState().cartItems);
      }}
    >
      <View
        style={
          isActive ? [Styles.activeListItem, Styles.listItem] : Styles.listItem
        }
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            style={Styles.logo}
            source={{
              uri: `https://raw.githubusercontent.com/kk4090311/React-Company-Logos/main/%20(${id.toString()}).png`,
            }}
          />
          <View>
            <Text style={Styles.nameText}>{name}</Text>
            <Text style={Styles.tickerText}>{symbol}</Text>
          </View>
        </View>
        <View>
          <Text style={Styles.priceText}>
            $
            {price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
          <Text
            style={[
              {
                color:
                  percentChange > 0 ? Colors.lightColor.negativeRed : (percentChange == 0 ? '#888' : Colors.lightColor.positiveGreen),
                  //percentChange > 0 ? Colors.positiveGreen : 
                  //Colors.lightColor.positiveGreen
                  //Colors.lightColor.negativeRed
              },
              Styles.changeText,
            ]}
          >
            {percentChange > 0 ? '▲' : (percentChange == 0 ? ' ' : '▼')}
            {percentChange.toFixed(2)}
            ({Updown.toFixed(2)}%)
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};
const stylesLight = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    width: '100%',
    height: 75,
    padding: 16,
    justifyContent: 'space-between',
  },
  activeListItem: {
    backgroundColor: 'white',
    opacity: 0.9,
    shadowColor: 'black',
    shadowRadius: 15,
    shadowOpacity: 0.05,
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 16,
    borderRadius: 16,
    borderWidth: 0.3,
    borderColor: Colors.lightColor.border,
  },
  nameText: {
    fontSize: 17,
    width: 145,
    color: '#000'
  },
  tickerText: {
    color: Colors.lightColor.secondarySubtitle,
    fontSize: 16,
  },
  priceText: {
    fontSize: 17,
    textAlign: 'right',
    color: '#000'
  },
  changeText: {
    textAlign: 'right',
    fontSize: 16,
  },
});


const stylesDark = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    width: '100%',
    height: 75,
    padding: 16,
    justifyContent: 'space-between',
    borderBottomColor:Colors.darkColor.homeBackground,
    borderBottomWidth: 1,
  },
  activeListItem: {
    backgroundColor: 'white',
    opacity: 0.9,
    shadowColor: 'black',
    shadowRadius: 15,
    shadowOpacity: 0.05,
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 16,
    borderRadius: 16,
    borderWidth: 0.3,
    borderColor: Colors.darkColor.border,
    backgroundColor:"#fff"
  },
  nameText: {
    fontSize: 17,
    width: 145,
    color: Colors.darkColor.border
  },
  tickerText: {
    color: Colors.darkColor.secondarySubtitle,
    fontSize: 16,
    color: Colors.darkColor.border
  },
  priceText: {
    fontSize: 17,
    textAlign: 'right',
    color: Colors.darkColor.border
  },
  changeText: {
    textAlign: 'right',
    fontSize: 16,
  },
});

export default WatchlistItem;
