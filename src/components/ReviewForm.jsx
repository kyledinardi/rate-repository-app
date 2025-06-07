import { useFormik } from 'formik';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';
import { useApolloClient, useMutation } from '@apollo/client';
import Text from './Text';
import theme from '../theme';
import { CREATE_REVIEW } from '../graphql/mutations';

const styles = StyleSheet.create({
  container: { backgroundColor: 'white', padding: 10 },
  input: { margin: 10, padding: 10, borderWidth: 1, borderRadius: 5 },
  errorInput: { borderColor: theme.colors.error },

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

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository owner name is required')
    .lowercase()
    .trim(),

  repositoryName: yup
    .string()
    .required('Repository name is required')
    .lowercase()
    .trim(),

  rating: yup.number().required('Rating is required').integer().min(0).max(100),
  text: yup.string().trim(),
});

export const ReviewFormContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: { ownerName: '', repositoryName: '', rating: '', text: '' },
    validationSchema,
    onSubmit,
  });

  const isOwnerNameError = formik.touched.ownerName && formik.errors.ownerName;

  const isrepositoryNameError =
    formik.touched.repositoryName && formik.errors.repositoryName;

  const isRatingError = formik.touched.rating && formik.errors.rating;
  const isTextError = formik.touched.text && formik.errors.text;

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, isOwnerNameError && styles.errorInput]}
        placeholder='Repository owner name'
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
      />
      {isOwnerNameError && (
        <Text color={'error'}>{formik.errors.ownerName}</Text>
      )}
      <TextInput
        style={[styles.input, isrepositoryNameError && styles.errorInput]}
        placeholder='Repository name'
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
      />
      {isrepositoryNameError && (
        <Text color={'error'}>{formik.errors.repositoryName}</Text>
      )}
      <TextInput
        style={[styles.input, isRatingError && styles.errorInput]}
        placeholder='Rating between 0 and 100'
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        keyboardType='number-pad'
      />
      {isRatingError && <Text color={'error'}>{formik.errors.rating}</Text>}
      <TextInput
        style={[styles.input, isTextError && styles.errorInput]}
        placeholder='Review'
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
      />
      {isTextError && <Text color={'error'}>{formik.errors.text}</Text>}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text color={'white'} fontWeight={'bold'}>
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

const ReviewForm = () => {
  const apolloClient = useApolloClient();
  const [createReview] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const { data } = await createReview({
        variables: { review: { ...values, rating: Number(values.rating) } },
      });

      await apolloClient.resetStore();
      navigate(`/repositories/${data.createReview.repositoryId}`);
    } catch (e) {
      console.error(e);
    }
  };

  return <ReviewFormContainer onSubmit={onSubmit} />;
};

export default ReviewForm;
