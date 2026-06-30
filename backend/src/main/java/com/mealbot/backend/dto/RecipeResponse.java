package com.mealbot.backend.dto;

import java.util.List;

public class RecipeResponse {
    private List<Recipe> recipes;

    public List<Recipe> getRecipes() {
        return recipes;
    }

    public void setRecipes(List<Recipe> recipes) {
        this.recipes = recipes;
    }

    public static class Recipe {
        private String name;
        private String description;
        private List<String> ingredientsUsed;
        private List<String> ingredientsMissing;
        private List<String> instructions;
        private String prepTime;
        private String cookTime;
        private String difficulty;
        private String calories;

        // Getters and Setters
        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public List<String> getIngredientsUsed() {
            return ingredientsUsed;
        }

        public void setIngredientsUsed(List<String> ingredientsUsed) {
            this.ingredientsUsed = ingredientsUsed;
        }

        public List<String> getIngredientsMissing() {
            return ingredientsMissing;
        }

        public void setIngredientsMissing(List<String> ingredientsMissing) {
            this.ingredientsMissing = ingredientsMissing;
        }

        public List<String> getInstructions() {
            return instructions;
        }

        public void setInstructions(List<String> instructions) {
            this.instructions = instructions;
        }

        public String getPrepTime() {
            return prepTime;
        }

        public void setPrepTime(String prepTime) {
            this.prepTime = prepTime;
        }

        public String getCookTime() {
            return cookTime;
        }

        public void setCookTime(String cookTime) {
            this.cookTime = cookTime;
        }

        public String getDifficulty() {
            return difficulty;
        }

        public void setDifficulty(String difficulty) {
            this.difficulty = difficulty;
        }

        public String getCalories() {
            return calories;
        }

        public void setCalories(String calories) {
            this.calories = calories;
        }
    }
}
