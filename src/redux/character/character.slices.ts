import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Character, CharacterState } from "./character.types";
import { RootState } from "../Store";

const getIdFromUrl = (url: string): number => {
  const parts = url.split("/").filter(Boolean);
  return parseInt(parts[parts.length - 1]);
};

export const fetchCharacters = createAsyncThunk<
  Character[],
  number[],
  { state: RootState }
>("character/fetchCharacters", async (ids, { getState, rejectWithValue }) => {
  const { byId } = getState().character;
  const baseUrl = import.meta.env.VITE_STAR_WARS_CHARACTER;

  const idsToFetch = ids.filter((id) => !byId[id]);

  if (idsToFetch.length === 0) {
    return rejectWithValue("Already cached");
  }

  const responses = await Promise.all(
    idsToFetch.map((id) => axios.get(`${baseUrl}${id}/`))
  );

  const characters = responses.map((res) => ({
    ...res.data,
    id: getIdFromUrl(res.data.url),
  }));

  return characters;
});

const initialState: CharacterState = {
  byId: {},
  allIds: [],
  loading: false,
  error: null,
};

const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        action.payload.forEach((char) => {
          const id = getIdFromUrl(char.url);
          state.byId[id] = char;
          if (!state.allIds.includes(id)) {
            state.allIds.push(id);
          }
        });
        state.loading = false;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        if (action.payload !== "Already cached") {
          state.error = "Failed to fetch characters.";
        }
        state.loading = false;
      });
  },
});

export default characterSlice.reducer;
