import { RootState } from "../Store";

export const selectCharacterById = (id: number) => (state: RootState) =>
  state.character.byId[id];

export const selectAllCharacters = (state: RootState) =>
  state.character.allIds.map((id) => state.character.byId[id]);
