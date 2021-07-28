import React, {createContext, useState, useEffect, useCallback} from 'react';

export const CrudContext = createContext();

const models = { // Définition des types de crud
  task: {
    name: {label: 'Le nom :', type: 'string'},
    completed: {label: 'Complété :', type: 'boolean'},
    date: {label: 'La date: ', type: 'date'},
    geo:  {label: 'La géolocalisation', type: 'geo'}
  },
  purchase: {
    name: {label: 'Le nom :', type: 'string'},
    completed: {label: 'Complété :', type: 'boolean'}
  }
}

const crudTypes = Object.keys(models);

export default function CrudProvider({children}) {
  const [cruds, setCruds] = useState([]);

  useEffect(() => [
      setCruds([ // Exemple de liste de cruds
        {
          id: 51681,
          type: 'task',
          name: 'Ma liste de tache N°1',
          list: [
            {id: 1, name: 'Faire les pates', completed: true,  date: new Date(), geo: "Géolocalisation du tel"},
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
      ])
  ], [])

  const deleteCrud = useCallback(
      (crudToDelete) => setCruds(cruds.filter(crud => crud.id !== crudToDelete.id)),
      [cruds]
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
        deleteCrud
      }}>
      {children}
    </CrudContext.Provider>
  );
}
