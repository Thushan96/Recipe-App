import { Request, Response } from 'express';
import Recipe from '../models/Recipe';
import axios from 'axios';
import User from '../models/User';
import mongoose from 'mongoose';

class RecipeController {
    static getRecipes = async (req: Request, res: Response) => {
        try {
            const { category } = req.query;
            
            // Validate if category is provided
            if (!category || typeof category !== 'string') {
                return res.status(400).json({ error: 'Category is required' });
            }

            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
            const { meals } = response.data;
            console.log(meals);
            

            const recipes = meals.map((meal: any) => ({
                idMeal: meal.idMeal,
                title: meal.strMeal,
                category: meal.strCategory,
                imageUrl: meal.strMealThumb,
                instructions: meal.strInstructions
            }));

            res.status(200).json(recipes);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    static getRecipesById = async (req: Request, res: Response) => {
        try {
            const { id } = req.query;
            
            // Validate if id is provided
            if (!id || typeof id !== 'string') {
                return res.status(400).json({ error: 'Recipe ID is required' });
            }

            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            const { meals } = response.data;

            if (!meals || Object.keys(meals).length === 0) {
                return res.status(404).json({ error: 'Recipe not found' });
            }

            const meal = meals[0];

            const recipe = {
                idMeal: meal.idMeal,
                title: meal.strMeal,
                category: meal.strCategory,
                imageUrl: meal.strMealThumb,
                instructions: meal.strInstructions
            };

            res.status(200).json(recipe);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    static addRecipe = async (req: Request, res: Response) => {
        try {
            const { idMeal, title, category, imageUrl, instructions } = req.body;

            const newRecipe = new Recipe({ idMeal, title, category, imageUrl, instructions });
            await newRecipe.save();

            res.status(201).json({ message: 'Recipe added successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    static saveFavorite = async (req: Request, res: Response) => {
        try {
            const { userId, recipeId } = req.body;

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            if (user.favorites.includes(recipeId)) {
                return res.status(200).json({ error: 'Recipe already in favorites' });
            }

            const validRecipeId = String(recipeId);

            user.favorites.push(validRecipeId);
            await user.save();

            res.status(200).json({ message: 'Recipe added to favorites successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    static getFavorites = async (req: Request, res: Response) => {
        try {
            const { userId } = req.params;

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const favoriteRecipes:any = [];
            for (const recipeId of user.favorites) {
                const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
                const { meals } = response.data;
                if (meals && meals.length > 0) {
                    const meal = meals[0];
                    favoriteRecipes.push({
                        idMeal: meal.idMeal,
                        title: meal.strMeal,
                        category: meal.strCategory,
                        imageUrl: meal.strMealThumb,
                        instructions: meal.strInstructions
                    });
                }
            }

            res.status(200).json(favoriteRecipes);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
}

export default RecipeController;
