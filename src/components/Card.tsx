import { useState, useEffect } from "react";
import { Character } from "../redux/character/character.types";
import EditModal from "./EditModal";

const Card = (props: Character) => {
  const [character, setCharacter] = useState<Character>(props); // local character state
  const [isModalOpen, setIsModalOpen] = useState(false); // modal open state
  const [isRecovering, setIsRecovering] = useState(false); // recovery in progress
  const [fallbackError, setFallbackError] = useState(false); // localStorage corrupted

  // Try loading character data from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(`character_${character.name}`);
      if (stored) {
        setCharacter(JSON.parse(stored));
      }
    } catch (error) {
      // If parsing fails, mark error and recover from props
      console.error("Corrupted localStorage for character:", error);
      setFallbackError(true);
      setIsRecovering(true);

      // Clear broken localStorage and restore fallback props
      setTimeout(() => {
        localStorage.removeItem(`character_${character.name}`);
        setCharacter(props);
        setIsRecovering(false);
      }, 1200);
    }
  }, [character.name]);

  // Automatically hide fallback notification after 4 seconds
  useEffect(() => {
    if (fallbackError) {
      const timer = setTimeout(() => {
        setFallbackError(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [fallbackError]);

  // Save updated character to localStorage and local state
  const handleSave = (updated: Character) => {
    localStorage.setItem(`character_${updated.name}`, JSON.stringify(updated));
    setCharacter(updated);
    setIsModalOpen(false);
  };

  // Capitalize utility, because API returns first letter small
  const capitalizeFirst = (str: string) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div
      className="relative text-white p-4 rounded-lg w-[250px] h-[400px] md:w-[300px] md:h-[500px] shadow-lg bg-cover flex flex-col justify-end"
      style={{ backgroundImage: `url("${character.image}")` }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-opacity-60 rounded-lg" />

      {/* Character info */}
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

      {/* Edit button */}
      <div className="relative z-10 pb-4 flex justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-24 bg-[#E3D61D] mt-4 text-black font-bold py-1 rounded hover:bg-yellow-300 transition cursor-pointer"
        >
          Edit
        </button>
      </div>

      {/* Edit modal */}
      {isModalOpen && (
        <EditModal
          character={character}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}

      {/* Fallback recovery overlay */}
      {isRecovering && (
        <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex flex-col items-center justify-center z-40 text-yellow-300 font-bold text-center p-4">
          <div className="w-32 h-2 bg-yellow-300 animate-pulse shadow-[0_0_30px_10px_#E3D61D] rounded-full mb-4" />
          <p className="text-lg tracking-widest uppercase animate-pulse">
            Restoring character data...
          </p>
        </div>
      )}

      {/* Recovery notification */}
      {fallbackError && !isRecovering && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-yellow-900/70 text-yellow-100 px-4 py-1 rounded text-sm animate-fade-in z-50 shadow-lg">
          Restored corrupted character data.
        </div>
      )}
    </div>
  );
};

export default Card;
