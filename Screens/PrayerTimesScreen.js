import { StyleSheet, View } from 'react-native';
import { useEffect, useState, useRef } from "react";
import { Coordinates, CalculationMethod, PrayerTimes } from 'adhan';
import { Layout, Text, Button } from '@ui-kitten/components';
import NextPrayerBox from '../Components/NextPrayerBox';
import PrayerTimesBox from '../Components/PrayerTimesBox';
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../store";
import * as Notifications from 'expo-notifications';
import BackgroundFetchScreen from "./BackgroundFetchScreen"


const PrayerTimesScreen = () => {

  let location = useSelector((state) => state.location);
  let [locationName, setLocationName] = useState();
  let [prayerTimesObj, setPrayerTimesObj] = useState();

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();


  useEffect(() => {

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {

    if (Object.keys(location).length === 0)
      return;

    let locationCoords = location.locationCoords

    if (locationCoords !== undefined) {

      let { latitude, longitude } = locationCoords;

      const coordinates = new Coordinates(latitude, longitude);
      const params = CalculationMethod.UmmAlQura();
      const date = new Date();
      const prayerTimes = new PrayerTimes(coordinates, date, params);


      // console.log(prayerTimes.nextPrayer());

      setPrayerTimesObj(prayerTimes);
      

      fetch("https://us1.locationiq.com/v1/reverse?key=pk.56c5e68558924ebff7898e53e6bd7c56&lat=" + latitude + "&lon=" + longitude + "&zoom=14&format=json")
        .then((data) => data.json()).then((data) => {

          setLocationName(data.display_name);

        }).catch((err) => console.log(err));


    }

  }, [location])


  if (prayerTimesObj === undefined) {
    return <Text>Loading ...</Text>
  }


  return (
    <View style={{ flex: 1, }}>

      {/* <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      ></Button> */}

      <NextPrayerBox prayerTimesObj={prayerTimesObj} locationName={locationName} />

      <PrayerTimesBox prayerTimesObj={prayerTimesObj} />

      {/* <BackgroundFetchScreen /> */}
    </View>
  );
}



export default PrayerTimesScreen