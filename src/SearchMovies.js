import React from 'react';              //Reactを読み込んでいる
import DispSearchMovies from './DispSearchMovies';
import { SearchMoviesProvider } from './SearchMoviesContext';

const SearchMovies = () => {
  return (
    <div>
      <SearchMoviesProvider>
        <DispSearchMovies/>
      </SearchMoviesProvider>
    </div>
  );
}

export default SearchMovies;