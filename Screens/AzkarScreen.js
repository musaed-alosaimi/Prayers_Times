import { View, Text, FlatList, StyleSheet, Image } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AzkarCategories from './AzkarCategories';
import AzkarDetailsScreen from './AzkarDetailsScreen';

const AzkarScreen = () => {


  const StackNavigator = createStackNavigator();

  return (

    <StackNavigator.Navigator>

      {/* <StackNavigator.Screen name="AzkarCategories" component={AzkarCategories} options={() => ({ headerTitle: "Azkar Categories" })} /> */}
      <StackNavigator.Screen name="AzkarDetails" component={AzkarDetailsScreen} options={() => ({ headerTitle: "Azkar" })} />

    </StackNavigator.Navigator>

   
  )
}


export default AzkarScreen