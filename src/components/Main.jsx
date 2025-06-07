import { Route, Routes, Navigate } from 'react-router-native';
import { StyleSheet, View } from 'react-native';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SingleRepository from './SingleRepository';
import SignIn from './SignIn';
import theme from '../theme';
import ReviewForm from './ReviewForm';
import SignUp from './SignUp';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => (
  <View style={styles.container}>
    <AppBar />
    <Routes>
      <Route path='/' element={<RepositoryList />} />
      <Route path='/repositories/:id' element={<SingleRepository />} />
      <Route path='/create-review' element={<ReviewForm />} />
      <Route path='/my-reviews' element={<MyReviews />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  </View>
);

export default Main;
