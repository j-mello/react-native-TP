import React, {useContext} from 'react';
import {Text} from 'react-native';
import {CrudContext} from "../contexts/CrudContext";
import ItemList from "../components/SubList/ItemList";
import AddSubItem from "../components/SubList/AddSubItem";
import { IconButton } from 'react-native-paper';


export default function Sublist() {
  const {selectedCrud,setSelectedCrud} = useContext(CrudContext);

  return (
    <>
        <IconButton
          icon= 'keyboard-backspace'
          size={20}
          onPress={() => setSelectedCrud(null)}
        />
        <Text>Liste des éléments de {selectedCrud.name} ({selectedCrud.type})</Text>
        <AddSubItem/>
        <ItemList />
    </>
  );
}
