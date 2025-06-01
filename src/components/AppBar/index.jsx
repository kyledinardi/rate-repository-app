import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import { useQuery } from "@apollo/client";
import AppBarTab from "./AppBarTab";
import theme from "../../theme";
import { ME } from "../../graphql/queries";

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    minWidth: "100%",
  },
});

const AppBar = () => {
  const { data, error } = useQuery(ME, { fetchPolicy: "cache-and-network" });

  console.log(data);

  if (error) {
    console.error(error);
  }

  return (
    <View>
      <ScrollView horizontal contentContainerStyle={styles.container}>
        <AppBarTab name="Repositories" linkTo="/" />
        {data?.me ? (
          <AppBarTab name="Sign out" isSignOut />
        ) : (
          <AppBarTab name="Sign in" linkTo="/sign-in" />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
