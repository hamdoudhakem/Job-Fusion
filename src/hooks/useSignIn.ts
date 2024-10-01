import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { SignResponses } from '../constants'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useSignIn = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loadingUser, setLoadingUser] = useState(true)  

  const signIn = async (email: string, password: string) => {
    setEmailError('')
    setPasswordError('')    
    
    let result = {status: null, user: null}

    if(result.status === SignResponses.Success){
      navigation.navigate("Home", {user: result.user})
      setEmail('')
      setPassword('')
    }else if (result.status === SignResponses.UserDoesNotExist){
      setEmailError("Email does not exist")
    }else if (result.status === SignResponses.IncorrectPassword){
      setPasswordError("Incorrect password")
    }
  }
  
  return {   
    email,
    setEmail,
    emailError,
    password,
    setPassword,
    passwordError,   
    signIn,
    loadingUser
  }
}
