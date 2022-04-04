import React, { createContext, useState, useContext } from 'react';

const ListMoviesContext = createContext();
const MovieRecord = {titleJapanese:"",titleOriginal:"",director:"",releaseDate:"",RunningTime:"",Countries:"",set:"",no:""};
const MovieRecords = {MovieRecord};

export function useListMoviesContext() {
  return useContext(ListMoviesContext);
}

export function ListMoviesProvider({ children }) {
  const [moviesRecs, setMoviesrecs] = useState(MovieRecords);

  const value = {
    moviesRecs,
    setMoviesrecs,
  };

  return (
    <ListMoviesContext.Provider value={value}>{children}</ListMoviesContext.Provider>
  );
}