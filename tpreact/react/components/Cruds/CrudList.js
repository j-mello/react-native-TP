import React, {useContext} from 'react';
import {FlatList, Text} from 'react-native';
import {CrudContext} from '../../contexts/CrudContext';
import CrudItem from './CrudItem';

export default function CrudList() {
  const {cruds} = useContext(CrudContext);

  return (
    <FlatList
      data={cruds}
      keyExtractor={item => item.id}
      renderItem={({item}) => <CrudItem item={item}/>}
      ListEmptyComponent={() => <Text>Pas de liste trouvée</Text>}
    />
  );
}
