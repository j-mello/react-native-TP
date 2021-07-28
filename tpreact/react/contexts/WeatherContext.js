import React, {createContext, useState, useEffect, useCallback} from 'react';
import {
  addWeather,
  editWeather,
  deleteWeather,
  getWeathers,
} from './actions/weather';

export const WeatherContext = createContext();

export default function WeatherProvider({children}) {
  const [list, setList] = useState([]);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => fetchItems(1).then(() => setReady(true)), []);

  const fetchItems = useCallback(nextPage => {
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

  const getItem = useCallback(id => list.find(it => it._id === id), [list]);

  return (
    <WeatherContext.Provider
      value={{
        list,
        ready,
        loading,
        getItem,
        fetchItems,
        deleteItem,
        editItem,
        addItem,
        page,
      }}>
      {children}
    </WeatherContext.Provider>
  );
}
