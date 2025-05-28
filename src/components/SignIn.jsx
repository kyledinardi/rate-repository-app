import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
  },

  input: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },

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
  const formik = useFormik({
    validationSchema,
    initialValues: { username: "", password: "" },
    onSubmit: (values) => console.log(values),
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, formik.errors.username && styles.errorInput]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      {formik.errors.username && (
        <Text color={"error"}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={[styles.input, formik.errors.password && styles.errorInput]}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        secureTextEntry
      />
      {formik.errors.password && (
        <Text color={"error"}>{formik.errors.password}</Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText} fontWeight={"bold"}>
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
