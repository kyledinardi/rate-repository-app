import { StyleSheet, View } from 'react-native';
import ItemHeader from './ItemHeader';
import ItemStat from './ItemStat';

const styles = StyleSheet.create({
  container: { backgroundColor: 'white', padding: 10 },

  stats: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <ItemHeader item={item} />
      <View style={styles.stats}>
        <ItemStat name={'Stars'} value={item.stargazersCount} />
        <ItemStat name={'Forks'} value={item.forksCount} />
        <ItemStat name={'Reviews'} value={item.reviewCount} />
        <ItemStat name={'Rating'} value={item.ratingAverage} />
      </View>
    </View>
  );
};

export default RepositoryItem;
