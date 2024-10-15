import { useMemo } from "react";
import { DrinkCard } from "../components/DrinkCard";
import { useAppStore } from "../stores/useAppStore";
import { motion } from "framer-motion"; // Importar motion

export const FavoritesPage = () => {
  const { favorites } = useAppStore();
  const hasFavorites = useMemo(() => favorites.length > 0, [favorites]);

  return (
    <>
      <motion.h1
        className="text-5xl text-gray-600 font-extrabold pb-10 text-center md:text-6xl"
        initial={{ opacity: 0, y: -20 }} // Estado inicial
        animate={{ opacity: 1, y: 0 }} // Estado final
        transition={{ duration: 0.5 }} // Duración de la animación
      >
        Mis Favoritos
      </motion.h1>

      {hasFavorites ? (
        <motion.div
          className="grid m-10 justify-center items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 gap-y-12"
          initial={{ opacity: 0 }} // Estado inicial
          animate={{ opacity: 1 }} // Estado final
          transition={{ duration: 0.5, delay: 0.2 }} // Duración y retraso de la animación
        >
          {favorites.map(drink => (
            <motion.div
              key={drink.idDrink}
              initial={{ opacity: 0, y: 20 }} // Estado inicial
              animate={{ opacity: 1, y: 0 }} // Estado final
              transition={{ duration: 0.3 }} // Duración de la animación
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
          transition={{ duration: 0.5, delay: 0.2 }} // Duración y retraso de la animación
        >
          Aún no hay favoritos, <span className="text-indigo-700 font-bold">¡prueba a agregarlos desde inicio!</span>
        </motion.p>
      )}
    </>
  );
};

export default FavoritesPage;
