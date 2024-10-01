import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { SignResponses } from '../constants'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useSignUp = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')

  const signUp = async (username: string, email: string, password: string) => {
    setEmailError('')
    setPasswordError('')
    setConfirmPasswordError('')

    if(password.length < 8){
      setPasswordError("Password must be at least 8 characters")
      return;
    }

    if(password !== confirmPassword){
      setConfirmPasswordError("Passwords do not match")
      return;
    }

    if(email.length === 0){
      setEmailError("Email cannot be empty")
      return;
    }

    if(username.length === 0){
      setEmailError("Username cannot be empty")
      return;
    }
    
    const result = {status: null, user: null}

    if(result.status === SignResponses.Success){
      navigation.navigate("Home", {user: result.user})
    }else if (result.status === SignResponses.AlreadyExists){
      setEmailError("Email already exists")
    }       
  }
  
  return {
    username,
    setUsername,
    email,
    setEmail,
    emailError,
    password,
    setPassword,
    passwordError,
    confirmPassword,
    setConfirmPassword,
    confirmPasswordError,
    signUp
  }
}
