import { useEffect, useState } from "react";

const UnderConstruction = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const audio = new Audio("/sounds/lightsaber.mp3");
    audio.volume = 0.5;
    audio.play();

    const timeout = setTimeout(() => {
      setShowText(true);
    }, 1200);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-black overflow-hidden text-white font-sans">
      <div className="absolute top-1/2 left-[-200px] w-[200px] h-2 bg-green-400 shadow-[0_0_30px_10px_#00ff99] animate-saber-glow z-20 rounded" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-500/10 via-black to-black blur-3xl z-10" />

      {showText && (
        <div className="z-30 text-center px-6 space-y-6 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold tracking-widest text-yellow-300 drop-shadow-xl animate-shake">
            Page Under Construction
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            This part of the galaxy is still in development.
          </p>
          <p className="italic text-sm text-gray-500">
            May the code be with you 👨‍💻
          </p>
        </div>
      )}
    </div>
  );
};

export default UnderConstruction;
