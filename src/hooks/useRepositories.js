import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {
  const { data, error, loading, fetchMore, ...result } = useQuery(
    GET_REPOSITORIES,
    { variables, fetchPolicy: 'cache-and-network' }
  );

  if (error) {
    console.error(error);
  }

  const handleFetchMore = () => {
    const pageInfo = data?.repositories.pageInfo;
    const canFetchMore = !loading && pageInfo.hasNextPage;

    if (canFetchMore) {
      fetchMore({
        variables: { ...variables, after: pageInfo.endCursor },
      });
    }
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;
