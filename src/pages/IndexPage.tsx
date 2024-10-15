import { useMemo } from "react";
import { motion } from "framer-motion"; // Importa motion
import { useAppStore } from "../stores/useAppStore";
import { DrinkCard } from "../components/DrinkCard";

export const IndexPage = () => {
  const { drinks } = useAppStore();

  const hasDrinks = useMemo(() => drinks.drinks.length > 0, [drinks]);

  return (
    <>
      <h1 className="text-5xl text-gray-600 font-extrabold pb-10 text-center md:text-6xl">
        Recetas Disponibles
      </h1>

      {hasDrinks ? (
        <motion.div
          className="grid m-10 justify-center items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 gap-y-12"
          initial={{ opacity: 0 }} // Estado inicial
          animate={{ opacity: 1 }} // Estado final
          transition={{ duration: 0.5 }} // Duración de la animación
        >
          {drinks.drinks.map((drink) => (
            <motion.div
              key={drink.idDrink}
              initial={{ scale: 0 }} // Animación de entrada
              animate={{ scale: 1 }} // Estado final
              transition={{ type: "spring", stiffness: 200 }}
            >
              <DrinkCard drink={drink} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.p
          className="grid my-10 text-center text-2xl md:text-4xl"
          initial={{ opacity: 0 }} // Estado inicial
          animate={{ opacity: 1 }} // Estado final
          transition={{ duration: 0.5 }} // Duración de la animación
        >
          Aún no hay resultados, <span className="text-indigo-700 font-bold">¡prueba a completar el formulario!</span>
        </motion.p>
      )}
    </>
  );
};

export default IndexPage;
