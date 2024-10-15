import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Layout } from "./layouts/Layout"
import Spinner from "./components/Spinner"


const IndexPage = lazy(() => import('./pages/IndexPage'))
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'))

export const AppRouter = () => {
  return (
    <BrowserRouter>         
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={
            <Suspense fallback={<Spinner children="Página de Inicio" />}><IndexPage /></Suspense>
          } index />
          <Route path="/favorites" element={
            <Suspense fallback={<Spinner children="Página de Favoritos" />}><FavoritesPage /></Suspense>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}