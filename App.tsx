import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Search from "./screens/Search";
import { COLORS, icons, images, SIZES } from "./constants";
import { ScreenHeaderBtn } from "./components";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    DMBold: require("./assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("./assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("./assets/fonts/DMSans-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(() => {
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
          <Stack.Screen name="Search" component={Search} />
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
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
