import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/Store";
import { fetchCharacters } from "../redux/character/character.slices";
import Card from "./Card";
import Vader from "../assets/vader.png?url";
import Kenobi from "../assets/kenobi.png?url";
import Yoda from "../assets/yoda.png?url";
import HyperspaceLoader from "./HyperspaceLoader";
import { Character } from "../redux/character/character.types";

// Here i'm mapping character IDs to custom local images because API does not return images and i've downloaded my own images and render as shown in Figma
const imageMap: Record<number, string> = {
  4: Vader,
  10: Kenobi,
  20: Yoda,
};

// These are character IDs to be rendered as in figma, others are rendering by ID also just without picture
const ids = [4, 10, 20];

const CardList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { byId, loading, error } = useSelector(
    (state: RootState) => state.character
  );

  // Flag to indicate whether localStorage has been loaded
  const [localLoaded, setLocalLoaded] = useState(false);

  useEffect(() => {
    // Step 1: We are checking if all characters are in localStorage
    const cached = ids.map((id) => localStorage.getItem(`character_${id}`));
    const isAllCached = cached.every(Boolean);

    if (isAllCached) {
      // Step 2a: If cached, dispatch them manually to the Redux store
      cached.forEach((item, index) => {
        if (item) {
          try {
            const parsed = JSON.parse(item);
            dispatch({
              type: "character/fetchCharacters/fulfilled", // Simulate fulfilled action
              payload: [parsed],
            });
          } catch (err) {
            // If parsing fails, treat it as corrupted and remove
            console.error("Corrupted localStorage for character", ids[index]);
            localStorage.removeItem(`character_${ids[index]}`);
          }
        }
      });
      setLocalLoaded(true);
    } else {
      // Step 2b: If not cached, fetch from API
      dispatch(fetchCharacters(ids)).then((res) => {
        if ("payload" in res) {
          const payload = res.payload as Character[];

          // Step 3: Store each fetched character into localStorage
          ids.forEach((id) => {
            const char = payload.find((c) => c.url.includes(`/${id}/`));
            if (char) {
              localStorage.setItem(`character_${id}`, JSON.stringify(char));
            }
          });
        }
        setLocalLoaded(true);
      });
    }
  }, [dispatch]);

  // Step 4: Showing loading spinner until data is ready
  if (!localLoaded || loading) return <HyperspaceLoader />;

  // Step 5: Displaying error message if data fetching fails
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center text-center mt-12 px-4 animate-fade-in">
        <div className="w-40 h-1 bg-red-500 shadow-[0_0_25px_5px_#ff0000] rounded-full mb-4 animate-pulse" />
        <p className="text-2xl font-extrabold text-red-500 tracking-wide drop-shadow-md">
          Transmission Error
        </p>
        <p className="text-sm text-red-300 mt-2 max-w-md">
          Something went wrong while contacting the galactic server.
        </p>
        <p className="italic text-xs text-red-200 mt-1">
          Try refreshing the galaxy or check your connection.
        </p>
      </div>
    );
  }

  // Step 6: Merge Redux data with local image mappings
  const characters = ids
    .map((id) => byId[id])
    .filter(Boolean)
    .map((char) => ({
      ...char,
      image: imageMap[char.id],
    }));

  // Step 7: Render list of <Card /> components
  return (
    <div className="flex gap-6 flex-wrap justify-center">
      {characters.map((char) => (
        <Card key={char.id} {...char} />
      ))}
    </div>
  );
};

export default CardList;