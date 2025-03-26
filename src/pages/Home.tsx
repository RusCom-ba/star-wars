import CardList from "../components/CardList";

const Home = () => {
  return (
    <div className="relative flex justify-center items-start min-h-screen px-4 pt-20 bg-black overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-[60%] rounded-full bg-yellow-400 blur-[250px] opacity-30 z-0" />
      <div className="z-10">
        <CardList />
      </div>
    </div>
  );
};

export default Home;
