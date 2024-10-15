import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import Modal from "../components/Modal";
import { useAppStore } from "../stores/useAppStore";
import { useEffect } from "react";
import { Notification } from "../components/Notification";
import { motion } from "framer-motion"; // Importar motion

export const Layout = () => {
  const { loadFrontStorage } = useAppStore();

  useEffect(() => {
    loadFrontStorage();
  }, []);

  return (
    <>
      <Header />

      <motion.main
        className="container mx-auto py-16"
        initial={{ opacity: 0, y: 20 }} // Estado inicial
        animate={{ opacity: 1, y: 0 }} // Estado final
        exit={{ opacity: 0, y: -20 }} // Estado al salir
        transition={{ duration: 0.5 }} // Duración de la animación
      >
        <Outlet />
      </motion.main>

      <Modal />
      <Notification />
    </>
  );
};

export default Layout;
