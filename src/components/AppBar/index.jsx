import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { useQuery } from '@apollo/client';
import AppBarTab from './AppBarTab';
import theme from '../../theme';
import { GET_CURRENT_USER } from '../../graphql/queries';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    minWidth: '100%',
  },
});

const AppBar = () => {
  const { data, error } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: 'cache-and-network',
  });

  if (error) {
    console.error(error);
  }

  return (
    <View>
      <ScrollView horizontal contentContainerStyle={styles.container}>
        <AppBarTab name='Repositories' linkTo='/' />
        {data?.me ? (
          <>
            <AppBarTab name='Create a review' linkTo='/create-review' />
            <AppBarTab name='My reviews' linkTo='/my-reviews' />
            <AppBarTab name='Sign out' isSignOut={true} />
          </>
        ) : (
          <>
            <AppBarTab name='Sign in' linkTo='/sign-in' />
            <AppBarTab name='Sign up' linkTo='/sign-up' />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
