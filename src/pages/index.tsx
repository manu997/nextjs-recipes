import Banner from "@/components/Banner";
import CardsContainer from "@/components/CardsContainer";
import useRecipes from "@/hooks/useRecipes";

const Home = () => {
  const allRecipes = useRecipes();
  return (
    <>
      <Banner />
      {allRecipes.isFetching ? (
        <div>Loading...</div>
      ) : (
        <CardsContainer recipes={allRecipes.data} />
      )}
    </>
  );
};

export default Home;
