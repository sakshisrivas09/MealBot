package com.mealbot.backend.service;

import com.mealbot.backend.dto.RecipeResponse;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;

class GeminiServiceTest {

    @Test
    void testParseResponse() {
        ChatModel chatModel = Mockito.mock(ChatModel.class);
        GeminiService service = new GeminiService(chatModel);
        String sampleRawResponse = "{\"recipes\": [{\"name\": \"Fried Rice\", \"description\": \"A classic fried rice.\", \"ingredientsUsed\": [\"rice\"], \"ingredientsMissing\": [\"egg\"], \"instructions\": [\"cook\"], \"prepTime\": \"5 mins\", \"cookTime\": \"10 mins\", \"difficulty\": \"Easy\", \"calories\": \"300 kcal\"}]}";

        RecipeResponse response = ReflectionTestUtils.invokeMethod(service, "parseResponse", sampleRawResponse);

        assertNotNull(response);
        assertEquals(1, response.getRecipes().size());
        RecipeResponse.Recipe recipe = response.getRecipes().get(0);
        assertEquals("Fried Rice", recipe.getName());
        assertEquals("A classic fried rice.", recipe.getDescription());
        assertTrue(recipe.getIngredientsUsed().contains("rice"));
        assertTrue(recipe.getIngredientsMissing().contains("egg"));
        assertEquals("Easy", recipe.getDifficulty());
    }
}
