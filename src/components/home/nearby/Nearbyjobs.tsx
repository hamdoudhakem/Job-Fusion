import React, { forwardRef, useImperativeHandle } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import styles from "./nearbyjobs.style";
import { COLORS } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import { useFetch } from "../../../hooks/useFetch";

const Popularjobs = forwardRef((props, ref) => {
  const navigation: NativeStackNavigationProp<ParamListBase> = useNavigation();

  const { data, isLoading, error, refetch } = useFetch("search", {
    query: "react developer",
    num_pages: 1,
    date_posted: "all",
    page: "1",
  });

  useImperativeHandle(ref, () => ({ refetch }));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
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
          data.map((job) => (
            <NearbyJobCard
              key={`nearby-job-${job.job_id}`}
              job={job}
              handleNavigate={() =>
                navigation.navigate(`JobDetails`, { id: job.job_id })
              }
            />
          ))
        )}
      </View>
    </View>
  );
});

export default Popularjobs;
