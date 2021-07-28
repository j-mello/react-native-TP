import React, {useCallback, useContext, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Dialog, FAB, Portal, TextInput} from 'react-native-paper';
import {WeatherContext} from '../../contexts/WeatherContext';

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    marginBottom: 66,
    right: 0,
    bottom: 0,
  },
});

export default function AddWeather() {
  const {addItem} = useContext(WeatherContext);
  const [visible, setVisible] = useState(false);
  const [values, setValues] = useState({
    tempmax: 0,
    tempmin: 0,
    description: '',
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
        <Dialog.Title>Add Weather</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="tempmax"
            value={values.tempmax.toString()}
            onChangeText={handleChange('tempmax', 'integer')}
          />
          <TextInput
            label="tempmin"
            value={values.tempmin.toString()}
            onChangeText={handleChange('tempmin', 'integer')}
          />
          <TextInput
            label="description"
            value={values.description}
            onChangeText={handleChange('description')}
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
