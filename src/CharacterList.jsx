import React from 'react';
import { Link } from 'react-router-dom';

function CharacterList({ characters }) {
  return (
    <div>
      <h1> Star Wars Characters</h1>
    <ul className="list-group">
      {characters.map(character => (
        <li key={character.name} className="list-group-item">
          <Link to={`/character/${character.name}`}>{character.name}</Link>
        </li>
      ))}
    </ul>
    </div>
  );
}

export default CharacterList;
