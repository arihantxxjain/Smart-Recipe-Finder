# 🍽️ Smart Recipe Finder & AI Chef

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![GitHub](https://img.shields.io/badge/Author-Arihant%20Jain-emerald?style=for-the-badge&logo=github)](https://github.com/arihantxxjain)

> **Cook like a chef with what you already have.** An intelligent culinary engine that matches random ingredients in your virtual pantry to thousands of delicious recipes worldwide, complete with an on-demand AI Recipe Studio.

---

## 🌟 Key Features

### 🥕 1. Virtual Pantry Matching
- Add ingredients one-by-one or click popular pantry staples (*Chicken, Garlic, Rice, Eggs, Cheese, Tomatoes, etc.*).
- Intelligent multi-ingredient search algorithms that filter and rank meals from **TheMealDB API**.
- One-click clear or remove individual ingredients.

### 🤖 2. AI Smart Recipe Studio
- Have quirky leftover ingredients (*e.g., leftover rice + eggs + chili oil*)?
- Select your meal vibe (*Comfort Food, High Protein, 15-Minute Flash Meal, Healthy & Light*), max cooking time, and spice level.
- Synthesizes a bespoke gourmet dish on the fly with estimated calories, structured ingredient measurements, step-by-step techniques, and **Chef Pro Hacks**!
- Instant one-click clipboard copying with celebratory confetti animations.

### 🔍 3. Advanced Category & Regional Cuisine Filters
- Filter by meal category (*Breakfast, Vegetarian, Vegan, Seafood, Pasta, Dessert, etc.*).
- Explore authentic regional cuisines (*Italian, Indian, Mexican, Chinese, French, Mediterranean, etc.*).
- Search directly by dish name.
- **Surprise Me!** button that picks a random gourmet meal with full details.

### 📖 4. Interactive Cooking Modal & Ingredients Checklist
- High-definition dish imagery and cuisine origin tags.
- Interactive **Checkable Ingredients List** — check items off on your phone or tablet while cooking at the stove.
- Numbered step-by-step instructions.
- Embedded links to **YouTube video tutorials** and original sources.

### 💾 5. LocalStorage Bookmarks / Favorites
- Save favorite dishes with a single click.
- Persistent saved recipes drawer accessible anytime from the navigation bar.

### 📱 6. Responsive & Modern Aesthetics
- Designed with **Tailwind CSS v4** featuring glassmorphic navigation, modern typography (Plus Jakarta Sans & Playfair Display), and responsive mobile drawer.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | React 19, React Router DOM v7 |
| **Build Tool & Bundler** | Vite 7 |
| **Styling & Design** | Tailwind CSS v4, Lucide React Icons |
| **API Integration** | TheMealDB REST API |
| **Testing** | Vitest, React Testing Library, jsdom |
| **Animations & Effects** | Canvas Confetti, CSS3 Keyframes |
| **State & Persistence** | React Hooks (`useState`, `useEffect`), Browser `localStorage` |

---

## 📂 Project Architecture

```
Smart-Recipe-Finder/
├── public/
│   ├── favicon.svg          # Modern Chef vector icon
│   └── logo.svg             # Application brand mark
├── src/
│   ├── assets/              # Curated food imagery and vector assets
│   ├── components/
│   │   ├── __tests__/       # Vitest unit test suites
│   │   ├── About.jsx        # Mission, benefits & sustainability impact
│   │   ├── AiChefGenerator.jsx # Interactive AI Recipe Studio
│   │   ├── ContactForm.jsx  # Interactive feedback & inquiries form
│   │   ├── FavoritesDrawer.jsx # Slide-over saved recipes manager
│   │   ├── FeaturedRecipes.jsx # Hand-picked culinary highlights
│   │   ├── Footer.jsx       # Attribution, links & copyright
│   │   ├── Hero.jsx         # Hero banner with instant pantry search
│   │   ├── Navbar.jsx       # Responsive glassmorphic navigation
│   │   ├── RecipeCard.jsx   # Interactive meal card with quick save
│   │   └── RecipeModal.jsx  # Rich recipe detail modal with checklist
│   ├── pages/
│   │   ├── AiChefPage.jsx   # Dedicated AI Chef Studio page
│   │   ├── Home.jsx         # Full landing & discovery experience
│   │   └── Recipes.jsx      # Virtual pantry & recipe discovery engine
│   ├── services/
│   │   └── recipeApi.js     # API integration & LocalStorage utilities
│   ├── test/                # Test utilities & environment setup
│   ├── App.jsx              # Main routing configuration
│   ├── index.css            # Tailwind CSS imports & custom styles
│   └── main.jsx             # React DOM root entry
├── eslint.config.js         # ESLint configuration
├── index.html               # Main HTML entry with Google Fonts
├── package.json             # Dependencies and build scripts
├── vercel.json              # SPA routing rules for Vercel deployment
├── vite.config.js           # Vite build and plugin settings
└── vitest.config.js         # Test runner settings
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/arihantxxjain/Smart-Recipe-Finder.git
   cd Smart-Recipe-Finder
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173` to explore the app.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Run test suite:**
   ```bash
   npm test
   ```

---

## 👨‍💻 Author & Contributions

**Arihant Jain**  
- **GitHub:** [@arihantxxjain](https://github.com/arihantxxjain)
- **Email:** [jainarihant.154@gmail.com](mailto:jainarihant.154@gmail.com)
- **Project Repo:** [arihantxxjain/Smart-Recipe-Finder](https://github.com/arihantxxjain/Smart-Recipe-Finder)

Contributions, issues, and feature requests are welcome! Feel free to star ⭐ the repository if you found this project helpful.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for full details.
