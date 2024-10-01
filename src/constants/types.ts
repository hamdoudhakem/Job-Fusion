import { ParamListBase } from "@react-navigation/native";

export interface RootStackParamList extends ParamListBase {
  Home: { user: { username: string; email: string; password: string } };
  JobDetails: { id: string };
  Search: { searchTerm: string };
}

export enum SignResponses {
  Success = 'success',
  AlreadyExists = 'Already Exists',
  Error= 'error',
  UserDoesNotExist = 'User Does Not Exist',
  IncorrectPassword = 'Incorrect Password'
}