import Banner from "@/components/Banner";
import CardsContainer from "@/components/CardsContainer";
import { getAllElementsByType } from "../../firebase/elementController";
import { HomeProps, Recipe } from "@/types";
import { GetServerSideProps } from "next";

const Home = ({ recipes }: HomeProps) => {
  return (
    <>
      <Banner />
      <CardsContainer recipes={recipes} />
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const recipes = await getAllElementsByType("recipes");
  return { props: { recipes: recipes as Array<Recipe> } };
};
