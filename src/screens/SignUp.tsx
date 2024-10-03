import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { COLORS } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../styles/SignPagesStyles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";
import { Field } from "../components/SignPages/Field";
import { useSignUpPage } from "../hooks/useSignUp";

const SignUp = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<ParamListBase>;
}) => {
  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    signUpPress,
  } = useSignUpPage();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>

      <ScrollView keyboardShouldPersistTaps={"handled"}>
        <View style={[styles.FieldsContainer, { marginTop: 50 }]}>
          <Field
            text="Username"
            placeholder="Enter your Username"
            value={username}
            setValue={setUsername}
          />
          
          <Field
            text="Email"
            placeholder="Enter your Email"
            value={email}
            setValue={setEmail}
          />      

          <Field
            text="Password"
            placeholder="Enter your Password"
            value={password}
            setValue={setPassword}
            isPassword={true}
          /> 

          <Field
            text="Confirm Password"
            placeholder="Confirm your Password"
            value={confirmPassword}
            setValue={setConfirmPassword}
            isPassword={true}
          />

          {error && (
            <Text style={styles.FieldError}>{error}</Text>
          )}

          <TouchableOpacity
            style={styles.SubmitButton}
            onPress={async () => {
              signUpPress(username, email, password);
            }}
          >
            <Text style={styles.SubmitText}>Submit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.SignInContainer}>
          <Text style={styles.SignInText}>Already have an account? </Text>

          <TouchableOpacity onPress={() => navigation.navigate("Sign In")}>
            <Text style={styles.SignInButtonText}>Sign In.</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
