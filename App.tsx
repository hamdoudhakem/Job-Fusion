import { useEffect } from "react";
import { LogBox } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import * as SecureStore from 'expo-secure-store'
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ClerkProvider, ClerkLoaded  } from '@clerk/clerk-expo'
import Home from "./src/screens/Home";
import Search from "./src/screens/Search";
import JobDetails from "./src/screens/JobDetails";
import SignUp from './src/screens/SignUp';
import SignIn from './src/screens/SignIn';
import { COLORS, icons,} from "./src/constants";
import { ScreenHeaderBtn, ScreenHeaderProfileBtn } from "./src/components";
import { RootStackParamList } from "./src/constants";
import { CLERK_PUBLISHABLE_KEY } from '@env'

LogBox.ignoreLogs(['Clerk: Clerk has been loaded with development keys.'])

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const tokenCache = {
    async getToken(key: string) {
      try {
        const item = await SecureStore.getItemAsync(key)        
        return item
      } catch (error) {
        await SecureStore.deleteItemAsync(key)
        return null
      }
    },
    async saveToken(key: string, value: string) {
      try {
        return SecureStore.setItemAsync(key, value)
      } catch (err) {
        return
      }
    },
  }

  const publishableKey = CLERK_PUBLISHABLE_KEY;

  if(!publishableKey){
    throw new Error("Clerk Publishable Key is missing, Go set CLERK_PUBLISHABLE_KEY in your .env file")
  }

  const [fontsLoaded] = useFonts({
    bold: require("./assets/fonts/DMSans-Bold.ttf"),
    medium: require("./assets/fonts/DMSans-Medium.ttf"),
    regular: require("./assets/fonts/DMSans-Regular.ttf"),
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
      
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <ClerkLoaded>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Sign In"
                component={SignIn}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="Sign Up"
                component={SignUp}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="Home"
                component={Home}
                options={{
                  headerShadowVisible: false,
                  headerStyle: { backgroundColor: COLORS.lightWhite },        
                  headerRight: () => (
                    <ScreenHeaderProfileBtn 
                      initial={''}
                    />
                  ),
                  headerTitle: () => "",
                  headerBackVisible: false               
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
        </ClerkLoaded>
      </ClerkProvider>       
    </>
  );
}
