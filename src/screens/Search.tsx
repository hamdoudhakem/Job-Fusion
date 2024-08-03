import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import axios from "axios";
import { ScreenHeaderBtn, NearbyJobCard } from "../components";
import { COLORS, icons, SIZES } from "../constants";
import styles from "../styles/search";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../constants/types";
import { rapidApiData, useFetch } from "../hooks/useFetch";
import { RAPID_API_KEY } from "@env";

const rapidApiKey = RAPID_API_KEY;

type SearchProps = NativeStackScreenProps<RootStackParamList, "Search">;

const Search = ({ navigation, route }: SearchProps) => {
  const params = route.params;

  const [searchResult, setSearchResult] = useState<rapidApiData[]>([]);
  const [searchLoader, setSearchLoader] = useState(false);
  const [searchError, setSearchError] = useState<any>(null);
  const [page, setPage] = useState(1);

  const handleSearch = async () => {
    setSearchLoader(true);
    setSearchResult([]);

    try {
      const options = {
        method: "GET",
        url: `https://jsearch.p.rapidapi.com/search`,
        headers: {
          "X-RapidAPI-Key": rapidApiKey,
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
        params: {
          query: params.searchTerm,
          page: page.toString(),
        },
      };

      const response = await axios.request(options);
      setSearchResult(response.data.data);
    } catch (error) {
      setSearchError(error);
      console.log(error);
    } finally {
      setSearchLoader(false);
    }
  };

  const handlePagination = (direction: string) => {
    if (direction === "left" && page > 1) {
      setPage(page - 1);
      handleSearch();
    } else if (direction === "right") {
      setPage(page + 1);
      handleSearch();
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <ScreenHeaderBtn
          iconUrl={icons.left}
          dimension="60%"
          handlePress={() => navigation.goBack()}
        />
      ),
    });

    handleSearch();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <FlatList
        data={searchResult}
        renderItem={({ item }) => (
          <NearbyJobCard
            job={item}
            handleNavigate={() =>
              navigation.push(`JobDetails`, { id: item.job_id })
            }
          />
        )}
        keyExtractor={(item) => item.job_id}
        contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
        ListHeaderComponent={() => (
          <>
            <View style={styles.container}>
              <Text style={styles.searchTitle}>{params.searchTerm}</Text>
              <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
            </View>
            <View style={styles.loaderContainer}>
              {searchLoader ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
              ) : (
                searchError && <Text>Oops something went wrong</Text>
              )}
            </View>
          </>
        )}
        ListFooterComponent={() => (
          <View style={styles.footerContainer}>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => handlePagination("left")}
            >
              <Image
                source={icons.chevronLeft}
                style={styles.paginationImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={styles.paginationTextBox}>
              <Text style={styles.paginationText}>{page}</Text>
            </View>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => handlePagination("right")}
            >
              <Image
                source={icons.chevronRight}
                style={styles.paginationImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default Search;
