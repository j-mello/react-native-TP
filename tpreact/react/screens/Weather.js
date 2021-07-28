import React from 'react';
import {Text} from 'react-native';
import WeatherList from '../components/Weather/WeatherList';
import AddWeather from '../components/Weather/AddWeather';
import WeatherProvider from '../contexts/WeatherContext';

export default function Weather() {
  return (
    <>
      <WeatherProvider>
        <Text>Wheater list</Text>
        <AddWeather />
        <WeatherList />
      </WeatherProvider>
    </>
  );
}
