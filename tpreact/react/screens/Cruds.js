import React from 'react';
import {Text} from 'react-native';
import CrudList from '../components/Cruds/CrudList';
import AddCrud from "../components/Cruds/AddCrud";

export default function Cruds() {
  return (
    <>
        <Text>Liste des cruds</Text>
        <AddCrud />
        <CrudList />
    </>
  );
}
