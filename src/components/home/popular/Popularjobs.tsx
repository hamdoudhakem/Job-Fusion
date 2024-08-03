import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  ForwardRefRenderFunction,
} from "react";
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
import { rapidApiData, useFetch } from "../../../hooks/useFetch";

const Popularjobs = forwardRef((props, ref) => {
  const navigation: NativeStackNavigationProp<ParamListBase> = useNavigation();

  const { data, isLoading, error, refetch } = useFetch("search", {
    query: "react developer",
    num_pages: 1,
  });

  useImperativeHandle(ref, () => ({ refetch }));

  const [selectedJob, setSelectedJob] = useState("");

  const handleCardPress = (job: rapidApiData) => {
    navigation.push("JobDetails", { id: job.job_id });
    setSelectedJob(job.job_id);
  };

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
            keyExtractor={(item) => item.job_id}
            contentContainerStyle={{ columnGap: SIZES.small }}
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
              />
            )}
          />
        )}
      </View>
    </View>
  );
});

export default Popularjobs;
