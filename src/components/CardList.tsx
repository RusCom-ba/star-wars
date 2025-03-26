import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/Store";
import { fetchCharacters } from "../redux/character/character.slices";
import Card from "./Card";
import Vader from "../assets/vader.png?url";
import Kenobi from "../assets/kenobi.png?url";
import Yoda from "../assets/yoda.png?url";

const imageMap: Record<number, string> = {
  4: Vader,
  10: Kenobi,
  20: Yoda,
};

const ids = [4, 10, 20];

const CardList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { byId, loading, error } = useSelector(
    (state: RootState) => state.character
  );

  useEffect(() => {
    dispatch(fetchCharacters(ids));
  }, [dispatch]);

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const characters = ids
    .map((id) => byId[id])
    .filter(Boolean)
    .map((char) => ({
      ...char,
      image: imageMap[char.id],
    }));

  return (
    <div className="flex gap-6 flex-wrap justify-center">
      {characters.map((char) => (
        <Card key={char.id} {...char} />
      ))}
    </div>
  );
};

export default CardList;
