import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import styles from "./welcome.style";
import { COLORS, icons, SIZES } from "../../../constants";

const JobStypes = ["Full-time", "Part-time", "Contractor"];

const Welcome = ({
  searchTerm,
  setSearchTerm,
  handlePress,
  user,
}: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handlePress: () => void;
  user: { username: string; email: string; password: string };
}) => {
  const [activeJobType, setActiveJobType] = useState("Full-time");

  const navigation: NativeStackNavigationProp<ParamListBase> = useNavigation();

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello {user.username}</Text>
        <Text style={styles.welcomeMessage}>Find Job</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(e) => setSearchTerm(e)}
            placeholder="What are you looking for"
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={handlePress}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={JobStypes}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.tab,
                {
                  borderColor:
                    activeJobType === item ? COLORS.secondary : COLORS.gray2,
                },
              ]}
              onPress={() => {
                setActiveJobType(item);
                navigation.push(`Search`, { searchTerm: item });
              }}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    color:
                      activeJobType === item ? COLORS.secondary : COLORS.gray2,
                  },
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default Welcome;
