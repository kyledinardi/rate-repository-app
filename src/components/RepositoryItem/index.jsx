import { Pressable, StyleSheet, View } from 'react-native';
import * as Linking from 'expo-linking';
import ItemHeader from './ItemHeader';
import ItemStat from './ItemStat';
import Text from '../Text';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: { backgroundColor: 'white', padding: 10 },

  stats: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  button: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const RepositoryItem = ({ item }) => {
  return (
    <View testID='repositoryItem' style={styles.container}>
      <ItemHeader item={item} />
      <View style={styles.stats}>
        <ItemStat name={'Stars'} value={item.stargazersCount} />
        <ItemStat name={'Forks'} value={item.forksCount} />
        <ItemStat name={'Reviews'} value={item.reviewCount} />
        <ItemStat name={'Rating'} value={item.ratingAverage} />
      </View>
      {item.url && (
        <Pressable
          style={styles.button}
          onPress={() => Linking.openURL(item.url)}
        >
          <Text color={'white'} fontWeight={'bold'}>
            Open in GitHub
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;
