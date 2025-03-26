import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Character, CharacterState } from "./character.types";
import { RootState } from "../Store";

// Extract character ID from the SWAPI URL
const getIdFromUrl = (url: string): number => {
  const parts = url.split("/").filter(Boolean);
  return parseInt(parts[parts.length - 1]);
};

// Thunk to fetch characters by IDs
export const fetchCharacters = createAsyncThunk<
  Character[],        // Return type
  number[],           // Input (IDs)
  { state: RootState } // Access to state
>(
  "character/fetchCharacters",
  async (ids, { getState, rejectWithValue }) => {
    const { byId } = getState().character;
    const baseUrl = import.meta.env.VITE_STAR_WARS_CHARACTER;

    // Skip fetching if already cached
    const idsToFetch = ids.filter((id) => !byId[id]);
    if (idsToFetch.length === 0) {
      return rejectWithValue("Already cached");
    }

    try {
      // Fetch all characters
      const responses = await Promise.all(
        idsToFetch.map((id) => axios.get(`${baseUrl}${id}/`))
      );

      // Map to Character[]
      const characters = responses.map((res) => ({
        ...res.data,
        id: getIdFromUrl(res.data.url),
      }));

      return characters;
    } catch (error: any) {
      console.error("API error:", error);
      return rejectWithValue("Failed to fetch character data.");
    }
  }
);

// Initial state
const initialState: CharacterState = {
  byId: {},
  allIds: [],
  loading: false,
  error: null,
};

// Slice
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
        // Only show error if it's not a "Already cached" skip
        if (action.payload !== "Already cached") {
          state.error = action.payload as string;
        }
        state.loading = false;
      });
  },
});

export default characterSlice.reducer;