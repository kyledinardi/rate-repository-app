import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import Text from "./Text";
import theme from "../theme";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  container: { backgroundColor: "white", padding: 10 },
  input: { margin: 10, padding: 10, borderWidth: 1, borderRadius: 5 },
  errorInput: { borderColor: theme.colors.error },

  button: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: { color: "white" },
});

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  const formik = useFormik({
    validationSchema,
    initialValues: { username: "", password: "" },
    onSubmit,
  });

  const isUsernameError = formik.touched.username && formik.errors.username;
  const isPasswordError = formik.touched.password && formik.errors.password;

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, isUsernameError && styles.errorInput]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      {isUsernameError && <Text color={"error"}>{formik.errors.username}</Text>}
      <TextInput
        style={[styles.input, isPasswordError && styles.errorInput]}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        secureTextEntry
      />
      {isPasswordError && <Text color={"error"}>{formik.errors.password}</Text>}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText} fontWeight={"bold"}>
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
