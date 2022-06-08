import React, { useCallback, useRef} from 'react';
import { View, Text, StyleSheet, LogBox } from 'react-native';
import Watchlist from '../components/Watchlist';
import Favlist from '../components/Favlist';

import { useState, useEffect } from "react";
import { FavlistState } from '../store/reducers/favlist';
import { WatchlistState } from '../store/reducers/watchlist';
import { TopMoversState } from '../store/reducers/topmovers';

import * as favlistActions from '../store/actions/favlist';
import * as watchlistActions from '../store/actions/watchlist';
import * as topMoversActions from '../store/actions/topmovers';
import * as newsActions from '../store/actions/news';

import { useScrollToTop } from '@react-navigation/native';
import { NewsState } from '../store/reducers/news';
import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux'
import { store } from '../store/Store';

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);
  });

  return (<Text>I have rendered {count} times!</Text>);
}

interface RootState {
  favlist: FavlistState;
  watchlist: WatchlistState;
  topMovers: TopMoversState;
  news: NewsState;
}


const Portfolio = () => {
  const favlistData = useSelector(
    (state: RootState) => state.favlist.favlistData
  );
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();
  const loadData = useCallback(async () => {
    try {
      dispatch(favlistActions.fetchCoinData());
      dispatch(watchlistActions.fetchCoinData());
      dispatch(topMoversActions.fetchTopMoversData());
      dispatch(newsActions.fetchNewsData());
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    loadData();
  }, [loadData]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadData().then(() => {
      setRefreshing(false);
    });
  }, [loadData, refreshing]);

  const ref = useRef(null);
  useScrollToTop(ref);

  return (
    <View style={styles.screen}>
      <Favlist stockData={favlistData} coinData={favlistData}/>
      <Text>Portfolio</Text>
      <Timer />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Portfolio;
