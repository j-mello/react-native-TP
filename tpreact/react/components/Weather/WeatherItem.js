import React, {useContext} from 'react';
import {List, IconButton} from 'react-native-paper';
import {WeatherContext} from '../../contexts/WeatherContext';

export default function WeatherItem({item}) {
  const {deleteItem} = useContext(WeatherContext);

  return (
    <List.Item
      title={`Max: ${item.tempmax} - Min: ${item.tempmin}`}
      description={item.description}
      right={() => (
        <IconButton icon="delete" size={20} onPress={() => deleteItem(item)} />
      )}
    />
  );
}
