import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import HijriDate, { toHijri } from 'hijri-date/lib/safe';
import { getAmPM, get12HoursClock, getNextPrayer } from '../utility/mainFunctions';
import { Prayer } from 'adhan';
import { LinearGradient } from 'expo-linear-gradient';
import LoadingScreen from '../Screens/LoadingScreen';

const NextPrayerBox = ({ prayerTimesObj, locationName }) => {


  if (prayerTimesObj[prayerTimesObj.currentPrayer()] === undefined)
    return <LoadingScreen />

  let currentDate = new Date();
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let dateObj = { year: currentDate.getFullYear(), month: months[currentDate.getMonth()], day: currentDate.getDate() };


  let currentHijriDate = new HijriDate();
  let monthsHijri = ["Muḥarram", "Ṣafar", "First Rabīʿ", "Second Rabīʿ", "First Jumādā", "Second Jumādā", "Rajab", "Shaʿbān", "Ramaḍān", "Shawwāl", "Dhū al-Qaʿdah", "Dhū al-Ḥijjah"];


  let currentPrayerText = prayerTimesObj.currentPrayer();
  let currentPrayerTime = prayerTimesObj[currentPrayerText];


  let nextPrayerText = getNextPrayer(currentPrayerText);
  let nextPrayerTime = prayerTimesObj[nextPrayerText];

  let nextPrayerRemainingTimeStamp = nextPrayerTime.getTime() - (currentDate).getTime();
  let nextPrayerRemainingTime = getTimeObj(nextPrayerRemainingTimeStamp);
  let nextPrayerRemainingTimeText = getRemainingTimeText(nextPrayerRemainingTime);

  let IQamaReaminingTimeStamp = currentPrayerTime.getTime() + (20 * 60 * 1000) - currentDate.getTime();
  let IQamaRemainingTime = getTimeObj(IQamaReaminingTimeStamp);
  let IQamaRemainingTimeText = getRemainingTimeText(IQamaRemainingTime);


  function getTimeObj(timestamp) {

    let seconds = timestamp / 1000;

    let hours = Math.floor(seconds / 3600);
    let minutes = Math.ceil((seconds - hours * 3600) / 60);

    return { hours, minutes }
  }

  function getRemainingTimeText(timeObj) {

    let { minutes, hours } = timeObj;

    if (minutes > 0 && hours > 0) {
      return hours + " hours and " + minutes + " minutes remaining";
    } else if (minutes > 0 && hours <= 0) {
      return minutes + " minutes remaining";
    } else if (minutes <= 0 && hours > 0) {
      return hours + " hours remaining";
    }

  }

  function getNextPrayerText(prayer) {

    let PrayerCapitalized = prayer.charAt(0).toUpperCase() + prayer.slice(1);

    if (prayer === "dhuhr") {
      return "Zuhr";
    } else if (prayer === "maghrib") {
      return "Magrib";
    } else {
      return PrayerCapitalized;
    }

  }

  function getFirstTwoWords(locationName) {

    if (locationName === undefined || locationName === "null") {
      return;
    }

    let wordsArray = locationName.split(' ');

    return wordsArray[0] + " " + wordsArray[1];

  }

  return (
    <View style={styles.nextPrayerBox}>

      <Image source={require("../images/NextPrayerBox.jpg")} style={{resizeMode: "cover", width: "100%", height: "100%", opacity: 0.4}} />

      <View style={{ position:"absolute", width: "100%", padding: 10, }}>
        <View style={styles.dateSection}>
          <View style={{ alignItems: "center" }}>
            <Text>{dateObj.year}</Text>
            <Text>{dateObj.month + " " + dateObj.day}</Text>
          </View>

          <View style={{ alignItems: "center" }}>
            <Text>{currentHijriDate._year}</Text>
            <Text>{monthsHijri[currentHijriDate._month - 1] + " " + currentHijriDate._day}</Text>
          </View>
        </View>

        <View style={styles.nextPrayerTime}>
          <Text style={styles.heading1}>{getNextPrayerText(nextPrayerText) + ": " + get12HoursClock(nextPrayerTime.getHours()) + ":" + nextPrayerTime.getMinutes() + " " + getAmPM(nextPrayerTime)}</Text>
          <Text style={styles.heading2}>{nextPrayerRemainingTimeText}</Text>
        </View>

        <View style={styles.locationSection}>
          <Text style={{ fontSize: 14, }}>{getFirstTwoWords(locationName)}</Text>
        </View>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  nextPrayerBox: {
    backgroundColor: '#EAAA0E',
    borderBottomWidth: 1,
    borderColor: "#555",
    flex: 0.4,

  },

  heading1: {
    fontSize: 24,
  },

  heading2: {
    fontSize: 18,
  },

  dateSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },

  nextPrayerTime: {
    alignItems: "center",
  },

  locationSection: {
    alignItems: "center",
    marginVertical: 20,
  },

  AzkarCategoryImageLayer: {
    backgroundColor: "#444",
    zIndex: 1,
    width: "100%",
    height: 200,
    position: "absolute",
    opacity: 0.6,

  },


})

export default NextPrayerBox