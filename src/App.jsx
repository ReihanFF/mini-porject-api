import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import CharacterPage from './CharacterPage';
import CharacterList from './CharacterList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function Navbar({ searchTerm, handleSearchChange }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="/">Star Wars Characters</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <input
                className="form-control"
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function LandingPage() {
  return (
    <div className="container">
      <h1 className="mt-5">Welcome to Star Wars Characters!</h1>
      <Link to="/characters" className="btn btn-primary mt-3">Get Started</Link>
    </div>
  );
}


function App() {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetch('https://swapi.dev/api/people')
      .then(response => response.json())
      .then(data => {
        setCharacters(data.results);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    const results = characters.filter(
      character =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        character.gender.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [characters, searchTerm]);

  const handleSearchChange = event => {
    const searchTerm = event.target.value.trim();

    if (searchTerm) {
      fetch(`https://swapi.dev/api/people/?search=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
          setCharacters(data.results);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    } else {
      fetch('https://swapi.dev/api/people')
        .then(response => response.json())
        .then(data => {
          setCharacters(data.results);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }

    setSearchTerm(searchTerm);
  };

  return (
    <Router>
      <div>
        <Navbar searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
        <div className="content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/characters" element={<CharacterList characters={searchResults} />} />
            <Route path="/character/:name/*" element={<CharacterPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}


export default App;
