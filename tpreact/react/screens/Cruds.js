import React from 'react';
import {Text} from 'react-native';
import AddCrud from '../components/Cruds/AddCrud';
import CrudList from '../components/Cruds/CrudList';

export default function Cruds() {
  return (
    <>
        <Text>Liste des cruds</Text>
        <AddCrud />
        <CrudList />
    </>
  );
}
