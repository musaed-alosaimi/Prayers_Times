import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

const LoadingScreen = () => {
  return (
    <View style={styles.LoadingBox}>
      <ActivityIndicator size="large" color="#f2b202" />
    </View>
  )
}

const styles = StyleSheet.create({

  LoadingBox: {
    paddingTop: 20,
  }
  
})

export default LoadingScreen