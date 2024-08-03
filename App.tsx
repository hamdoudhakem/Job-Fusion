import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import Search from "./src/screens/Search";
import JobDetails from "./src/screens/JobDetails";
import { COLORS, icons, images, SIZES } from "./src/constants";
import { ScreenHeaderBtn } from "./src/components";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { RootStackParamList } from "./src/constants/types";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded] = useFonts({
    DMBold: require("./assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("./assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("./assets/fonts/DMSans-Regular.ttf"),
  });

  useEffect(() => {
    console.log("fontsLoaded is", fontsLoaded);
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShadowVisible: false,
              headerStyle: { backgroundColor: COLORS.lightWhite },
              headerLeft: () => (
                <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
              ),
              headerRight: () => (
                <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
              ),
              headerTitle: () => "",
            }}
          />
          <Stack.Screen
            name="Search"
            component={Search}
            options={{
              headerStyle: { backgroundColor: COLORS.lightWhite },
              headerShadowVisible: false,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="JobDetails"
            component={JobDetails}
            options={{
              headerStyle: { backgroundColor: COLORS.lightWhite },
              headerShadowVisible: false,
              headerBackVisible: false,
              headerRight: () => (
                <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
              ),
              headerTitle: "",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
