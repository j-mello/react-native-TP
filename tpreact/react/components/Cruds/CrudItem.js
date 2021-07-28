import React, {useContext} from 'react';
import {List, IconButton} from 'react-native-paper';
import {CrudContext} from '../../contexts/CrudContext';

export default function CrudItem({item}) {
  const {deleteCrud,setSelectedCrud} = useContext(CrudContext);

  return (
    <List.Item
      title={item.name + ' ('+item.type+')'}
      right={() => (
          <>
            <IconButton icon="delete" size={20} onPress={() => deleteCrud(item)} />
            <IconButton icon="camera" size={20} onPress={() => setSelectedCrud(item)}/>
          </>
      )}
    />
  );
}
