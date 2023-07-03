import Banner from "@/components/Banner";
import CardsContainer from "@/components/CardsContainer";
import { getAllElementsByType } from "../../firebase/elementController";
import { HomeProps, Recipe } from "@/utils/types";
import { GetServerSideProps } from "next";
import Head from "next/head";

const Home = ({ recipes }: HomeProps) => {
  return (
    <>
    <Head>
      <title>Recetario | Home</title>
    </Head>
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
