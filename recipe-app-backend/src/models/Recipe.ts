import mongoose, { Schema, Document } from 'mongoose';

export interface IRecipe extends Document {
    idMeal: string;
    title: string;
    category: string;
    imageUrl: string;
    instructions: string;
}

const recipeSchema: Schema = new Schema({
    idMeal: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    instructions: { type: String, required: true }
});

export default mongoose.model<IRecipe>('Recipe', recipeSchema);
