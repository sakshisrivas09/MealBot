package com.mealbot.backend.controller;

import com.mealbot.backend.dto.IngredientRequest;
import com.mealbot.backend.dto.RecipeResponse;
import com.mealbot.backend.service.GeminiService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    private final GeminiService geminiService;

    public RecipeController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/generate")
    public ResponseEntity<RecipeResponse> generateRecipes(@Valid @RequestBody IngredientRequest request) {
        RecipeResponse response = geminiService.generateRecipes(request);
        return ResponseEntity.ok(response);
    }
}
