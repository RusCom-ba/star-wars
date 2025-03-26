import { useState, useEffect } from "react";
import { Character } from "../redux/character/character.types";

// Props passed into the modal component
interface EditModalProps {
  character: Character; // character data to edit
  onClose: () => void; // function to close the modal
  onSave: (updated: Character) => void; // function to save edited data
}

// Functional component definition
const EditModal = ({ character, onClose, onSave }: EditModalProps) => {
  // Local state to hold editable form data
  const [formData, setFormData] = useState<Character>(character);

  // Play hologram sound effect when modal is opened
  useEffect(() => {
    const audio = new Audio("/sounds/holo-open.mp3");
    audio.volume = 0.4;
    audio.play();
  }, []);

  // Update form data on input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    // Overlay covering the entire screen
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
      {/* Retro scanline effect in the background */}
      <div className="absolute inset-0 bg-[url('/scanlines.png')] opacity-10 pointer-events-none z-40"></div>

      {/* Modal container with glowing effect */}
      <div className="relative bg-cyan-300/10 border border-cyan-500 text-white p-6 rounded-xl w-[90%] max-w-md shadow-[0_0_30px_5px_#00ffff50] animate-holo animate-holo-vibe z-50">
        {/* Modal title */}
        <h2 className="text-2xl font-bold text-center mb-4 text-cyan-300">
          Edit Character
        </h2>

        {/* Editable form fields for the character attributes */}
        <div className="space-y-2">
          {[
            "name",
            "height",
            "mass",
            "hair_color",
            "skin_color",
            "eye_color",
            "birth_year",
            "gender",
          ].map((key) => (
            <div key={key} className="flex flex-col">
              <label className="text-sm text-cyan-100 capitalize">
                {key.replace("_", " ")} {/* Display field name nicely */}
              </label>
              <input
                type="text"
                name={key}
                value={(formData as any)[key]} // accessing the field dynamically
                onChange={handleChange}
                className="p-1 rounded bg-black/30 border border-cyan-600 text-white shadow-inner"
              />
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="text-cyan-300 hover:text-cyan-100"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)} // calls parent's onSave with updated character
            className="bg-cyan-400 px-4 py-1 rounded text-black font-bold hover:bg-cyan-300 transition"
          >
            Save
          </button>
        </div>

        {/* Glowing border animation */}
        <div className="absolute inset-0 rounded-xl border-2 border-cyan-400 animate-pulse border-opacity-30 pointer-events-none" />
      </div>
    </div>
  );
};

export default EditModal;