import React from "react";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';

import AddMovie from './AddMovie';
import ListMovies from './ListMovies';
import SearchMovies from './SearchMovies';
import NoMatch from './NoMatch';

import './App.css';

Amplify.configure(awsExports);

class App extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {

    return (
      <Authenticator>
        {({signOut, user }) => (
          <BrowserRouter>
            <h1>Recorded Movies System</h1>
            <div>
            <button>
                <Link to="/">Movie追加</Link>
              </button>
              <button>
                <Link to="/ListMovies">Movie一覧</Link>
              </button>
              <button>
                <Link to="/SearchMovies">Movie検索</Link>
              </button>
              <button onClick={signOut}>Sign out</button>
            </div>

            <Routes>
              <Route exact path="/" element={<AddMovie />} />
              <Route exact path="/ListMovies" element={<ListMovies />} />
              <Route exact path="/SearchMovies" element={<SearchMovies />} />
              <Route exact path="*" element={<NoMatch />} />
            </Routes>
          </BrowserRouter>
        )}
      </Authenticator>
    );
  }
}

export default App;