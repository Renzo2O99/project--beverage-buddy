import { StateCreator } from "zustand";
import { Recipe } from "../types/types";
import { NotificationSliceType, createNotificationSlice } from "./notificationSlice";

export type FavoritesSliceType = {
	favorites: Recipe[],
	handleClickFavorite: (recipe: Recipe) => void,
  favoriteExists: (id: Recipe['idDrink']) => boolean,
  loadFrontStorage: () => void,
}

export const createFavoritesSlice: StateCreator<FavoritesSliceType & NotificationSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({
	favorites: [],
	handleClickFavorite: (recipe) => {
		if (get().favoriteExists(recipe.idDrink)) {
      set(state => ({ favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink), modal: false }))
      
      createNotificationSlice(set, get, api).showNotification({text: 'La receta se eliminó con éxito de favoritos', error: false})
    } else {
      set(state => ({ favorites: [ ...state.favorites, recipe], modal: false }))
      createNotificationSlice(set, get, api).showNotification({text: 'La receta se añadió con éxito a favoritos', error: false})
    }

    localStorage.setItem('favorites', JSON.stringify(get().favorites))
	},
  favoriteExists: (id) => {
    return get().favorites.some(favorite => favorite.idDrink === id)
  },
  loadFrontStorage: () => {
    const storedFavorites = localStorage.getItem('favorites')

    if (storedFavorites) {
      set({ favorites: JSON.parse(storedFavorites) })
    }
  }
})