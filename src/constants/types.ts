import { ParamListBase } from "@react-navigation/native";

export interface RootStackParamList extends ParamListBase {
  JobDetails: { id: string };
  Search: { searchTerm: string };
}
