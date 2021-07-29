import AsyncStorage from '@react-native-async-storage/async-storage';
import {newId} from "../../lib/utils";

export function getCruds(models) {
    return AsyncStorage.getItem('cruds').then(data =>
    data ? JSON.parse(data).map(crud =>
        ({
            ...crud,
            list: crud.list ? crud.list.map(subItem =>
                Object.keys(subItem).reduce((acc,key) => ({
                    ...acc, [key]: (models[crud.type][key] && models[crud.type][key].type === "date") ? new Date(subItem[key]) : subItem[key],
                }), {})
            ) : []
        })
    ) : null);
}

export async function addSubItemCruds(cruds,selectedCrudId,subItem) {
    let id;
    await AsyncStorage.setItem('cruds', JSON.stringify(cruds.map(crud =>
        crud.id === selectedCrudId ?
            {
                ...crud,
                list: [...crud.list, {...subItem, id: (id = newId(crud.list))}]
            } : crud
    )));
    return id;
}

export async function deleteSubItemCruds(cruds,selectedCrudId,subItemToDelete) {
    await AsyncStorage.setItem('cruds', JSON.stringify(cruds.map(crud =>
        crud.id === selectedCrudId ?
            {
                ...crud,
                list: crud.list.filter(subItem =>
                    subItem.id !== subItemToDelete.id
                )
            } : crud
    )))
}

export async function completeSubItemCruds(cruds,selectedCrudId,subItemToComplete) {
    await AsyncStorage.setItem('cruds', JSON.stringify(cruds.map(crud =>
        crud.id !== selectedCrudId ?
            crud :
            {
                ...crud,
                list: crud.list.map(subItem =>
                    subItem.id !== subItemToComplete.id ?
                        subItem :
                        {...subItem, completed: true})
            }
    )))
}

export async function addCrud(cruds, values) {
    let id;
    await AsyncStorage.setItem('cruds', JSON.stringify([
        ...cruds,
        {
            ...values,
            id: (id = newId(cruds))
        }
    ]))
    return id;
}

export async function deleteCrud(cruds, id) {
    await AsyncStorage.setItem('cruds', JSON.stringify(
        cruds.filter((crud) =>
            crud.id != id
        )
    ))
}

export async function clear() {
    await AsyncStorage.clean();
}
