import React from 'react';              //Reactを読み込んでいる
import DispListMovies from './DispListMovies';
import { ListMoviesProvider } from './ListMoviesContext';

const ListMovies = () => {
  return (
    <div>
      <ListMoviesProvider>
        <DispListMovies/>
      </ListMoviesProvider>
    </div>
  );
}

export default ListMovies;