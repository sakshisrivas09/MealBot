package com.mealbot.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@SpringBootApplication
public class BackendApplication {

    static {
        loadEnv();
    }

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    private static void loadEnv() {
        String[] potentialPaths = { ".env", "backend/.env", "../.env" };
        for (String pathStr : potentialPaths) {
            Path envPath = Paths.get(pathStr);
            if (Files.exists(envPath)) {
                try {
                    System.out.println("[MealBot Backend] Loading environment variables from: " + envPath.toAbsolutePath());
                    List<String> lines = Files.readAllLines(envPath);
                    for (String line : lines) {
                        line = line.trim();
                        if (line.isEmpty() || line.startsWith("#")) {
                            continue;
                        }
                        int idx = line.indexOf('=');
                        if (idx > 0) {
                            String key = line.substring(0, idx).trim();
                            String value = line.substring(idx + 1).trim();
                            
                            // Remove surrounding quotes
                            if (value.startsWith("\"") && value.endsWith("\"") && value.length() >= 2) {
                                value = value.substring(1, value.length() - 1);
                            } else if (value.startsWith("'") && value.endsWith("'") && value.length() >= 2) {
                                value = value.substring(1, value.length() - 1);
                            }
                            
                            System.setProperty(key, value);
                        }
                    }
                    return; // Successfully loaded, exit method
                } catch (IOException e) {
                    System.err.println("[MealBot Backend] Error reading env file " + envPath + ": " + e.getMessage());
                }
            }
        }
        System.out.println("[MealBot Backend] Warning: No .env file was found. Relying on host environment variables.");
    }
}
