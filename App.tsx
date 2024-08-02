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
import { ActivityIndicator, Text } from "react-native";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

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
    return <ActivityIndicator size={"large"} color={"purple"} />;
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
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="JobDetails" component={JobDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
