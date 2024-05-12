import express, { Router } from 'express';
import RecipeController from '../controllers/RecipeController';
import authMiddleware from '../middleware/auth';

const router: Router = express.Router();

router.get('/', RecipeController.getRecipes);
router.post('/', RecipeController.addRecipe);
router.post('/favorites', authMiddleware,RecipeController.saveFavorite);
router.get('/favorites/:userId', authMiddleware,RecipeController.getFavorites);

export default router;
