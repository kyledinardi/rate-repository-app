import { View } from 'react-native';
import Text from '../Text';

const formatNumber = (n) => {
  if (n >= 1000) {
    return `${Math.round(n / 100) / 10}k`;
  }

  return n;
};

const ItemStats = ({ name, value }) => {
  return (
    <View>
      <Text fontWeight={'bold'} centered={true}>
        {formatNumber(value)}
      </Text>
      <Text color={'textSecondary'}>{name}</Text>
    </View>
  );
};

export default ItemStats;
