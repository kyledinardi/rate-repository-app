import { Alert, Pressable, StyleSheet, View } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { Link } from 'react-router-native';
import { useApolloClient, useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
  },

  review: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },

  rating: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
    padding: 5,
    width: 40,
    height: 40,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  reviewDetails: { flex: 1 },

  buttons: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },

  button: {
    padding: 10,
    borderRadius: 5,
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  repositoryButton: { backgroundColor: theme.colors.primary },
  deleteButton: { backgroundColor: theme.colors.error },
});

const formatDate = (date) => {
  const slashDate = new Date(date).toLocaleDateString({
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });

  return slashDate.replace(/\//g, '.');
};

export const ReviewItemContainer = ({ review, myReview, onDelete }) => {
  const alertDelete = () => {
    Alert.alert(
      'Delete Review',
      'Are you sure you want to delete this review?',

      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: onDelete },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.review}>
        <View style={styles.rating}>
          <Text color={'primary'} fontWeight={'bold'}>
            {review.rating}
          </Text>
        </View>
        <View style={styles.reviewDetails}>
          <Text fontWeight={'bold'}>
            {myReview ? review.repository.fullName : review.user.username}
          </Text>
          <Text color={'textSecondary'}>{formatDate(review.createdAt)}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>
      {myReview && (
        <View style={styles.buttons}>
          <Link
            style={[styles.button, styles.repositoryButton]}
            to={`/repositories/${review.repository.id}`}
          >
            <Text color={'white'} fontWeight={'bold'}>
              View Repository
            </Text>
          </Link>
          <Pressable
            style={[styles.button, styles.deleteButton]}
            onPress={alertDelete}
          >
            <Text color={'white'} fontWeight={'bold'}>
              Delete Review
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const ReviewItem = ({ review, refetch, myReview }) => {
  const apolloClient = useApolloClient();
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const onDelete = async () => {
    try {
      await deleteReview({ variables: { id: review.id } });
      await apolloClient.resetStore();
      refetch();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ReviewItemContainer
      review={review}
      myReview={myReview}
      onDelete={onDelete}
    />
  );
};

export default ReviewItem;
