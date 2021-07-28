import React from 'react';
import {Text} from 'react-native';
import CrudList from '../components/Cruds/CrudList';
import AddCrud from '../components/Cruds/AddCrud';
import CrudProvider from '../contexts/CrudContext';

export default function Cruds() {
  return (
    <>
      <CrudProvider>
        <Text>Liste des cruds</Text>
        <CrudList />
      </CrudProvider>
    </>
  );
}
