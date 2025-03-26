import { RootState } from "../Store";

// Selector that returns a single character from the Redux state based on the given ID. Useful for getting individual character details.
export const selectCharacterById = (id: number) => (state: RootState) =>
  state.character.byId[id];

// Selector that returns an array of all character objects from the Redux state. It maps over allIds and returns the corresponding character from byId.
export const selectAllCharacters = (state: RootState) =>
  state.character.allIds.map((id) => state.character.byId[id]);
