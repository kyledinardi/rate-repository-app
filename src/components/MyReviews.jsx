import { FlatList, View } from 'react-native';
import ReviewItem from './ReviewItem';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';

export const MyReviewsContainer = ({ reviews, refetch }) => {
  return (
    <FlatList
      data={reviews}
      keyExtractor={({ node }) => node.id}
      ItemSeparatorComponent={<View style={{ height: 10 }} />}
      renderItem={({ item }) => (
        <ReviewItem review={item.node} refetch={refetch} myReview={true} />
      )}
    />
  );
};

const MyReviews = () => {
  const { data, error, refetch } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
  });

  if (error) {
    console.error(error);
  }

  const reviews = data?.me?.reviews.edges;
  return reviews && <MyReviewsContainer reviews={reviews} refetch={refetch} />;
};

export default MyReviews;
