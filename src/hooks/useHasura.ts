import { Alert } from "react-native";
import { graphql, commitMutation, fetchQuery, Disposable  } from "react-relay";
import { environment } from "../../relay/Environment";
import SHA3 from 'crypto-js/sha3';
import {useHasuragetUserByEmailQuery, useHasuragetUserByEmailQuery$data} from './__generated__/useHasuragetUserByEmailQuery.graphql'

export enum SignResponses {
  Success = 'success',
  AlreadyExists = 'Already Exists',
  Error= 'error',
  UserDoesNotExist = 'User Does Not Exist',
  IncorrectPassword = 'Incorrect Password'
}

export const signUpHasura = async (
  username: string,
  email: string,
  password: string
) => {

  try{
    const userExists = await checkForUser(email)

    if(userExists.users_connection.edges.length > 0) {
      console.log("user Exists and He is : ", userExists.users_connection.edges[0].node)
      return {status: SignResponses.AlreadyExists, user: userExists.users_connection.edges[0].node}
    }
  
    console.log("User does not exist")
  
    const mutation = graphql`
      mutation useHasuraSignUpMutation($userData: [users_insert_input!]!) {
        insert_users(objects: $userData) {
          returning {
            email
            id
            password
            username
          }
        }
      }
    `
    const hashedPassword = SHA3(password).toString()

    // Now we just call commitMutation with the appropriate parameters
    commitMutation(
      environment,
      {
        mutation,
        variables: {
          userData: [{email, password: hashedPassword, username}],
        },
      }
    );
  
    return {status: SignResponses.Success, user: {email, password, username}}
  }catch(e){
    Alert.alert("An Error occured while signing up")
    return {status: SignResponses.Error, user: null}
  }  
}

export const signInHasura = async (email: string, password: string) => {
  const user = await checkForUser(email)

  //User Does not exist
  if(user.users_connection.edges.length === 0) {
    return {status: SignResponses.UserDoesNotExist, user: null}
  }

  const hashedPassword = SHA3(password).toString()

  //User exists and password is correct
  if(user.users_connection.edges[0].node.password === hashedPassword) {
    return {status: SignResponses.Success, user: user.users_connection.edges[0].node}
  }

  //Password is incorrect
  return {status: SignResponses.IncorrectPassword, user: null}
}

const checkForUser = async (email: string) => {
  const query = graphql`
    query useHasuragetUserByEmailQuery($email: String!) {
      users_connection(where: {email: {_eq: $email}}) {
        edges {
          node {
            id
            password
            username
          }
        }
      }
    }
  `;  

  const variables = { email }   
    
  const user : unknown = await fetchQuery(environment, query, variables)

  return user as useHasuragetUserByEmailQuery$data
}