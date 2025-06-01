import { Link } from "react-router-native";
import Text from "../Text";
import { Pressable } from "react-native";
import useAuthStorage from "../../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client";

const AppBarTab = ({ name, linkTo, isSignOut }) => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  if (isSignOut) {
    return (
      <Pressable
        style={{ padding: 10 }}
        onPress={async () => {
          await authStorage.removeAccessToken();
          await apolloClient.resetStore();
        }}
      >
        <Text style={{ color: "white" }}>{name}</Text>
      </Pressable>
    );
  }

  return (
    <Link to={linkTo} style={{ padding: 10 }}>
      <Text style={{ color: "white" }}>{name}</Text>
    </Link>
  );
};
export default AppBarTab;
