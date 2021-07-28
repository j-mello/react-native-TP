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

export default function AddSubItem() {
  //const {addItem} = useContext(CrudContext);
  const {models,selectedCrud,getDefaultValueByType,addSubItem} = useContext(CrudContext);
  const [visible, setVisible] = useState(false);
  const [values, setValues] = useState(Object.keys(models[selectedCrud.type]).reduce((acc,field) =>
          ({
            ...acc,
            [field]: getDefaultValueByType(models[selectedCrud.type][field].type)
          })
      , {}
  ));

  const handleChange = useCallback(
    (name, type = 'string') =>
      value =>
        setValues({
          ...values,
          [name]: value !== '' && type === 'number' ? parseInt(value) : value,
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
        <Dialog.Title>Ajouter un élement</Dialog.Title>
        <Dialog.Content>
          {
            Object.keys(models[selectedCrud.type]).map(field =>
                [undefined,true].includes(models[selectedCrud.type][field].displayOnCreate) &&
                <TextInput
                    key={field}
                    label={models[selectedCrud.type][field].label}
                    value={values[field].toString()}
                    onChangeText={handleChange(field, models[selectedCrud.type][field].type)}
                />
            )
          }
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setVisible(false)}>Done</Button>
          <Button onPress={() => addSubItem(values) | setVisible(false)}>
            Submit
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
