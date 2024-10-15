import { ChangeEvent, FormEvent, useEffect, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";
import { motion } from "framer-motion"; // Importar motion

interface LinkStateProps {
  isActive: boolean;
}

export const Header = () => {
  const { pathname } = useLocation();
  const isHome = useMemo(() => pathname === '/', [pathname]);

  const { categories, fetchCategories, searchRecipes, searchFilters, setSearchFilters, showNotification } = useAppStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...searchFilters, [name]: value };
    setSearchFilters(newFilters);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validación:
    if (Object.values(searchFilters).includes('')) {
      showNotification({
        text: 'Todos los campos son obligatorios',
        error: true
      });
      return;
    }

    // Consultar las recetas:
    searchRecipes(searchFilters);
  };

  const getLinkState = ({ isActive }: LinkStateProps) => {
    return isActive ? 'text-blue-500 uppercase font-bold' : 'text-gray-200 uppercase font-bold';
  };

  const getBackground = () => {
    return isHome ? 'bg-header bg-right-bottom bg-cover bg-no-repeat md:bg-center' : 'bg-slate-800';
  }

  return (
    <header className={getBackground()}>
      <div className="mx-auto container px-5 py-16">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }} // Estado inicial
            animate={{ opacity: 1, y: 0 }} // Estado final
            transition={{ duration: 0.5 }} // Duración de la animación
          >
            <NavLink to="/">
              <img src="/logo.svg" alt="logotipo" className="w-32" />
            </NavLink>
          </motion.div>
          <nav className="flex flex-col items-center gap-4 md:flex-row">
            <motion.div
              initial={{ opacity: 0, x: -20 }} // Estado inicial
              animate={{ opacity: 1, x: 0 }} // Estado final
              transition={{ duration: 0.5, delay: 0.1 }} // Duración y retraso de la animación
            >
              <NavLink to="/" className={getLinkState}>Inicio</NavLink>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }} // Estado inicial
              animate={{ opacity: 1, x: 0 }} // Estado final
              transition={{ duration: 0.5, delay: 0.2 }} // Duración y retraso de la animación
            >
              <NavLink to="/favorites" className={getLinkState}>Favoritos</NavLink>
            </motion.div>
          </nav>
        </div>

        {isHome && (
          <motion.form
            className="form-style max-w-lg mx-auto my-32 md:mt-16 md:mb-32 p-10 rounded-lg shadow-md space-y-6 md:w-1/2 lg:w-2/3"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, scale: 0.95 }} // Estado inicial
            animate={{ opacity: 1, scale: 1 }} // Estado final
            transition={{ duration: 0.5, delay: 0.3 }} // Duración y retraso de la animación
          >
            <div className="space-y-4 mb-5">
              <label className="block mb-2 font-medium text-white dark:text-whiteuppercase text-xl" htmlFor="ingredient">
                Nombre o ingredientes:
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-black text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:border-double block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus-visible:border-blue-500 focus:outline-none"
                placeholder="Ej: Vodka, Tequila, Coffie"
                value={searchFilters.ingredient}
                onChange={handleChange}
                name="ingredient"
                id="ingredient"
                type="text"
              />
            </div>

            <div className="space-y-4">
              <label className="block mb-2 font-medium text-white dark:text-whiteuppercase text-xl" htmlFor="category">
                Categoría:
              </label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                value={searchFilters.category}
                onChange={handleChange}
                name="category"
                id="category"
              >
                <option value="">--&gt; Seleccione &lt;--</option>
                {categories.drinks.map(category => (
                  <option key={category.strCategory} value={category.strCategory}>
                    {category.strCategory}
                  </option>
                ))}
              </select>
            </div>

            <hr className="border-none my-2" />

            <div className="flex justify-center">
              <button type="submit" className="relative flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none dark:focus:ring-blue-800">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Buscar Recetas Disponibles
                </span>
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </header>
  );
};
