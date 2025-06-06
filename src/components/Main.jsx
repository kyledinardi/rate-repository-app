import { Route, Routes, Navigate } from "react-router-native";
import { StyleSheet, View } from "react-native";
import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";
import SignIn from "./SignIn";
import theme from "../theme";

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
      <Route path="/" element={<RepositoryList />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </View>
);

export default Main;
