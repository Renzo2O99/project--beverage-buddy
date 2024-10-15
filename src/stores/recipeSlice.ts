import { StateCreator } from "zustand"
import { getCategories, getRecipeById, getRecipes } from "../services/RecipeService"
import { Categories, Drink, Drinks, Recipe, SearchFilter } from "../types/types"

export type RecipesSliceType = {
  categories: Categories,
  drinks: Drinks,
  searchFilters: SearchFilter,
  selectedRecipe: Recipe,
  modal: boolean,
  fetchCategories: () => Promise<void>,
  searchRecipes: (searchFilter: SearchFilter) => Promise<void>,
  setSearchFilters: (filters: SearchFilter) => void,
  selectRecipe: (id: Drink['idDrink']) => Promise<void>,
  closeModal: () => void,
}

export const createRecipesSlice: StateCreator<RecipesSliceType> = (set) => ({
  categories: {
    drinks: []
  },
  drinks: {
    drinks: []
  },
  searchFilters: {
    ingredient: '',
    category: ''
  },
  selectedRecipe: {} as Recipe,
  modal: false,
  fetchCategories: async () => {
    const categories = await getCategories()
    
    if (categories) {
      set({ 
        categories 
      })
    }
  },
  searchRecipes: async (filters) => {
    const drinks = await getRecipes(filters)
    set({ drinks })
  },
  setSearchFilters: (filters) => set({ searchFilters: filters }),
  selectRecipe: async (id) => {
    const selectedRecipe = await getRecipeById(id)
    set({ selectedRecipe, modal: true })
  },
  closeModal: () => {
    set({ modal: false, selectedRecipe: {} as Recipe })
  }
});
