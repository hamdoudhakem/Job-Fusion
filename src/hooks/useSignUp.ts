import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useSignUp, isClerkAPIResponseError } from '@clerk/clerk-expo'

export const useSignUpPage = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const { isLoaded, setActive, signUp} = useSignUp()
  
  const signUpPress = async (username: string, email: string, password: string) => {
    if (!isLoaded) {
      return
    }   
    
    if(password !== confirmPassword){
      setError("Passwords do not match")
      return;
    }

    if(username.length === 0){
      setError("Username cannot be empty")
      return;
    }    

    try {
      const signUpResponse = await signUp.create({
        firstName: username.trim(),        
        emailAddress: email.trim(),
        password: password.trim(),
      })
            
      await setActive({session: signUpResponse.createdSessionId})
      navigation.navigate("Home", {user: {email, username}})

      setError('')
    } catch (err) {
      if (isClerkAPIResponseError(err)){
        setError(err.errors[0].longMessage ?? err.errors[0].message)
      }
    }       
  }
  
  return {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    signUpPress
  }
}
