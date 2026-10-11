const recipes = [
    {
      name: "Spaghetti Carbonara",
      ingredients: "spaghetti, eggs, pancetta, parmesan, pepper",
      instructions: "Boil pasta. Fry pancetta. Mix eggs and cheese. Combine all and season well.",
      category: "quick",
      image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "Paneer Butter Masala",
      ingredients: "paneer, tomato, cream, butter, spices",
      instructions: "Cook tomato gravy, add cream and spices. Add paneer and simmer gently.",
      category: "vegetarian",
      image: "https://myfoodstory.com/wp-content/uploads/2021/10/Paneer-Butter-Masala-1-2.jpg"
    },
    {
      name: "Veggie Stir Fry",
      ingredients: "broccoli, bell pepper, soy sauce, garlic, sesame oil",
      instructions: "Stir fry veggies, add sauce, cook until crisp-tender. Serve hot with rice or noodles.",
      category: "vegetarian",
      image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "Chocolate Mug Cake",
      ingredients: "flour, cocoa, sugar, milk, oil",
      instructions: "Mix ingredients in mug, microwave for 1-2 mins. Let it cool slightly and enjoy!",
      category: "dessert",
      image: "https://tse1.mm.bing.net/th?id=OIP.53E68o16w4HrqXfL6Bz5PwHaLH&pid=Api&P=0&h=220"
    },
    {
      name: "Mango Smoothie",
      ingredients: "mango, milk, yogurt, honey",
      instructions: "Blend mango, milk, yogurt, and honey until smooth. Chill and serve cold.",
      category: "quick",
      image: "https://vaya.in/recipes/wp-content/uploads/2017/09/Mango-Smoothie_2-1.jpg"
    }
  ];
  
  function searchRecipe() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const results = document.getElementById("results");
    results.innerHTML = "";
  
    const filtered = recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(query) ||
      recipe.ingredients.toLowerCase().includes(query)
    );
  
    displayRecipes(filtered);
  }
  
  function filterByCategory(category) {
    localStorage.setItem('selectedCategory', category);
    window.location.href = 'category.html';
  }
    
   //document.getElementById("searchInput").value = category;
    //displayRecipes(filtered);
  //}
  
  function displayRecipes(recipesToDisplay) {
    const results = document.getElementById("results");
    results.innerHTML = "";
  
    if (recipesToDisplay.length === 0) {
      results.innerHTML = "<p style='text-align:center;'>No recipes found. Try another ingredient.</p>";
      return;
    }
  function filterByCategory(category) {
    localStorage.setItem('selectedCategory', category);
    window.location.href = 'category.html';
  }
  
    recipesToDisplay.forEach(recipe => {
      const div = document.createElement("div");
      div.className = "recipe-card";
      div.innerHTML = `
        <div class="recipe-image">
          <img src="${recipe.image}" alt="${recipe.name}">
        </div>
        <div class="recipe-content">
          <h3>${recipe.name}</h3>
          <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
          <p><strong>Instructions:</strong> ${recipe.instructions}</p>
          <a href="recipe-detail.html?name=${encodeURIComponent(recipe.name)}" class="view-recipe">View Full Recipe</a>
        </div>
      `;
      results.appendChild(div);
    });
  }
  
  // Display all recipes when page loads
  window.onload = function() {
    displayRecipes(recipes);
  };