// Type that represents a single character from the Star Wars API
export type Character = {
  id: number;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  url: string;
  image?: string;
};

// Redux state shape for characters
export type CharacterState = {
  byId: Record<number, Character>;
  allIds: number[];
  loading: boolean;
  error: string | null;
};