import React, {useContext} from 'react';
import {FlatList, Text} from 'react-native';
import {CrudContext} from '../../contexts/CrudContext';
import SublistItem from './SublistItem';

export default function ItemList() {
  const {selectedCrud} = useContext(CrudContext);


  return (
    <FlatList
      data={selectedCrud.list}
      keyExtractor={item => item.id}
      renderItem={({item}) => <SublistItem item={item}/>}
      ListEmptyComponent={() => <Text>Liste vide</Text>}
    />
  );
}
