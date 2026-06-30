# MealBot 🍳 (AI-Powered Chef)

MealBot is a premium, modern web application designed to reduce food waste. Simply enter the ingredients available in your pantry, select any dietary restrictions, and our AI-powered assistant will recommend up to 5 custom recipes complete with difficulty levels, preparation and cooking times, and an interactive step-by-step cooking progress tracker.

---

## ✨ Features

*   **Smart Ingredient Selector**: Interactive tags input with quick-add chips for kitchen staples (eggs, milk, chicken, etc.) and dietary constraint filters (e.g. Gluten-Free, Vegan, Vegetarian).
*   **AI Recommendations**: Powered by the new **Spring AI (Google GenAI)** starter utilizing **Gemini 2.5 Flash** to instantly draft matching recipes.
*   **Active Cooking Mode**: Select any recipe to launch a dedicated cooking workspace. Gather ingredients using checklist cards, follow step-by-step instructions, and track your progress with a live status bar.
*   **Premium Dark UI**: Built with dynamic gradient overlays, glassmorphic card elements, pulse skeleton loaders, and modern responsive layouts.

---

## 🛠️ Tech Stack

### Backend
*   **Java 21**
*   **Spring Boot 3.3.1**
*   **Spring AI 1.1.7** (using `spring-ai-starter-model-google-genai`)
*   **Maven Wrapper** (No installation needed)

### Frontend
*   **React** (built via **Vite**)
*   **Tailwind CSS v4** (CSS-first compilation)
*   **Lucide Icons**
*   **Axios** (API Client)

---

## 📁 Folder Structure

```
MealBot/
├── backend/                  # Spring Boot application
│   ├── src/                  # Source files
│   ├── .env.example          # Template for local credentials
│   ├── pom.xml               # Maven dependencies (Spring AI, Web, Boot)
│   └── mvnw.cmd              # Maven executable wrapper (Windows)
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # UI Components (LandingPage, CookingMode, etc.)
│   │   ├── services/         # Axios API client integrations
│   │   └── App.jsx           # Routing & global state controller
│   ├── package.json          # Dependencies & scripts
│   └── vite.config.js        # Vite + Tailwind compiler configs
└── README.md                 # Project documentation
```

---

## 🚀 Setup & Run Locally

### 1. Prerequisite (Google Gemini API Key)
Get a free Gemini API key from [Google AI Studio](https://aistudio.google.com/).

### 2. Run the Backend Server
Create a `.env` file in the `backend/` directory to store your API key safely:

```bash
# Create file at backend/.env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

Start the server using the Maven wrapper:
```bash
cd backend
# Windows:
.\mvnw.cmd spring-boot:run

# macOS / Linux:
./mvnw spring-boot:run
```
The server will start up on **`http://localhost:8080`**.

### 3. Run the Frontend App
Install the Node dependencies and boot the Vite development server:

```bash
cd frontend
npm install
npm run dev
```
Open **`http://localhost:5173`** in your browser to start cooking!

---

## 🔌 API Documentation

### Generate Recipes
*   **Endpoint**: `POST /api/recipes/generate`
*   **Headers**: `Content-Type: application/json`
*   **Request Body**:
    ```json
    {
      "ingredients": ["chicken", "garlic", "rice", "soy sauce"],
      "dietaryRestrictions": "Gluten-Free"
    }
    ```
*   **Response Body**:
    ```json
    {
      "recipes": [
        {
          "name": "Gluten-Free Garlic Chicken Rice",
          "description": "A savory, quick skillet meal using pantry ingredients.",
          "ingredientsUsed": ["chicken", "garlic", "rice", "soy sauce"],
          "ingredientsMissing": ["olive oil", "salt", "green onions"],
          "instructions": [
            "Cook the rice according to package directions.",
            "Heat olive oil in a skillet and sauté minced garlic.",
            "Add chicken breast strips and sear until cooked through.",
            "Drizzle with soy sauce, simmer, and serve over rice."
          ],
          "prepTime": "10 mins",
          "cookTime": "15 mins",
          "difficulty": "Easy",
          "calories": "380 kcal"
        }
      ]
    }
    ```

---

## 🤝 Contributing
Built with ❤️ by **Sakshi Srivastava**. Feel free to fork, open issues, or submit pull requests to enhance the application!
