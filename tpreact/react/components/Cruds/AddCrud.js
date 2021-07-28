import React, {useCallback, useContext, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Dialog, FAB, Portal, TextInput} from 'react-native-paper';
import {CrudContext} from '../../contexts/CrudContext';

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    marginBottom: 66,
    right: 0,
    bottom: 0,
  },
});

export default function AddCrud() {
  const {addItem} = useContext(CrudContext);
  const [visible, setVisible] = useState(false);
  const [values, setValues] = useState({
    name: '',
    type: '',
  });

  const handleChange = useCallback(
    (name, type = 'string') =>
      value =>
        setValues({
          ...values,
          [name]: value !== '' && type === 'integer' ? parseInt(value) : value,
        }),
    [],
  );

  return (
    <Portal>
      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => setVisible(true)}
      />
      <Dialog visible={visible} onDismiss={() => setVisible(false)}>
        <Dialog.Title>Add List</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="name"
            value={values.name}
            onChangeText={handleChange('name', 'string')}
          />
          <TextInput
            label="type"
            value={values.type}
            onChangeText={handleChange('type', 'string')}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setVisible(false)}>Done</Button>
          <Button onPress={() => addItem(values).then(() => setVisible(false))}>
            Submit
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
