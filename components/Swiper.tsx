import {StyleSheet, View, Text} from 'react-native';
import React, {Component} from 'react';
import Swiper from 'react-native-swiper';

import MainPage from './pages/MainPage'
import HistoryPage from './pages/HistoryPage';
import SearchPage from './pages/SearchPage';

const styles = StyleSheet.create({
    wrapper: {},
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB'
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5'
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9'
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
    }
  })

export default class SwiperComponent extends Component {
  index = 1

  onIndexChanged(i: number) {
    this.index = i;
  }

  render() {
      return (
          <Swiper style={styles.wrapper} index={this.index} onIndexChanged={this.onIndexChanged}>
              <HistoryPage></HistoryPage>
              <MainPage></MainPage>
              <SearchPage></SearchPage>
          </Swiper>
      );
  } 
}