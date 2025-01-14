import { z } from 'zod'
import { CategoriesAPIResponseSchema, DrinkAPIResponse, DrinksAPIResponse, RecipeAPIResponseSchema, searchFilterSchema } from '../utils/recipes-schema'

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>
export type SearchFilter = z.infer<typeof searchFilterSchema>
export type Drink = z.infer<typeof DrinkAPIResponse>
export type Drinks = z.infer<typeof DrinksAPIResponse>
export type Recipe = z.infer<typeof RecipeAPIResponseSchema>
export type RecipeComponent = Pick<Recipe, 'idDrink' | 'strDrink' | 'strDrinkThumb' | 'strCategory'>