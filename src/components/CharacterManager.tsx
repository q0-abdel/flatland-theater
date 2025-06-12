
import React from 'react';
import CharacterModel from './CharacterModel';
import { Character } from '../types/theater';

interface CharacterManagerProps {
  characters: Character[];
  lineLength: number;
  onCharactersUpdate: (characters: Character[]) => void;
}

const CharacterManager: React.FC<CharacterManagerProps> = ({ 
  characters, 
  lineLength, 
  onCharactersUpdate 
}) => {
  const lineSpacing = 0.8;
  const lineStartX = -(lineLength - 1) * lineSpacing / 2;

  return (
    <>
      {characters.map((character) => {
        const x = lineStartX + character.position * lineSpacing;
        const z = 0; // Characters stay on the line
        
        return (
          <CharacterModel
            key={character.id}
            character={character}
            position={[x, 0, z]}
          />
        );
      })}
    </>
  );
};

export default CharacterManager;
