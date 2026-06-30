package com.mealbot.backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mealbot.backend.dto.IngredientRequest;
import com.mealbot.backend.dto.RecipeResponse;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.stereotype.Service;

@Service
public class GeminiService {

    private final ChatModel chatModel;
    private final ObjectMapper objectMapper;

    public GeminiService(ChatModel chatModel) {
        this.chatModel = chatModel;
        this.objectMapper = new ObjectMapper();
    }

    public RecipeResponse generateRecipes(IngredientRequest request) {
        String prompt = buildPrompt(request);

        try {
            String jsonText = chatModel.call(prompt);
            return parseResponse(jsonText);
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch recipes from Gemini API: " + e.getMessage(), e);
        }
    }

    private String buildPrompt(IngredientRequest request) {
        String ingredients = String.join(", ", request.getIngredients());
        String restrictions = (request.getDietaryRestrictions() != null && !request.getDietaryRestrictions().trim().isEmpty())
                ? request.getDietaryRestrictions()
                : "None";

        return "You are an expert chef. The user has the following ingredients: " + ingredients + ".\n" +
                "Dietary restrictions: " + restrictions + ".\n\n" +
                "Suggest up to 5 recipes that can be made using these ingredients. You can also include standard pantry staples (like salt, pepper, oil, water, sugar) as missing ingredients if they are needed but not listed, or other missing ingredients that would enhance the dish.\n\n" +
                "You must return a JSON object with a single key \"recipes\" which contains an array of recipes. Each recipe must have the following fields:\n" +
                "- name: name of the dish\n" +
                "- description: brief description of the dish\n" +
                "- ingredientsUsed: array of strings of ingredients the user has that are used in this recipe\n" +
                "- ingredientsMissing: array of strings of ingredients needed but not in the user's input list\n" +
                "- instructions: array of strings, listing the step-by-step instructions\n" +
                "- prepTime: estimation of prep time (e.g. \"10 mins\")\n" +
                "- cookTime: estimation of cook time (e.g. \"20 mins\")\n" +
                "- difficulty: \"Easy\", \"Medium\", or \"Hard\"\n" +
                "- calories: estimation of calories (e.g. \"350 kcal\")\n\n" +
                "Return ONLY the raw JSON block. Do not wrap it in markdown code blocks or any other formatting.";
    }

    private RecipeResponse parseResponse(String jsonText) {
        if (jsonText == null || jsonText.trim().isEmpty()) {
            throw new IllegalStateException("Gemini returned an empty response.");
        }

        try {
            // Clean markdown code fences if present in the text response
            jsonText = jsonText.trim();
            if (jsonText.startsWith("```")) {
                int firstNewLine = jsonText.indexOf('\n');
                if (firstNewLine != -1) {
                    jsonText = jsonText.substring(firstNewLine + 1);
                } else {
                    jsonText = jsonText.substring(3);
                }
            }
            if (jsonText.endsWith("```")) {
                jsonText = jsonText.substring(0, jsonText.length() - 3);
            }
            jsonText = jsonText.trim();

            return objectMapper.readValue(jsonText, RecipeResponse.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse Gemini response: " + e.getMessage() + ". Content: " + jsonText, e);
        }
    }
}
