import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import styles from "./popularjobs.style";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import { useFetch } from "../../../hooks/useFetch";

const Popularjobs = () => {
  const navigation: NativeStackNavigationProp<ParamListBase> = useNavigation();

  const { data, isLoading, error, refetch } = useFetch("search", {
    query: "react developer",
    num_pages: 1,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <TouchableOpacity style={styles.headerBtn}>
          <Text>Show All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size={"large"} color={COLORS.primary} />
        ) : error ? (
          <Text>Somethiong went wrong</Text>
        ) : (
          <FlatList
            data={data}
            // keyExtractor={(item) => item?.job_id}
            contentContainerStyle={{ columnGap: SIZES.small }}
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={({ item }) => <PopularJobCard item={item} />}
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
