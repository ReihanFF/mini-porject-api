import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function CharacterPage() {
  const { name } = useParams();
  const [character, setCharacter] = useState(null);
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    fetch(`https://swapi.dev/api/people/?search=${name}`)
      .then(response => response.json())
      .then(data => {
        if (data.results.length > 0) {
          setCharacter(data.results[0]);
          Promise.all(data.results[0].films.map(filmUrl => fetch(filmUrl).then(response => response.json())))
            .then(filmsData => {
              setFilms(filmsData);
              setIsLoading(false); 
            })
            .catch(error => {
              console.error('Error fetching films:', error);
              setIsLoading(false); 
            });
        } else {
          setIsLoading(false); 
        }
      })
      .catch(error => {
        console.error('Error fetching character:', error);
        setIsLoading(false); 
      });
  }, [name]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!character) {
    return <div>Character not found.</div>;
  }

  return (
    <div className="container mt-4">
      <h2>{character.name}</h2>
      <h3>Character Details</h3>
      <div className="row">
        <div className="col-sm-6">
          <p><strong>Height:</strong> {character.height}</p>
          <p><strong>Mass:</strong> {character.mass}</p>
          <p><strong>Gender:</strong> {character.gender}</p>
          <p><strong>Hair Color:</strong> {character.hair_color}</p>
        </div>
        <div className="col-sm-6">
          <p><strong>Skin Color:</strong> {character.skin_color}</p>
          <p><strong>Eye Color:</strong> {character.eye_color}</p>
          <p><strong>Birth Year:</strong> {character.birth_year}</p>
        </div>
      </div>
      <h3>Films</h3>
      <ul className="list-group">
        {films.map(film => (
          <li key={film.episode_id} className="list-group-item">
            {film.title} (Episode {film.episode_id})
          </li>
        ))}
      </ul>
      <Link to="/characters" className="btn btn-primary mt-3">Back to Character List</Link>
    </div>
  );
}

export default CharacterPage;
