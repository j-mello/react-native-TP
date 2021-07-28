import React, {useCallback, useContext, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Dialog, FAB, Portal, TextInput} from 'react-native-paper';
import {CrudContext} from '../../contexts/CrudContext';
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import {Calendar} from 'react-native-calendars';
import {formatDateEn} from "../../lib/utils";

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
  const {models,selectedCrud,getDefaultValueByType,addSubItem,showSubItemField} = useContext(CrudContext);
  const [visible, setVisible] = useState(false);
  const [values, setValues] = useState(Object.keys(models[selectedCrud.type]).reduce((acc,field) =>
          ({
            ...acc,
            [field]: getDefaultValueByType(models[selectedCrud.type][field].type)
          })
      , {}
  ));
  const [fieldDate,setFieldDate] = useState(null);

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
                <Pressable key={field} onPress={
                    () => models[selectedCrud.type][field].type === "date" &&
                        (
                            setFieldDate(field)
                        )}>
                    <TextInput
                        label={models[selectedCrud.type][field].label}
                        value={showSubItemField(values[field],models[selectedCrud.type][field])}
                        onChangeText={handleChange(field, models[selectedCrud.type][field].type)}
                        editable={models[selectedCrud.type][field].type !== 'date'}
                    />
                </Pressable>
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
        {
            fieldDate != null &&
            <Calendar
                current={formatDateEn(values[fieldDate])}
                minDate={formatDateEn(new Date())}
                maxDate={formatDateEn(new Date(new Date().getTime()+1000*60*60*24*30*6))}
                onDayPress={(date) =>
                    setValues({
                        ...values,
                        [fieldDate]: new Date(date.timestamp)
                    }) | setFieldDate(null)}
                monthFormat={'yyyy-MM'}
                hideDayNames={true}
                disableAllTouchEventsForDisabledDays={true}
            />
        }
    </Portal>
  );
}
