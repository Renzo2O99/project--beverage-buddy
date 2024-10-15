import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { motion, AnimatePresence } from 'framer-motion'; // Importar motion y AnimatePresence
import { useAppStore } from '../stores/useAppStore';

export const Notification = () => {
  const { notification, hideNotification } = useAppStore();

  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 flex items-start px-4 py-6 sm:p-6"
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        <AnimatePresence>
          {notification.show && (
            <motion.div
              initial={{ opacity: 0, translateY: 20 }} // Estado inicial
              animate={{ opacity: 1, translateY: 0 }} // Estado final
              exit={{ opacity: 0, translateY: 20 }} // Estado de salida
              transition={{ duration: 0.3 }} // Duración de la animación
              className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
            >
              <div className="p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {notification.error ? (
                      <XCircleIcon aria-hidden="true" className='h-12 w-12 text-red-400' />
                    ) : (
                      <CheckCircleIcon aria-hidden="true" className='h-12 w-12 text-green-400' />
                    )}
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-bold text-gray-900 md:text-md">Nueva Notificación</p>
                    <p className="mt-1 text-sm text-gray-500 md:text-md">
                      {notification.text}
                    </p>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={hideNotification}
                    >
                      <span className="sr-only">Cerrar</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
