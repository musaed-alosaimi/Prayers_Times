import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { getAmPM, get12HoursClock } from '../utility/mainFunctions';
import { LinearGradient } from 'expo-linear-gradient';

const PrayerTimesBox = ({ prayerTimesObj }) => {

  let { fajr, sunrise, dhuhr, asr, maghrib, isha } = prayerTimesObj;

  return (
    <View style={styles.prayerTimesBox}>

      <LinearGradient style={styles.prayerTimeItem} colors={["#FFF", "#CCC"]}>
        <Text style={{...styles.prayerTime, ...styles.prayerItemText}}>Fajr</Text>
        <Text style={styles.prayerTime}>{get12HoursClock(fajr.getHours()) + ":" + fajr.getMinutes() + " " + getAmPM(fajr)}</Text>
      </LinearGradient>

      <LinearGradient style={styles.prayerTimeItem} colors={["#FFF", "#CCC"]}>
        <Text style={{...styles.prayerTime, ...styles.prayerItemText}}>Sunrise</Text>
        <Text style={styles.prayerTime}>{get12HoursClock(sunrise.getHours()) + ":" + sunrise.getMinutes() + " " + getAmPM(sunrise)}</Text>
      </LinearGradient>

      <LinearGradient style={styles.prayerTimeItem} colors={["#FFF", "#CCC"]}>
        <Text style={{...styles.prayerTime, ...styles.prayerItemText}}>Zuhr</Text>
        <Text style={styles.prayerTime}>{get12HoursClock(dhuhr.getHours()) + ":" + dhuhr.getMinutes() + " " + getAmPM(dhuhr)}</Text>
      </LinearGradient>

      <LinearGradient style={styles.prayerTimeItem} colors={["#FFF", "#CCC"]}>
        <Text style={{...styles.prayerTime, ...styles.prayerItemText}}>Asr</Text>
        <Text style={styles.prayerTime}>{get12HoursClock(asr.getHours()) + ":" + asr.getMinutes() + " " + getAmPM(asr)}</Text>
      </LinearGradient>

      <LinearGradient style={styles.prayerTimeItem} colors={["#FFF", "#CCC"]}>
        <Text style={{...styles.prayerTime, ...styles.prayerItemText}}>Magrib</Text>
        <Text style={styles.prayerTime}>{get12HoursClock(maghrib.getHours()) + ":" + maghrib.getMinutes() + " " + getAmPM(maghrib)}</Text>
      </LinearGradient>

      <LinearGradient style={styles.prayerTimeItem} colors={["#FFF", "#CCC"]}>
        <Text style={{...styles.prayerTime, ...styles.prayerItemText}}>Isha</Text>
        <Text style={styles.prayerTime}>{get12HoursClock(isha.getHours()) + ":" + isha.getMinutes() + " " + getAmPM(isha)}</Text>
      </LinearGradient>

    </View>
  )
}

const styles = StyleSheet.create({

  heading1: {
    fontSize: 24,
  },

  heading2: {
    fontSize: 18,
  },

  prayerTimesBox: {
    flex: 1,
    justifyContent: "space-around",
    margin: 10,
  },

  prayerTimeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#DDD",
    backgroundColor: '#DDD',
    paddingHorizontal: 15,
    paddingVertical: 20,

  },

  prayerTime: {
    color: "#BA870B",
  },
  
  prayerItemText: {
    color: "#000",
  }

});


export default PrayerTimesBox