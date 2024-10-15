import { create } from "zustand";
import { RecipesSliceType, createRecipesSlice } from "./recipeSlice";
import { FavoritesSliceType, createFavoritesSlice } from "./favoritesSlice";
import { devtools } from "zustand/middleware";
import { NotificationSliceType, createNotificationSlice } from "./notificationSlice";

export const useAppStore = create<RecipesSliceType & FavoritesSliceType & NotificationSliceType>() (devtools((...a) => ({
	...createRecipesSlice(...a),
	...createFavoritesSlice(...a),
	...createNotificationSlice(...a),
})))