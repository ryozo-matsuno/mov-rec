import React from "react";
import DispMovie from './DispMovie';
import { MovieProvider } from './MovieContext';

const AddMovie = () => {
  return (
    <div>
      <MovieProvider>
        <DispMovie/>
      </MovieProvider>
    </div>
  );
}

export default AddMovie;