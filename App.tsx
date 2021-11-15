import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SwiperComponent from './components/Swiper';
import { navigationRef } from './redux/navigation';
import { DetailedPage } from './components/pages/DetailedPage';
import { isLoading$ } from './redux/getResults';
import { Component } from 'react';

class HomePage extends Component {
  state = {
    comp: <SwiperComponent></SwiperComponent>,
    background: ''
  }

  componentDidMount() {
    isLoading$.subscribe(isLoading => {
      console.log(isLoading)
      if (isLoading) {
        this.setState({
          comp: <ActivityIndicator size="large" color="#00000" />,
          background: '#99D9EA'
        })
      } else {
        this.setState({
          comp: <SwiperComponent></SwiperComponent>,
          background: ''
        }) 
      }
    })
  }

  render() {
    return (
      <View style={{...styles.container, backgroundColor: this.state.background}}>
        { this.state.comp }
      </View>
    );
  }
}

const Stack = createStackNavigator();

export default function App() {
  return <NavigationContainer ref={navigationRef}>
    <Stack.Navigator initialRouteName="Home" screenOptions={{
    headerShown: false
  }}>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Detailed" component={DetailedPage} />
      </Stack.Navigator>
      {/* <Image style={styles.hiddenImage} source={ require('../assets/movie.jpg') } /> */}
  </NavigationContainer>  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hiddenImage: {
    display: 'none'
  }
})
