
export interface SimulationConfig {
  lineLength: number;
  actionInterval: number; // in milliseconds
}

export type SimulationState = 'configuration' | 'running' | 'paused';

export type CharacterType = 'young_woman' | 'boy_glasses' | 'boy_afro';

export type BodyOrientation = 0 | 90 | 180 | 270;
export type HeadOrientation = -90 | 0 | 90; // relative to body

export type ActionType = 'move_forward' | 'turn_body_left' | 'turn_body_right' | 
                        'turn_head_left' | 'turn_head_right' | 'initiate_interaction' | 'idle';

export type AnimationState = 'idle' | 'walking' | 'turning_body' | 'turning_head' | 
                           'interacting_embrace' | 'interacting_attempt';

export interface Character {
  id: string;
  type: CharacterType;
  position: number; // unit on the line (0 to lineLength-1)
  bodyOrientation: BodyOrientation;
  headOrientation: HeadOrientation; // relative to body
  animationState: AnimationState;
  animationProgress: number; // 0 to 1
  color: string; // temporary visual identifier
}

export interface InteractionResult {
  type: 'mutual_embrace' | 'unilateral_attempt' | 'none';
  characters: string[]; // character IDs involved
}
