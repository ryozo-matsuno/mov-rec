import React, { createContext, useState, useContext } from 'react';

const SearchMoviesContext = createContext();
const MovieRecord = {japaneseTitle:"",originalTitle:"",director:"",releaseDate:"",runningTime:"",countries:"",boxNo:"",diskNo:""};
const MovieRecords = {MovieRecord};

export function useSearchMoviesContext() {
  return useContext(SearchMoviesContext);
}

export function SearchMoviesProvider({ children }) {
  const [moviesRecs, setMoviesrecs] = useState(MovieRecords);

  const value = {
    moviesRecs,
    setMoviesrecs,
  };

  return (
    <SearchMoviesContext.Provider value={value}>{children}</SearchMoviesContext.Provider>
  );
}