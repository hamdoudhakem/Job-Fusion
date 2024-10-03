import React, { useEffect, useState } from 'react'
import { ParamListBase, useIsFocused, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useSignIn, useUser } from '@clerk/clerk-expo'

export const useSignInPage = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loadingUser, setLoadingUser] = useState(true)

  const { setActive, signIn, isLoaded } = useSignIn()
  const isScreenFocused  = useIsFocused()
  const { isSignedIn, user } =  useUser()

  useEffect(() => {
    //To prevent This Home page navigation when in the SignUp page
    if(!isScreenFocused){
      return
    }
    
    if(isSignedIn){
      navigation.navigate("Home", {
        user: {
          username: user.firstName ?? 'There',
          email: user.emailAddresses[0].emailAddress
        }
      })

      //In case the page doesn't navigate fast enough and the SignIn page starts showing
      setTimeout(() => setLoadingUser(false) , 500)
    }else{
      setLoadingUser(false)
    }    
  }, [isSignedIn])

  const signInPress = async () => {
    if(!isLoaded){
      return
    }

    setError('')  
    
    try{
      const signInAttempt = await signIn.create({
        identifier: email.trim(),
        password: password.trim(),
      })      
        
      if(signInAttempt.status === 'complete'){
        //"isSignedIn" is going to update and "useEffect" will navigate to the Home page
        await setActive({session: signInAttempt.createdSessionId})    

        setEmail('')
        setPassword('')
      }

    }catch(err : any){
      setError(err.errors[0].message)   
    }    
  }
  
  return {   
    email,
    setEmail,
    password,
    setPassword,
    error,   
    signInPress,
    loadingUser
  }
}
