package com.mealbot.backend.dto;

import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public class IngredientRequest {

    @NotEmpty(message = "Ingredients list cannot be empty")
    private List<String> ingredients;

    private String dietaryRestrictions;

    // Getters and Setters
    public List<String> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<String> ingredients) {
        this.ingredients = ingredients;
    }

    public String getDietaryRestrictions() {
        return dietaryRestrictions;
    }

    public void setDietaryRestrictions(String dietaryRestrictions) {
        this.dietaryRestrictions = dietaryRestrictions;
    }
}
