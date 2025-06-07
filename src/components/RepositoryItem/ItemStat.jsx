import { View } from 'react-native';
import Text from '../Text';
import formatNumber from '../../utils/formatNumber';

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
