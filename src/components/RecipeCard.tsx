const RecipeCard = () => {
  return (
    <div className="shadow-lg rounded-3xl md:w-3/4 xl:w-11/12 3xl:w-5/6">
      <img
        src={
          "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505"
        }
        className="rounded-t-3xl"
        alt={"bannerMainImage"}
      />
      <div className="pr-5 flex flex-col gap-3 m-5">
        <p className="text-2xl font-bold text-gray-700">
          Pasta con queso
        </p>
        <div className="flex justify-between">
          <p className="text-md font-medium text-gray-500">
            Nombre del chef
          </p>
          <p className="text-md font-medium text-gray-500">50 min.</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
