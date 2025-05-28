import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import theme from "../theme";

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
  return (
    <View>
      <ScrollView horizontal contentContainerStyle={styles.container}>
        <AppBarTab name="Repositories" linkTo="/" />
        <AppBarTab name="Sign in" linkTo="/sign-in" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
