import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, ScrollView, RefreshControl, BackHandler } from "react-native";
import { COLORS, icons, SIZES } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  ScreenHeaderProfileBtn,
  Welcome,
} from "../components";
import { RootStackParamList } from "../constants";

export default function Home({
  navigation,
  route
}: NativeStackScreenProps<RootStackParamList, "Home">) {
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const popularJobsRef = useRef<any>();
  const nearbyJobsRef = useRef<any>();

  const { username, email, password } = route.params.user;

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <ScreenHeaderBtn 
          iconUrl={icons.exit} 
          dimension="60%" 
          disableBorderRadius={true}
          handlePress={async () => {
            await AsyncStorage.removeItem("user")
            navigation.navigate("Sign In")
          }}
        />
      ),
      headerRight: () => (
        <ScreenHeaderProfileBtn 
          initial={username[0]}
        />
      ),
    })
  }, [])

  useFocusEffect(
    useCallback(() => {      
      // Disable back button
      const backPress = BackHandler.addEventListener("hardwareBackPress", () => {return true})

      return () => {
        backPress.remove()
      }
    }, [])
  )

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
            user={{ username, email, password }}
          />
          <Popularjobs ref={popularJobsRef} />
          <Nearbyjobs ref={nearbyJobsRef} />
        </View>
      </ScrollView>
    </View>
  );
}
