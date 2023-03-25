import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';



function getAmPM(time) {
  
    if (time.getHours() >= 12) {
      return "pm";
    } else {
      return "am";
    }

  }

  function get12HoursClock(hour) {

    if (hour > 12) {
      return hour - 12;
    } else {
      return hour;
    }

  }


  
  function capitalizeWord(str) {

    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function getNextPrayer(currentPrayer) {

    currentPrayer = currentPrayer.toLowerCase().trim();

    let prayers = ["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"];

    let prayerIndex = prayers.indexOf(currentPrayer);

    let nextPrayerIndex = prayerIndex;

    if (prayerIndex === prayers.length - 1) {
      nextPrayerIndex = 0;
    }else{
      nextPrayerIndex++;
    }

    return prayers[nextPrayerIndex];

  }

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    return token;
  }

  export {getAmPM, get12HoursClock, capitalizeWord, getNextPrayer, registerForPushNotificationsAsync}