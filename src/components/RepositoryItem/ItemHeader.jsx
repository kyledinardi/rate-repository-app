import { Image, StyleSheet, View } from 'react-native';
import Text from '../Text';
import theme from '../../theme';

const styles = StyleSheet.create({
  header: { display: 'flex', flexDirection: 'row', gap: 10, marginBottom: 10 },
  ownerAvatar: { width: 50, height: 50, borderRadius: 5 },
  info: { display: 'flex', gap: 5 },

  language: {
    backgroundColor: theme.colors.primary,
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
});

const ItemHeader = ({ item }) => {
  return (
    <View style={styles.header}>
      <Image source={{ uri: item.ownerAvatarUrl }} style={styles.ownerAvatar} />
      <View style={styles.info}>
        <Text fontWeight={'bold'}>{item.fullName}</Text>
        <Text color={'textSecondary'}>{item.description}</Text>
        <Text style={styles.language} color={'white'}>
          Language: {item.language}
        </Text>
      </View>
    </View>
  );
};

export default ItemHeader;
