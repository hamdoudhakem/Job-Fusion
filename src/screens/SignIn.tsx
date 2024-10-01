import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { COLORS } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../styles/SignPagesStyles'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ParamListBase } from '@react-navigation/native'
import { Field } from '../components/SignPages/Field'
import { useSignIn } from '../hooks/useSignIn'

const SignUp = ({
  navigation
}: {
  navigation : NativeStackNavigationProp<ParamListBase> 
}) => {
  const {
    email,
    setEmail,
    emailError,
    password,
    setPassword,
    passwordError,   
    signIn,
    loadingUser
  } = useSignIn()
  
  //Don't show the screen until we know if the user is logged in or not
  if(loadingUser){
    return null
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Sign In</Text>

      <ScrollView keyboardShouldPersistTaps={"handled"}>
        <View style={styles.FieldsContainer}>
          <Field 
            text="Email" 
            placeholder="Enter your Email" 
            value={email} 
            setValue={setEmail} 
          />

          {emailError && (
            <Text style={styles.FieldError}>{emailError}</Text>
          )}
          
          <Field 
            text="Password" 
            placeholder="Enter your Password" 
            value={password} 
            setValue={setPassword} 
            isPassword={true} 
          />

          {passwordError && (
            <Text style={styles.FieldError}>{passwordError}</Text>
          )}
          
          <TouchableOpacity 
            style={styles.SubmitButton} 
            onPress={() => signIn(email, password)}
          >
            <Text style={styles.SubmitText}>Submit</Text>
          </TouchableOpacity>
        </View>     

        <View style={styles.SignInContainer}>
          <Text style={styles.SignInText}>Already have an account? </Text>

          <TouchableOpacity onPress={() => navigation.navigate("Sign Up")}>
            <Text style={styles.SignInButtonText}>Sign Up.</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp