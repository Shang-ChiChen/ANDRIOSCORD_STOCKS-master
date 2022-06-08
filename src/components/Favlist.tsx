import React, { FC, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import {NestableDraggableFlatList, NestableScrollContainer }from 'react-native-draggable-flatlist';
import * as Haptics from 'expo-haptics';

import WatchlistItem from './WatchlistItem';
import * as favlistActions from '../store/actions/favlist';
import Coin from '../models/Coin';
import Stock from '../models/Stock';
import Colors from '../constants/Colors';
import {useColorMode} from 'native-base';


interface TopMoversProps {
  stockData: Stock[];
  coinData: Coin[];
}

const Favlist: FC<TopMoversProps> = ({ stockData, coinData}) => {
  const dispatch = useDispatch();
  const { colorMode, toggleColorMode } = useColorMode();
  const styles = colorMode == 'dark' ? stylesDark : stylesLight;
  const renderItem = useCallback(
    ({ item, drag, isActive }: RenderItemParams<Stock>) => {
      return (
        <WatchlistItem
          id={item.id}
          name={item.name}
          symbol={item.symbol}
          price={item.price}
          percentChange={item.percentChange}
          Updown={item.Updown}
          drag={drag}
          isActive={isActive}
        />
      );
    },
    []
  );

  return (
    <View
      style={{
        width: '100%',
        alignSelf: 'flex-start',
        marginLeft: '6%',
      }}
    >
      <Text style={styles.watchlistText}>熱門排行(市值前30名)</Text>
      <View
        style={[{ height: coinData.length * 75 }, styles.watchlistContainer]}
      >
         <FlatList
          data={stockData}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          renderItem={renderItem}
        />

      </View>
    </View>
  );
};

const stylesLight = StyleSheet.create({
  watchlistText: {
    fontWeight: '600',
    fontSize: 21,
    marginTop: 64,
    marginBottom: 10,
    color: '#000'
  },
  watchlistContainer: {
    width: '88%',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.lightColor.border,
    backgroundColor: 'white',
  },
});

const stylesDark = StyleSheet.create({
  watchlistText: {
    fontWeight: '600',
    fontSize: 21,
    marginTop: 64,
    marginBottom: 10,
    color:Colors.darkColor.border,
  },
  watchlistContainer: {
    width: '88%',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#202225' ,
    backgroundColor: '#202225',
    borderTopColor:Colors.darkColor.cbBlue ,
 
  },
});
export default Favlist;
