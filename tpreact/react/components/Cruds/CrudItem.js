import React, {useContext} from 'react';
import {List, IconButton} from 'react-native-paper';
import {CrudContext} from '../../contexts/CrudContext';

export default function CrudItem({item}) {
  const {deleteMainList, setSelectedCrud} = useContext(CrudContext);

  return (
    <List.Item
      title={item.name + ' ('+item.type+')'}
      right={() => (
          <>
            <IconButton icon="delete" size={20} onPress={() => deleteMainList(item)} />
            <IconButton icon="magnify" size={20} onPress={() => setSelectedCrud(item)}/>
          </>
      )}
    />
  );
}
