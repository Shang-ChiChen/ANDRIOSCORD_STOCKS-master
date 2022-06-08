import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Colors from '../constants/Colors';
import NewsList from '../components/NewsList';
import { NewsState } from '../store/reducers/news';
import { useColorMode } from 'native-base';
import { color } from 'native-base/lib/typescript/theme/styled-system';





interface RootState {
  news: NewsState;
}

type NewsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'News'>;

type Props = {
  navigation: NewsScreenNavigationProp;
};

const News: FC = () => {
  const newsData = useSelector((state: RootState) => state.news.newsData);
  const { colorMode, toggleColorMode } = useColorMode();
  const styles = colorMode == 'dark' ? stylesDark : stylesLight;

  return (
    <View style={styles.screen}>
      <NewsList newsData={newsData} isHomeScreen={false} />
    </View>
  );
};

export const screenOptions = ({ navigation }: Props) => {
  return {
    headerHideShadow: true,
    headerHideBackButton: true,
    headerTitleStyle: { fontWeight: '700' },
    headerLeft: () => {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{ marginLeft: 3 }}
        >
          <Ionicons name='chevron-back-outline' size={21} />
        </TouchableOpacity>
      );
    },
  };
};

const stylesLight = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
});
const stylesDark = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.darkColor.tabBarBackground,
  },
});
export default News;
