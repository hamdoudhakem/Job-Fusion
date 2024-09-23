import { ParamListBase } from "@react-navigation/native";

export interface RootStackParamList extends ParamListBase {
  Home: { user: { username: string; email: string; password: string } };
  JobDetails: { id: string };
  Search: { searchTerm: string };
}
