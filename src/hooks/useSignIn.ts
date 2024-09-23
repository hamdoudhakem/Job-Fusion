import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { signInHasura , SignResponses } from './useHasura'
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

  useEffect(() => {
    console.log("I Will Fetch data again")
    const fetchData = async () => {
      try{
        const data = await AsyncStorage.getItem("user")
        if(data){
          navigation.navigate("Home", {user: JSON.parse(data)})
          setLoadingUser(false)
          setEmail('')
          setPassword('')
        }else{
          setLoadingUser(false)
        }
      }catch(e){
        setLoadingUser(false)
      }      
    }

    setLoadingUser(true)
    fetchData()
  }, [])

  const signIn = async (email: string, password: string) => {
    setEmailError('')
    setPasswordError('')    
    
    const result = await signInHasura(email, password)

    if(result.status === SignResponses.Success){
      await AsyncStorage.setItem("user", JSON.stringify(result.user))
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
