const HyperspaceLoader = () => {
  // this is loader component styled in a Star Wars theme
    return (
      <div className="flex flex-col items-center justify-center h-[300px] gap-2">
        <div className="w-40 h-2 bg-[#E3D61D] animate-pulse rounded shadow-[0_0_30px_10px_#E3D61D]" />
        <p className="text-yellow-300 font-bold mt-2 animate-fade text-sm">Loading galactic data...</p>
      </div>
    );
  };
  
  export default HyperspaceLoader;