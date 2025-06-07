import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Text from './Text';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';

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
  username: yup.string().required('Username is required').min(5).max(30),
  password: yup.string().required('Password is required').min(5).max(50),

  confirmPassword: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export const SignUpContainer = ({ onSubmit }) => {
  const formik = useFormik({
    validationSchema,
    initialValues: { username: '', password: '', confirmPassword: '' },
    onSubmit,
  });

  const isUsernameError = formik.touched.username && formik.errors.username;
  const isPasswordError = formik.touched.password && formik.errors.password;

  const isConfirmPasswordError =
    formik.touched.confirmPassword && formik.errors.confirmPassword;

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, isUsernameError && styles.errorInput]}
        placeholder='Username'
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      {isUsernameError && <Text color={'error'}>{formik.errors.username}</Text>}
      <TextInput
        style={[styles.input, isPasswordError && styles.errorInput]}
        placeholder='Password'
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        secureTextEntry
      />
      {isPasswordError && <Text color={'error'}>{formik.errors.password}</Text>}
      <TextInput
        style={[styles.input, isConfirmPasswordError && styles.errorInput]}
        placeholder='Confirm password'
        value={formik.values.confirmPassword}
        onChangeText={formik.handleChange('confirmPassword')}
        secureTextEntry
      />
      {isConfirmPasswordError && (
        <Text color={'error'}>{formik.errors.confirmPassword}</Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text color={'white'} fontWeight={'bold'}>
          Sign up
        </Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [signIn] = useSignIn();
  const [createUser] = useMutation(CREATE_USER);
  const navigate = useNavigate();
  
  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await createUser({ variables: { user: { username, password } } });
      await signIn({ username, password });
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
