import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import { useAppStore } from '../stores/useAppStore';
import { Recipe } from '../types/types';

export default function Modal() {
  const { selectedRecipe, selectedRecipe: { strInstructions, strInstructionsES }, modal, closeModal, handleClickFavorite, favoriteExists } = useAppStore();

  const languageInstructions = strInstructionsES === null ? strInstructions : strInstructionsES;

  const renderIngredients = () => {
    const ingredients: JSX.Element[] = [];

    for (let i = 1; i <= 6; i++) {
      const ingredient = selectedRecipe[`strIngredient${i}` as keyof Recipe];
      const measure = selectedRecipe[`strMeasure${i}` as keyof Recipe];

      if (ingredient && measure) {
        ingredients.push(
          <li key={i} className='text-lg font-normal'>
            {ingredient} - {measure}
          </li>
        );
      }
    }

    return ingredients;
  };

  return (
    <>
      <Dialog as="div" className="relative z-10" open={modal} onClose={closeModal}>
        {modal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl sm:my-8 sm:w-full sm:max-w-2xl sm:p-6"
            >
              <Dialog.Title as="h3" className="text-gray-900 text-4xl font-extrabold my-5 text-center">
                {selectedRecipe.strDrink}
              </Dialog.Title>

              <img className='mx-auto w-96 rounded-xl' 
                src={selectedRecipe.strDrinkThumb} alt={`imagen de ${selectedRecipe.strDrink}`} />

              <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                Ingredientes y Cantidades
              </Dialog.Title>

              <ul>{renderIngredients()}</ul>

              <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                Instrucciones
              </Dialog.Title>

              <p className="text-lg">{languageInstructions}</p>

              <div className='mt-5 flex flex-col gap-6 py-4 md:flex-row md:justify-between md:py-2'>
                <button className='w-full rounded bg-slate-800 p-3 font-bold uppercase text-white shadow hover:bg-gray-500 md:w-[45%]'
                  onClick={() => { handleClickFavorite(selectedRecipe); closeModal(); }}
                  type='button'>
                  {favoriteExists(selectedRecipe.idDrink) ? 'Eliminar de Favoritos' : 'Agregar a Favoritos'}
                </button>

                <button className='w-full rounded bg-gray-600 p-3 font-bold uppercase text-white shadow hover:bg-gray-500 md:w-[45%]'
                  onClick={closeModal}
                  type='button'>
                  Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
