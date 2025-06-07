import { FlatList, View } from 'react-native';
import { Link } from 'react-router-native';
import { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = {
  separator: { height: 10 },

  searchbar: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 5,
  },
};

export const RepositoryListContainer = ({
  repositories,
  onEndReach,
  principle,
  setPrinciple,
  searchKeyword,
  setSearchKeyword,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      onEndReached={onEndReach}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={<View style={styles.separator} />}
      renderItem={({ item }) => (
        <Link to={`/repositories/${item.id}`}>
          <RepositoryItem item={item} />
        </Link>
      )}
      ListHeaderComponent={
        <View>
          <Searchbar
            style={styles.searchbar}
            placeholder='Search repositories...'
            onChangeText={setSearchKeyword}
            value={searchKeyword}
          />
          <Picker selectedValue={principle} onValueChange={setPrinciple}>
            <Picker.Item label='Latest repositories' value='latest' />
            <Picker.Item
              label='Highest rated repositories'
              value='highestRated'
            />
            <Picker.Item
              label='Lowest rated repositories'
              value='lowestRated'
            />
          </Picker>
        </View>
      }
    />
  );
};

const RepositoryList = () => {
  const [variables, setVariables] = useState({
    orderDirection: 'DESC',
    orderBy: 'CREATED_AT',
    searchKeyword: '',
  });

  const [principle, setPrinciple] = useState('latest');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  const { repositories, fetchMore } = useRepositories({
    ...variables,
    first: 6,
  });

  useEffect(() => {
    let newVariables = { ...variables };

    switch (principle) {
      case 'highestRated':
        newVariables.orderDirection = 'DESC';
        newVariables.orderBy = 'RATING_AVERAGE';
        break;

      case 'lowestRated':
        newVariables.orderDirection = 'ASC';
        newVariables.orderBy = 'RATING_AVERAGE';
        break;

      default:
        newVariables.orderDirection = 'DESC';
        newVariables.orderBy = 'CREATED_AT';
    }

    setVariables(newVariables);
  }, [principle]);

  useEffect(() => {
    setVariables({ ...variables, searchKeyword: debouncedSearchKeyword });
  }, [debouncedSearchKeyword]);

  return (
    repositories && (
      <RepositoryListContainer
        repositories={repositories}
        onEndReach={fetchMore}
        principle={principle}
        setPrinciple={setPrinciple}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
    )
  );
};

export default RepositoryList;
