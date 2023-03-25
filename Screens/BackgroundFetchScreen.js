import React, { useState, useEffect } from "react";
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { registerForPushNotificationsAsync } from "../utility/mainFunctions"
import { Coordinates, CalculationMethod, PrayerTimes } from 'adhan';
import * as LocationAPI from 'expo-location';

// async function getLocation() {

//   let { status } = await LocationAPI.requestForegroundPermissionsAsync();

//   console.log(status);

//   if (status !== "granted") {
//     console.log("Location access is not permitted.");

//     return;
//   }

//   let currentLocation = await LocationAPI.getCurrentPositionAsync({ accuracy: LocationAPI.Accuracy.Balanced, enableHighAccuracy: true, });

//   return currentLocation.coords;

// }

// let location = await getLocation();

// let locationCoords;

// if (Object.keys(location).length !== 0) {

//   console.log(locationCoords);

//   if (locationCoords !== undefined) {


//     let { latitude, longitude } = locationCoords;

//     const coordinates = new Coordinates(latitude, longitude);
//     const params = CalculationMethod.UmmAlQura();
//     const date = new Date();
//     const prayerTimes = new PrayerTimes(coordinates, date, params);


//     Notifications.setNotificationHandler({
//       handleNotification: async () => ({
//         shouldShowAlert: true,
//         shouldPlaySound: false,
//         shouldSetBadge: false,
//       }),
//     });

//     let nextPrayerTime = prayerTimes.timeForPrayer(prayerTimes.nextPrayer);

//     console.log(nextPrayerTime);

//     async function schedulePushNotification() {
//       await Notifications.scheduleNotificationAsync({
//         content: {
//           title: "Adhan Prayer Time",
//           body: 'Now is the Prayer time',
//           data: { data: nextPrayerTime },
//         },
//         trigger: { date: nextPrayerTime, },
//       });
//     }

//     const BACKGROUND_FETCH_TASK = 'background-fetch';

//     TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
//       const now = new Date();

//       console.log(nextPrayerTime, "   ", now);

//       schedulePushNotification();

//       // Be sure to return the successful result type!
//       return BackgroundFetch.BackgroundFetchResult.NewData;
//     });

//   }
// }


function BackgroundFetchScreen() {

  // function registerBackgroundFetchAsync() {
  //   return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
  //     minimumInterval: 30, // run every minute
  //     stopOnTerminate: false, // android only,
  //     startOnBoot: true, // android only
  //   });
  // }

  // useEffect(() => {

  //   registerBackgroundFetchAsync();
  // }, [])


  return <></>
}

export default BackgroundFetchScreen
