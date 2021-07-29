import React, {createContext, useState, useEffect, useCallback} from 'react';
import {getCruds, addSubItemCruds, deleteSubItemCruds, completeSubItemCruds, addCrud, deleteCrud} from "./actions/storage";
import {formatDateFr} from "../lib/utils";

export const CrudContext = createContext();

const models = { // Définition des types de crud
    task: {
        name: {label: 'Le nom', type: 'string'},
        completed: {label: 'Complété', type: 'boolean', displayOnCreate: false},
        date: {label: 'La date', type: 'date'},
        geo: {label: 'La géolocalisation', type: 'geo'}
    },
    purchase: {
        name: {label: 'Le nom', type: 'string'},
        completed: {label: 'Complété', type: 'boolean', displayOnCreate: false}
    }
}

const modelsLabels = {
    task: "Liste de tâches",
    purchase: "Liste d'achâts"
}

const defaultCruds = [ // Exemple de liste de cruds
    {
        id: 51681,
        type: 'task',
        name: 'Ma liste de tache N°1',
        list: [
            {id: 1, name: 'Faire les pates', completed: true, date: new Date(), geo: "Géolocalisation du tel"},
            {id: 2, name: 'Finir cette année', completed: false, date: new Date(), geo: "zeouifhiuzefh"}
        ]
    },
    {
        id: 87941,
        type: 'purchase',
        name: 'Mes achats',
        list: [
            {id: 1, name: "Aspirateur", completed: true},
            {id: 2, name: "The Elder Scroll VI", completed: false}
        ]
    }
]

export default function CrudProvider({children}) {
    const [cruds, setCruds] = useState([]);
    const [selectedCrud, setSelectedCrud] = useState(null);

    useEffect(async () => {
        getCruds(models).then(cruds => setCruds(cruds ?? defaultCruds))
    }, []);

    const deleteCrudSubItem = useCallback(
        (subItemToDelete) =>
            deleteSubItemCruds(cruds,selectedCrud.id,subItemToDelete).then(() =>
                setSelectedCrud({
                    ...selectedCrud,
                    list: selectedCrud.list.filter(subItem => subItem.id !== subItemToDelete.id)
                }) |
                setCruds(cruds.map(crud =>
                    crud.id === selectedCrud.id ?
                        {
                            ...crud,
                            list: crud.list.filter(subItem =>
                                subItem.id !== subItemToDelete.id
                            )
                        } : crud
                ))
            ),
        [selectedCrud, cruds]
    )

    const addMainList = useCallback(
        (values) => 
            addCrud(cruds, values).then((id) =>
            setCruds([
                ...cruds,
                {
                    ...values,
                    id,
                    list: []
                }
            ])
            )
        ,
        [cruds],
    )

    const deleteMainList = useCallback(
        (crudToDelete) => deleteCrud(cruds, crudToDelete.id).then(() =>
            setCruds(cruds.filter(crud => crud.id !== crudToDelete.id))
        ),
        [cruds]
    )

    const addSubItem = useCallback(
        (subItem) =>
            addSubItemCruds(cruds,selectedCrud.id,subItem).then((id) =>
                setSelectedCrud({
                    ...selectedCrud,
                    list: [...selectedCrud.list, {...subItem, id}]
                }) |
                setCruds(cruds.map(crud =>
                    crud.id === selectedCrud.id ?
                        {
                            ...selectedCrud,
                            list: [...selectedCrud.list, {...subItem, id}]
                        } : {...crud}
                ))
            )
        ,
        [selectedCrud,cruds]
    )

    const completeSubItem = useCallback(
        (subItemToComplete) =>
            completeSubItemCruds(cruds,selectedCrud.id,subItemToComplete).then(() =>
                setSelectedCrud({
                    ...selectedCrud,
                    list: selectedCrud.list.map(subItem =>
                        subItem.id !== subItemToComplete.id ?
                            subItem :
                            {...subItem, completed: true})
                }) | setCruds(cruds.map(crud =>
                    crud.id !== selectedCrud.id ?
                        crud :
                        {
                            ...crud,
                            list: crud.list.map(subItem =>
                                subItem.id !== subItemToComplete.id ?
                                    subItem :
                                    {...subItem, completed: true})
                        }
                ))
            )
    )

    const showSubItemField = useCallback(
        (value, model) => {
            switch (model.type) {
                case 'string':
                    return value;
                case 'number':
                    return value.toString();
                case 'boolean':
                    return model.label + " : " + (value ? 'OUI' : 'NON');
                case 'date':
                    return formatDateFr(value);
                case 'geo':
                    return 'GEO';
            }
            return 'Unkown type';
        },
        []
    )

    const getDefaultValueByType = useCallback(
        (type) => {
            switch (type) {
                case 'number':
                    return 0;
                case 'string':
                    return '';
                case 'boolean':
                    return false;
                case 'date':
                    return new Date();
                case 'geo':
                    return 'geo'
            }
            return 'Unkown type';
        },
        []
    )

    //useEffect(() => fetchItems(1).then(() => setReady(true)), []);

    /*const fetchItems = useCallback(nextPage => {
      setLoading(true);
      return getWeathers(nextPage).then(
        data =>
          setList(nextPage === 1 ? data : [...list, ...data]) ||
          setPage(nextPage) ||
          setLoading(false),
      );
    }, []);

    const deleteItem = useCallback(
      item =>
        deleteWeather(item).then(() => setList(list.filter(it => it !== item))),
      [list],
    );
    const editItem = useCallback(
      item =>
        editWeather(item).then(data =>
          setList(list.map(it => (it._id === data._id ? data : it))),
        ),
      [list],
    );
    const addItem = useCallback(
      item => addWeather(item).then(data => setList([data, ...list])),
      [list],
    );

    const getItem = useCallback(id => list.find(it => it._id === id), [list]);*/

    return (
        <CrudContext.Provider
            value={{
                cruds,
                models,
                modelsLabels,

                selectedCrud,
                setSelectedCrud,

                deleteCrudSubItem,
                addMainList,
                deleteMainList,
                addSubItem,
                completeSubItem,

                showSubItemField,
                getDefaultValueByType
            }}>
            {children}
        </CrudContext.Provider>
    );
}
