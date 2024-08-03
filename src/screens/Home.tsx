import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
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
  const [refreshing, setRefreshing] = useState(false);
  const popularJobsRef = useRef<any>();
  const nearbyJobsRef = useRef<any>();

  const OnRefresh = () => {
    setRefreshing(true);
    popularJobsRef.current?.refetch();
    nearbyJobsRef.current?.refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={OnRefresh} />
        }
      >
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
          <Popularjobs ref={popularJobsRef} />
          <Nearbyjobs ref={nearbyJobsRef} />
        </View>
      </ScrollView>
    </View>
  );
}
