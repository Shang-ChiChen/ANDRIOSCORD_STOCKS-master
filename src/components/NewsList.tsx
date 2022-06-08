import React, { FC } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useColorMode} from 'native-base';
import NewsListItem from './NewsListItem';
import News from '../models/News';
import Colors from '../constants/Colors';





interface NewsProps {
  newsData: News[];
  isHomeScreen: boolean;
  viewMoreHandler?: any;
}

const NewsList: FC<NewsProps> = ({
  newsData,
  isHomeScreen,
  viewMoreHandler,
}) => {
  

  const { colorMode } = useColorMode();
  const styles = colorMode == 'dark' ? stylesDark : stylesLight;


  return (
    <View
      style={{
        width: '100%',
        alignSelf: 'flex-start',
      }}
    >
      {isHomeScreen && (
        <View style={styles.listHeader}>
          <Text style={styles.newsText}>News</Text>
          <TouchableOpacity onPress={viewMoreHandler}>
            <Text selectable style={styles.viewMoreButton}>
              View more
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        scrollEnabled={!isHomeScreen}
        showsVerticalScrollIndicator={false}
        data={isHomeScreen ? newsData.slice(0, 5) : newsData}
        keyExtractor={(item) => item.url}
        style={{ marginHorizontal: 8 }}
        renderItem={(itemData) => {
          return (
            <NewsListItem
              newsOutlet={itemData.item.newsOutlet}
              date={itemData.item.date}
              title={itemData.item.title}
              image={itemData.item.image}
              url={itemData.item.url}
            />
          );
        }}
      />
    </View>
  );
};

const stylesLight = StyleSheet.create({
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 10,
    marginHorizontal: '6%',
  },
  newsText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000'
  },
  viewMoreButton: {
    color: Colors.lightColor.cbBlue,
    fontSize: 18,
    fontWeight: '600',
  },
});
const stylesDark = StyleSheet.create({
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 10,
    marginHorizontal: '6%',
    
  },
  newsText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.darkColor.border
  },
  viewMoreButton: {
    color: Colors.darkColor.cbBlue,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default NewsList;
