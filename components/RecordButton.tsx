import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Animated, Platform, Dimensions } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import * as Animatable from 'react-native-animatable';
import { getResults } from '../redux/getResults';
import { BehaviorSubject } from 'rxjs';
// import RecordScreen from 'react-native-record-screen';
// import Video from 'react-native-video';
var ScreenRecorderManager =require('react-native-screen-recorder') 

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  const isRecording$ = new BehaviorSubject(false)
export function RecordButton() {
    const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 1

    const [expoPushToken, setExpoPushToken] = useState('');
    const [image, setimagePath] = useState('');
    const [notification, setNotification] = useState(false);
    const [uri, setUri] = useState(0 as any);
    const notificationListener = useRef();
    const responseListener = useRef();

   

    // isRecording$.subscribe(isRecording => {
    //   console.log(isRecording)
    //   if (isRecording) {
    //     setInt(setInterval(() => {
    //       // console.log('start screen')
    //       captureScreen({
    //         format: "jpg",
    //         quality: 0.8
    //       })
    //       .then(
    //         uri => {
    //           alert(uri)
    //           setimagePath(uri)
    //         },
    //         error => console.error("Oops, Something Went Wrong", error)
    //       );
    //     }, 500))
    //   } else {
    //     clearInterval(int)
    //   }
    // })

    const startRecording = async function() {
      const instance = new ScreenRecorderManager()
      console.log(instance)
      console.log(instance.start)
      instance.start()

      setTimeout(async () => {
        instance.stop()
      }, 2000)
    }

    const endRecording = async function () {
      console.log('HERE'); 
    }

    useEffect(() => {
      registerForPushNotificationsAsync().then((token: any) => setExpoPushToken(token));

      notificationListener.current = Notifications.addNotificationReceivedListener((notification: any) => {
          setNotification(notification);
      }) as any;

      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
       
          endRecording()
          getResults()
      }) as any;

      return () => {
          Notifications.removeNotificationSubscription(notificationListener.current as any);
          Notifications.removeNotificationSubscription(responseListener.current as any);
      };
    }, []);

      const schedulePushNotification = async function() {
        Animated.timing(
            fadeAnim,
            {
              toValue: 1,
              duration: 1000,
              useNativeDriver: false
            }
          ).start();

          setTimeout(() => {
            Animated.timing(
                fadeAnim,
                {
                  toValue: 0,
                  duration: 2000,
                  useNativeDriver: false
                }
              ).start();
          }, 1000)
          
    
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Recording has started 🎥",
            body: 'Tap on notification to stop'
          },
          trigger: { seconds: 5 },
        });
      }

    
    return (<TouchableOpacity style={styles.to} onPress={async () => {
            startRecording()
            await schedulePushNotification();
        }}>
        <Animated.View style={{
            opacity: fadeAnim,         // Bind opacity to animated value
        }}>
            <Text style={styles.text}>Recording will start in 5 seconds</Text>
        </Animated.View>
        <Animatable.Image source={ require('../assets/record-image.png') }
            animation="pulse" 
            easing="ease-out" 
            iterationCount="infinite"
            style={styles.image}>
        </Animatable.Image>
    </TouchableOpacity>);
}

const styles = StyleSheet.create({
  preview: {
    position: 'absolute',
    right: 12,
    bottom: 116,
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').height / 3,
    zIndex: 1,
    padding: 8,
    backgroundColor: '#aaa',
  },
  video: {
    flex: 1,
  },
    image: {
        backgroundColor: 'transparent',
        width: "100%",
        height: "60%",
        resizeMode: 'stretch',
        // borderColor: 'red',
        // borderWidth: 1,
    },
    text: {
        alignSelf: "center"
    },
    to: {
        marginBottom: -50
    }
});


  
  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
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
    //   console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }