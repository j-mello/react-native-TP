import React, {useCallback, useContext, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Dialog, FAB, Portal, TextInput, RadioButton} from 'react-native-paper';
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
  const [isOpen, setOpen] = useState(false)
  const [values, setValues] = useState({
    name: '',
    type: '',
  });

  const handleSubmit = useCallback(
    () => {
      
    },
    [],
  )

  const handleChange = useCallback(
    (name) =>
      value =>
        setValues({
          ...values,
          [name]: value,
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
            onChangeText={handleChange('name')}
          />
          <RadioButton.Group onValueChange={handleChange('type')} value={values.type || "task"}>
            <RadioButton.Item label="Liste de tâches" value="task"/>
            <RadioButton.Item label="Liste d'achats" value="purchase" />
          </RadioButton.Group>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setVisible(false)}>Done</Button>
          <Button onPress={() => console.log(values)}>
            Submit
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
