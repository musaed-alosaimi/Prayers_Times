import { View, Text, Image, Dimensions, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'
import { Magnetometer, MagnetometerUncalibrated } from 'expo-sensors';
import { useSelector, useDipatch } from "react-redux";
import { actions } from "../store";
import * as LocationAPI from 'expo-location';
import { Coordinates, CalculationMethod, PrayerTimes, Qibla } from 'adhan';


const windowWidth = Dimensions.get('window').width;

let circleWidth = windowWidth - 50;
let ArrowWidth = circleWidth / 1.9;

const CompassScreen = () => {

    let locationStoreState = useSelector((state) => state.location);

    let latitude, longitude;

    if (locationStoreState !== undefined) {
        latitude = locationStoreState.locationCoords.latitude;
        longitude = locationStoreState.locationCoords.longitude;
    }

    const [subscription, setSubscription] = useState(null);
    const [magnetometer, setMagnetometer] = useState(0);
    const [userDirection, setUserDirection] = useState(0);


    // const [isUserCalibrated, setIsUnCalibrated] = useState(0);

    // // Function to get the magnetometer data and calibration status
    // async function checkMagnetometerCalibration() {
    //     try {
    //         // Get the magnetometer data
    //         const { x, y, z, xUncalibrated, yUncalibrated, zUncalibrated } = await MagnetometerUncalibrated.getUncalibratedMagnetometerAsync();

    //         // Get the calibration status
    //         const isCalibrated = xUncalibrated === null && yUncalibrated === null && zUncalibrated === null;

    //         // Return the magnetometer data and calibration status
    //         setIsUnCalibrated(isCalibrated);

    //     } catch (error) {
    //         console.log(error);
    //         return null;
    //     }
    // }


    useEffect(() => {

        _toggle();
        return () => {
            _unsubscribe();
        };
    }, []);

    const _toggle = () => {
        if (subscription) {
            _unsubscribe();
        } else {
            _subscribe();
        }
    };

    const _subscribe = () => {
        setSubscription(
            Magnetometer.addListener((data) => {

                const { x, y } = data;

                const userHeading = Math.atan2(y, x) * (180 / Math.PI)

                // const kaabaLat = 21.4225;
                // const kaabaLng = 39.8262;

                let currentLocationCoords = new Coordinates(latitude, longitude);


                let QiblaDirection = (Qibla(currentLocationCoords)+80) - userHeading;

                if (QiblaDirection < 0) {
                    QiblaDirection += 360;
                  }

                setMagnetometer(QiblaDirection);

            })
        );
    };

    Magnetometer.setUpdateInterval(100);

    function calculateAngle(lat1, lng1, lat2, lng2) {

        const dLon = lng2 - lng1;
        const y = Math.sin(dLon) * Math.cos(lat2);
        const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
        const angleRad = Math.atan2(y, x);
        const angleDeg = angleRad * (180 / Math.PI);

        return angleDeg;
    }



    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    const _direction = (degree) => {
        if (degree >= 22.5 && degree < 67.5) {
            return 'NE';
        }
        else if (degree >= 67.5 && degree < 112.5) {
            return 'E';
        }
        else if (degree >= 112.5 && degree < 157.5) {
            return 'SE';
        }
        else if (degree >= 157.5 && degree < 202.5) {
            return 'S';
        }
        else if (degree >= 202.5 && degree < 247.5) {
            return 'SW';
        }
        else if (degree >= 247.5 && degree < 292.5) {
            return 'W';
        }
        else if (degree >= 292.5 && degree < 337.5) {
            return 'NW';
        }
        else {
            return 'N';
        }
    };


    let QiblaAngle = magnetometer;


    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

            <Text style={{fontSize: 24, margin: 10, color: "#BA870B"}}>Qibla Direction</Text>

            {/* <Text>{isUserCalibrated}</Text> */}

            {/* <Text>{QiblaAngle}</Text> */}

            <View style={styles.circleStyle}>

                <Image source={require("../images/Qibla_Arrow.png")} style={{ transform: [{ rotate: (QiblaAngle) + "deg" }], ...styles.arrowImageStyle }} />

            </View>

        </View>
    )
}

const styles = StyleSheet.create({

    circleStyle: {
        height: circleWidth,
        width: circleWidth,
        borderWidth: 2,
        borderColor: "#DB9F0D",
        borderRadius: 300,
        justifyContent: "center",
        alignItems: "center",
    },

    arrowImageStyle: {
        width: ArrowWidth,
        height: ArrowWidth + 20,
        resizeMode: "contain",

    }

})

export default CompassScreen