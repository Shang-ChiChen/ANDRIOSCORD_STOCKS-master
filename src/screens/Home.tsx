import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  RefreshControl,
  ScrollView,
  SafeAreaView,
  Image,
  LogBox,
  useColorScheme,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useScrollToTop } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

import * as watchlistActions from '../store/actions/watchlist';
import * as topMoversActions from '../store/actions/topmovers';
import * as newsActions from '../store/actions/news';
import { WatchlistState } from '../store/reducers/watchlist';
import { TopMoversState } from '../store/reducers/topmovers';
import { NewsState } from '../store/reducers/news';

import CBButton from '../components/CBButton';
import TopMoversList from '../components/TopMoversList';
import Watchlist from '../components/Watchlist';
import NewsList from '../components/NewsList';
import Colors from '../constants/Colors';
import  themeStyles from './Settings';
import { useColorMode } from 'native-base';


interface RootState {
  watchlist: WatchlistState;
  topMovers: TopMoversState;
  news: NewsState;
}

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HomeScreen'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home = ({ navigation }: Props) => {
  const watchlistData = useSelector(
    (state: RootState) => state.watchlist.watchlistData
  );
  const topMoversData = useSelector(
    (state: RootState) => state.topMovers.topMoversData
  );
  const newsData = useSelector((state: RootState) => state.news.newsData);

  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();
  const loadData = useCallback(async () => {
    try {
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

  const viewMoreHandler = () => {
    navigation.navigate('News');
  };

  const ref = useRef(null);
  useScrollToTop(ref);


  //const colorScheme = useColorScheme();
  //const themeStyles = colorScheme === 'light'? LightStyles: DarkStyles;


  const { colorMode } = useColorMode();
  const styles = colorMode == 'dark' ? stylesDark : stylesLight;

  

  return (




    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
        ref={ref}
        refreshControl={
          <RefreshControl
            tintColor='rgb(233, 233, 243)'
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <Watchlist stockData={watchlistData} coinData={watchlistData}/>
        <TopMoversList coinData={topMoversData} />
        <NewsList
          newsData={newsData}
          isHomeScreen={true}
          viewMoreHandler={viewMoreHandler}
        />
        <StatusBar style='auto' />
      </ScrollView>
    </SafeAreaView>
  );
};

export const screenOptions = () => {
  return {
    headerShown: false,
  };
};

const stylesLight = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightColor.homeBackground,
    justifyContent: 'flex-start', 
  },
  image: {
    height: 250,
    width: 150,
    marginTop: 40,
  },
  title: {
    fontWeight: '600',
    letterSpacing: 0.5,
    fontSize: 21,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 17,
    marginBottom: 24,
    color: Colors.lightColor.subtitle,
  },
});


const stylesDark = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkColor.homeBackground,
    justifyContent: 'flex-start', 
  },
  image: {
    height: 250,
    width: 150,
    marginTop: 40,
  },
  title: {
    fontWeight: '600',
    letterSpacing: 0.5,
    fontSize: 21,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 17,
    marginBottom: 24,
    color: Colors.darkColor.subtitle,
  },
});
export default Home;
