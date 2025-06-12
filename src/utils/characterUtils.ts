
import { Character, CharacterType, BodyOrientation } from '../types/theater';

export const initializeCharacters = (lineLength: number): Character[] => {
  const characterTypes: CharacterType[] = ['young_woman', 'boy_glasses', 'boy_afro'];
  
  // Calculate initial positions with spacing
  const positions = [
    Math.round(lineLength / 4),
    Math.round(lineLength / 2),
    Math.round((3 * lineLength) / 4)
  ];
  
  // Ensure positions are within bounds and unique
  const validPositions = positions.map((pos, index) => {
    let validPos = Math.max(0, Math.min(lineLength - 1, pos));
    
    // Avoid overlapping positions
    while (positions.slice(0, index).includes(validPos) && validPos < lineLength - 1) {
      validPos++;
    }
    
    return validPos;
  });

  const orientations: BodyOrientation[] = [0, 90, 180, 270];

  return characterTypes.map((type, index) => ({
    id: `character_${index}`,
    type,
    position: validPositions[index],
    bodyOrientation: orientations[Math.floor(Math.random() * orientations.length)],
    headOrientation: 0, // Start with head forward
    animationState: 'idle',
    animationProgress: 1, // Start ready for action
    color: ['#ff6b9d', '#4ecdc4', '#45b7d1'][index], // Temporary colors
  }));
};

export const getCharacterAtPosition = (characters: Character[], position: number): Character | null => {
  return characters.find(char => char.position === position) || null;
};

export const isPositionOccupied = (characters: Character[], position: number): boolean => {
  return characters.some(char => char.position === position);
};

export const getAdjacentCharacters = (characters: Character[], character: Character): Character[] => {
  const leftPos = character.position - 1;
  const rightPos = character.position + 1;
  
  return characters.filter(char => 
    char.id !== character.id && (char.position === leftPos || char.position === rightPos)
  );
};

export const canMoveForward = (character: Character, characters: Character[], lineLength: number): boolean => {
  // Check orientation (must be facing left or right)
  if (character.bodyOrientation !== 90 && character.bodyOrientation !== 270) {
    return false;
  }
  
  // Check head alignment (must be facing forward)
  if (character.headOrientation !== 0) {
    return false;
  }
  
  // Calculate target position based on orientation
  let targetPosition: number;
  if (character.bodyOrientation === 90) { // Facing right
    targetPosition = character.position + 1;
  } else { // Facing left (270)
    targetPosition = character.position - 1;
  }
  
  // Check bounds
  if (targetPosition < 0 || targetPosition >= lineLength) {
    return false;
  }
  
  // Check if target position is occupied
  return !isPositionOccupied(characters, targetPosition);
};

export const canInitiateInteraction = (character: Character, characters: Character[]): boolean => {
  // Must have head forward
  if (character.headOrientation !== 0) {
    return false;
  }
  
  // Must be facing another character adjacently
  const adjacent = getAdjacentCharacters(characters, character);
  
  return adjacent.some(other => {
    // Check if they're facing each other
    const isLeftOfOther = character.position < other.position;
    const isRightOfOther = character.position > other.position;
    
    if (isLeftOfOther) {
      // Character should be facing right (90°), other should be facing left (270°)
      return character.bodyOrientation === 90 && other.bodyOrientation === 270;
    } else if (isRightOfOther) {
      // Character should be facing left (270°), other should be facing right (90°)
      return character.bodyOrientation === 270 && other.bodyOrientation === 90;
    }
    
    return false;
  });
};
