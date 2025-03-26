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

export type CharacterState = {
  byId: Record<number, Character>;
  allIds: number[];
  loading: boolean;
  error: string | null;
};