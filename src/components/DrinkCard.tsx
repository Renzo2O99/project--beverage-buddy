import { useAppStore } from "../stores/useAppStore";
import { RecipeComponent } from "../types/types";

interface DrinkCardProps {
  drink: RecipeComponent
}

export const DrinkCard = ({ drink }: DrinkCardProps) => {
  const styles = {
    backgroundImage: `url(${drink.strDrinkThumb})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
  };

  const { selectRecipe, searchFilters } = useAppStore();
  const verify = drink.strCategory ? drink.strCategory : searchFilters.category;

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto overflow-hidden">
      <div className="w-[95%] h-[400px] bg-gray-300 rounded-xl border-4 border-double border-slate-800 shadow-md transition-transform duration-300 md:hover:scale-95 md:hover:rotate-3 cursor-pointer relative">
        <div onClick={() => selectRecipe(drink.idDrink)} style={styles} className="w-full h-full bg-center bg-cover rounded-lg"></div>
      </div>

      <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800 flex flex-col z-10">
        <h3 className="py-4 px-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">{drink.strDrink}</h3>

        <div className="flex-grow flex flex-col justify-between p-4 bg-gray-200 dark:bg-gray-700">
          <span className="font-bold text-gray-800 dark:text-gray-200 text-center">{verify}</span>
          <button onClick={() => selectRecipe(drink.idDrink)} 
          className="mx-auto mt-4 w-4/5 px-4 py-3 text-xs font-semibold text-white uppercase transition-all duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none lg:hover:scale-110">
            Leer más...
          </button>
        </div>
      </div>
    </div>
  );
};
