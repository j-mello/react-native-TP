import React, {useContext} from 'react';
import {List, IconButton} from 'react-native-paper';
import {CrudContext} from '../../contexts/CrudContext';

export default function SublistItem({item}) {
    //const {deleteCrud,setSelectedCrud} = useContext(CrudContext);
    const {selectedCrud, models, showSubItemField, deleteCrudSubItem, completeSubItem} = useContext(CrudContext);

    return (
        <List.Item
            title={item.name}
            description={
                Object.keys(models[selectedCrud.type]).map(field =>
                    showSubItemField(item[field], models[selectedCrud.type][field])
                ).join(", ")
            }
            right={() => (
                <>
                    {
                        !item.completed &&
                        <IconButton icon="check" size={20} onPress={() => completeSubItem(item)}/>
                    }
                    <IconButton icon="delete" size={20} onPress={() => deleteCrudSubItem(item)} />
                </>
            )}
        />
    );
}
