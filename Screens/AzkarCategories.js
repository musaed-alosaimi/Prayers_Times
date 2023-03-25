import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'

const AzkarCategories = ({navigation, route}) => {

    
  let categories = [
    { title: "Morning Azkar", type: "morning", image: require("../images/morning_grass.jpg") },
    { title: "Evening Azkar", type: "evening", image: require("../images/morning_grass.jpg") },
    { title: "Sleep Azkar", type: "sleep", image: require("../images/morning_grass.jpg") },
    { title: "After-Prayer Azkar", type: "after-prayer", image: require("../images/morning_grass.jpg") },
    { title: "Entering House Azkar", type: "entering-house", image: require("../images/morning_grass.jpg") },
    { title: "Going-out Azkar", type: "going-out", image: require("../images/morning_grass.jpg") },
  ]

  function azkarRenderItem(item) {

    let { title, type, image } = item;


    return <TouchableOpacity style={styles.AzkarItem} onPress={() => navigation.navigate("AzkarDetails", {category: type})} >

      <View>
        <Image source={image} style={styles.AzkarCategoryImage} />
        <View style={styles.AzkarCategoryImageLayer}></View>
      </View>
      <Text>{title}</Text>

    </TouchableOpacity>

  }


    return (
        <View style={{ flex: 1, }}>

            <FlatList data={categories} renderItem={({ item }) => azkarRenderItem(item)} style={{ flex: 1, borderWidth: 1, }} />

        </View>
    )
}


const styles = StyleSheet.create({

    AzkarItem: {
      padding: 5,
      margin: 5,
      borderWidth: 1,
      borderColor: "#999",
      flex: 1,
      alignItems: "stretch"
    },
  
    AzkarCategoryImage: {
      width: "100%",
      height: 100,
    },
  
    AzkarCategoryImageLayer: {
      backgroundColor: "#444",
      zIndex: 10,
      width: "100%",
      height: 100,
      position: "absolute",
      opacity: 0.3,
    }
  
  });

export default AzkarCategories