import React, {useContext} from 'react';
import {Text} from 'react-native';
import {CrudContext} from "../contexts/CrudContext";
import Button from "react-native-paper/src/components/Button";
import ItemList from "../components/SubList/ItemList";
import AddSubItem from "../components/SubList/AddSubItem";


export default function Sublist() {
  const {selectedCrud,setSelectedCrud} = useContext(CrudContext);

  return (
    <>
        <Button
            onPress={() => setSelectedCrud(null)}
            title="Retour aux cruds"
            color="#000000"
            accessibilityLabel="Retourner à la liste des cruds"
        />
        <Text>Liste des éléments de {selectedCrud.name} ({selectedCrud.type})</Text>
        <AddSubItem/>
        <ItemList />
    </>
  );
}
