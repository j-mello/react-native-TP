import React, {useContext} from 'react';
import {FlatList, Text} from 'react-native';
import {WeatherContext} from '../../contexts/WeatherContext';
import WeatherItem from './WeatherItem';

export default function WeatherList() {
  const {list, ready, fetchItems, loading, page} = useContext(WeatherContext);

  return (
    <FlatList
      data={list}
      keyExtractor={item => item._id}
      renderItem={({item}) => <WeatherItem item={item} />}
      ListEmptyComponent={() => <Text>no data found</Text>}
      onRefresh={() => fetchItems(1)}
      refreshing={!ready || loading}
      onEndReached={() => fetchItems(page + 1)}
      onEndReachedThreshold={0.7}
    />
  );
}
