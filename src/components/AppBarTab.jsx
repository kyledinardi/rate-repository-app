import { Link } from "react-router-native";
import Text from "./Text";

const AppBarTab = ({ name, linkTo }) => (
  <Link to={linkTo} style={{ padding: 10 }}>
    <Text style={{ color: "white" }}>{name}</Text>
  </Link>
);
export default AppBarTab;
