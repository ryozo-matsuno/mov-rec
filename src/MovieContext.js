import React, { createContext, useState, useContext } from 'react';

const MovieContext = createContext();
const MovieRecord = {titleJapanese:"",titleOriginal:"",director:"",releaseDate:"",RunningTime:"",Countries:"",set:"",no:""};


export function useMovieContext() {
  return useContext(MovieContext);
}

export function MovieProvider({ children }) {
  const [movieRecord, setMovie] = useState(MovieRecord);

  const value = {
    movieRecord,
    setMovie,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
}