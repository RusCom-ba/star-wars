import { useState, useEffect } from "react";
import { Character } from "../redux/character/character.types";
import EditModal from "./EditModal";

const Card = (props: Character) => {
  const [character, setCharacter] = useState<Character>(props);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(`character_${character.name}`);
    if (stored) {
      setCharacter(JSON.parse(stored));
    }
  }, [character.name]);

  const handleSave = (updated: Character) => {
    localStorage.setItem(`character_${updated.name}`, JSON.stringify(updated));
    setCharacter(updated);
    setIsModalOpen(false);
  };

  const capitalizeFirst = (str: string) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div
      className="relative text-white p-4 rounded-lg w-[250px] h-[400px] md:w-[300px] md:h-[500px] shadow-lg bg-cover flex flex-col justify-end"
      style={{ backgroundImage: `url(\"${character.image}\")` }}
    >
      <div className="absolute inset-0 bg-opacity-60 rounded-lg" />

      <div className="relative z-10 p-3 space-y-0.5">
        <p>
          Name: <strong>{character.name}</strong>
        </p>
        <p>
          Height: <strong>{character.height} cm</strong>
        </p>
        <p>
          Mass: <strong>{character.mass} kg</strong>
        </p>
        <p>
          Hair color: <strong>{capitalizeFirst(character.hair_color)}</strong>
        </p>
        <p>
          Skin color: <strong>{capitalizeFirst(character.skin_color)}</strong>
        </p>
        <p>
          Eye color: <strong>{capitalizeFirst(character.eye_color)}</strong>
        </p>
        <p>
          Birth year: <strong>{character.birth_year}</strong>
        </p>
        <p>
          Gender: <strong>{capitalizeFirst(character.gender)}</strong>
        </p>
      </div>

      <div className="relative z-10 pb-4 flex justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-24 bg-[#E3D61D] mt-4 text-black font-bold py-1 rounded hover:bg-yellow-300 transition cursor-pointer"
        >
          Edit
        </button>
      </div>

      {isModalOpen && (
        <EditModal
          character={character}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Card;
