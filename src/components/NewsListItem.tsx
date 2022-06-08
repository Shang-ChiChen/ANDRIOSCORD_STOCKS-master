import React, { FC } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Colors from '../constants/Colors';
import {useColorMode} from 'native-base';

interface NewsListItemProps {
  newsOutlet: string;
  date: string;
  title: string;
  image: string;
  url: string;
}

const NewsListItem: FC<NewsListItemProps> = ({
  newsOutlet,
  date,
  title,
  image,
  url,
}) => {
  const handleNewsPress = async (url: string) => {
    await WebBrowser.openBrowserAsync(url, {
      readerMode: true,
      controlsColor: Colors.cbBlue,
      dismissButtonStyle: 'close',
      toolbarColor: 'white',
    });
  };



  const { colorMode } = useColorMode();
  const styles = colorMode == 'dark' ? stylesDark : stylesLight;



  return (
    <TouchableHighlight
      style={styles.listItem}
      underlayColor='#FBFAFB'
      onPress={handleNewsPress.bind(this, url)}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={styles.textContainer}>
          <Text style={styles.header}>
            {newsOutlet} <Text style={styles.bulletPoint}>•</Text> {date}
          </Text>
          <Text selectable style={styles.title}>
            {title}
          </Text>
        </View>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
    </TouchableHighlight>
  );
};

const stylesLight = StyleSheet.create({
  listItem: {
    justifyContent: 'center',
    paddingHorizontal: '4%',
    paddingVertical: '4%',
    borderRadius: 8,
  },
  textContainer: {
    width: '75%',
  },
  header: {
    color: Colors.lightColor.newsHeader,
    fontSize: 16,
    marginBottom: 5,
  },
  bulletPoint: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  title: {
    fontSize: 17,
    lineHeight: 25,
    color: '#000'
  },
  image: {
    width: 67,
    height: 67,
    borderRadius: 8,
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
});

const stylesDark = StyleSheet.create({
  listItem: {
    justifyContent: 'center',
    paddingHorizontal: '4%',
    paddingVertical: '4%',
    borderRadius: 8,
    backgroundColor:"#202225",
    marginTop: 8,
  },
  textContainer: {
    width: '75%',
    
  },
  header: {
    color: Colors.darkColor.newsHeader,
    fontSize: 16,
    marginBottom: 5,
  },
  bulletPoint: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  title: {
    fontSize: 17,
    lineHeight: 25,
    color:"rgb(223, 225, 226)",
  },
  image: {
    width: 67,
    height: 67,
    borderRadius: 8,
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: '#222222',
  },
});
export default NewsListItem;
