import { FlatList, View } from 'react-native';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';

const styles = { separator: { height: 10 }, listHeader: { marginBottom: 10 } };

export const SingleRepositoryContainer = ({ repository, onEndReach }) => {
  return (
    <FlatList
      data={repository.reviews.edges}
      onEndReached={onEndReach}
      keyExtractor={({ node }) => node.id}
      ItemSeparatorComponent={<View style={styles.separator} />}
      renderItem={({ item }) => <ReviewItem review={item.node} />}
      ListHeaderComponent={() => (
        <View style={styles.listHeader}>
          <RepositoryItem item={repository} />
        </View>
      )}
    />
  );
};

const SingleRepository = () => {
  const { id } = useParams();

  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id, first: 5 },
  });

  if (error) {
    console.error(error);
  }

  const repository = data?.repository;
  const pageInfo = repository?.reviews.pageInfo;

  const handleFetchMore = () => {
    const canFetchMore = !loading && pageInfo.hasNextPage;

    if (canFetchMore) {
      fetchMore({ variables: { id, first: 3, after: pageInfo.endCursor } });
    }
  };

  return (
    repository && (
      <SingleRepositoryContainer
        repository={repository}
        onEndReach={handleFetchMore}
      />
    )
  );
};

export default SingleRepository;
