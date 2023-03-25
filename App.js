import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, useTheme } from "@ui-kitten/components"
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PrayerTimesScreen from './Screens/PrayerTimesScreen';
import Ionicons from "@expo/vector-icons/Ionicons"
import { FontAwesome5, Foundation, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import CompassScreen from './Screens/CompassScreen';
import AzkarScreen from './Screens/AzkarScreen';
import store from './store'
import { Provider, useDispatch } from 'react-redux'
import * as LocationAPI from 'expo-location';
import { actions } from "./store"
import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

  function App() {

    let TabNavigation = createBottomTabNavigator();

    let theme = useTheme();

    let storeDispatch = useDispatch();

    let [splashScreen, setSplashScreen] = useState();

    async function getLocation() {

      let { status } = await LocationAPI.requestForegroundPermissionsAsync();

      console.log(status);

      if (status !== "granted") {
        console.log("Location access is not permitted.");

        return;
      }

      let currentLocation = await LocationAPI.getCurrentPositionAsync({ accuracy: LocationAPI.Accuracy.Balanced, enableHighAccuracy: true, });

      storeDispatch(actions.setLocation(currentLocation.coords));

      SplashScreen.hideAsync();

    }

    useEffect(() => {

      getLocation();

    }, [])

    return (
      <TabNavigation.Navigator screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#BA870B",
        tabBarInactiveTintColor: "#BA870B",
        tabBarStyle: { borderTopWidth: 1, borderTopColor: "#999", },
        headerRight: () => (<Button style={{ marginRight: 25, }} onPress={() => getLocation()} status="control" appearance="ghost" accessoryLeft={() => <Entypo name="location" size={24} color="#EAAA0E" />}></Button>)
      })}>

        <TabNavigation.Screen name="Praying Times" component={PrayerTimesScreen} options={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (focused) {
              return <Ionicons name="ios-home" size={size} color={color} />
            } else {
              return <Ionicons name="ios-home-outline" size={size} color={color} />
            }
          },
        })} />
        <TabNavigation.Screen name="CompassScreen" component={CompassScreen} options={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {

            if (focused) {
              return <Ionicons name="compass" size={(size + 4)} color={color} />
            } else {
              return <FontAwesome5 name="compass" size={size} color={color} />
            }

          },
          headerTitle: "Compass",
          tabBarLabel: "Compass",
        })} />
        <TabNavigation.Screen name="AzkarScreen" component={AzkarScreen} options={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {

            if (focused) {
              return <Ionicons name="reader" size={size} color={color} />
            } else {
              return <Ionicons name="reader-outline" size={size} color={color} />

            }
          },
          headerShown: false,
        })} />

      </TabNavigation.Navigator>
    )
  }

  export default () => (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Provider store={store}>
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </Provider>
    </ApplicationProvider>
  );