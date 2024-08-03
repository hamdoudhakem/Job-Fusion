import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { COLORS, icons, images, SIZES } from "../constants";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";

export default function Home({
  navigation,
}: {
  navigation: NativeStackNavigationProp<ParamListBase>;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium }}>
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handlePress={() => {
              if (searchTerm) {
                navigation.push(`Search`, { searchTerm: searchTerm });
              }
            }}
          />
          <Popularjobs />
          <Nearbyjobs />
        </View>
      </ScrollView>
    </View>
  );
}
