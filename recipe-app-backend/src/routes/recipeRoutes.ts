import express, { Router } from 'express';
import RecipeController from '../controllers/RecipeController';

const router: Router = express.Router();

router.get('/', RecipeController.getRecipes);
router.post('/', RecipeController.addRecipe);
router.post('/favorites', RecipeController.saveFavorite);
router.get('/favorites/:userId', RecipeController.getFavorites);

export default router;
