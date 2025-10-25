/* 
==========================
   active navbar
==========================
*/
let nav = document.querySelector(".navigation-wrap");
window.onscroll = function () {
    if (document.documentElement.scrollTop > 20) {
        nav.classList.add("scroll-on");
    } else {
        nav.classList.remove("scroll-on");
    }
}
/* 
/* 
==========================
   Navigation active links
==========================
*/
function setActive(el) {
  // Remove active from all links
  document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
  // Add active to clicked link
  el.classList.add('active');
}

const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  const options = {
    threshold: 0.6 // 60% visible to trigger active
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove("active"));
        document.querySelector(`.nav-link[href="#${entry.target.id}"]`).classList.add("active");
      }
    });
  }, options);

sections.forEach(section => observer.observe(section));
/*  
==========================
   Nav Hide
==========================
*/
let navBar = document.querySelectorAll('.nav-link');
let navCollapse = document.querySelector('.navbar-collapse.collapse');
navBar.forEach(function (a) {
    a.addEventListener("click", function () {
        navCollapse.classList.remove("show");
    })
})
/* 
==========================
   Comment modal
==========================
*/
document.addEventListener("DOMContentLoaded", function () {
  // Load comments from LocalStorage
  let commentsData = JSON.parse(localStorage.getItem("commentsData")) || {};

  // Open modal when comment button clicked
  document.querySelectorAll(".comment-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const postId = this.getAttribute("data-post-id");
      document.getElementById("currentPostId").value = postId;

      // Render old comments
      renderComments(postId);

      // Show Bootstrap modal
      const modal = new bootstrap.Modal(document.getElementById("commentModal"));
      modal.show();
    });
  });

  // Handle form submit
  document.getElementById("commentForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const postId = document.getElementById("currentPostId").value;
    const name = document.getElementById("commentName").value.trim();
    const text = document.getElementById("commentText").value.trim();

    if (!name || !text) return;

    if (!commentsData[postId]) {
      commentsData[postId] = [];
    }

    commentsData[postId].push({ name, text });

    // Save to LocalStorage
    localStorage.setItem("commentsData", JSON.stringify(commentsData));

    // Clear form
    this.reset();

    // Refresh list
    renderComments(postId);
  });

  // Render comments
  function renderComments(postId) {
    const commentsList = document.getElementById("commentsList");
    commentsList.innerHTML = "";

    if (commentsData[postId]) {
      // Remove invalid/undefined comments
      commentsData[postId] = commentsData[postId].filter(c => c.text);

      // Save cleaned data
      localStorage.setItem("commentsData", JSON.stringify(commentsData));

      commentsData[postId].forEach(c => {
        const div = document.createElement("div");
        div.classList.add("border", "rounded", "p-2", "mb-2", "bg-light");
        div.innerHTML = `
          <strong>${c.name}</strong>
          <p class="mb-0 text-secondary">${c.text}</p>
        `;
        commentsList.appendChild(div);
      });
    }
  }
});
/* 
==========================
   Card Recipe Buttons 
==========================
*/
function filterFood(category) {
  let items = document.querySelectorAll(".card")

  items.forEach(item => {
    if (category === "all") {
      item.parentElement.style.display = "block"
    }
      else {
        if (item.classList.contains(category)) {
          item.parentElement.style.display = "block"
        }
        else {
          item.parentElement.style.display = "none"
      }
    }
  })
}
/* 
==========================
   Trigger search on button click
==========================
*/
function searchRecipes() {
  let inputEl = document.getElementById("searchInput");
  let input = inputEl.value.toLowerCase();
  let cards = document.querySelectorAll(".col-lg-4"); // recipe cards

  cards.forEach(card => {
    let title = card.querySelector("h4").innerText.toLowerCase();
    if (title.includes(input)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });

  // Clear input after search
  inputEl.value = "";
}

// Trigger search on Enter key
document.getElementById("searchInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    searchRecipes();
  }
});
/* 
==========================
  Show recipe on View Recipe click.
==========================
*/
function showRecipe(id) {
  const recipe = recipes.find(r => r.id === id);
  if (!recipe) return;

  // Fill modal content
  document.getElementById("recipeTitle").textContent = recipe.title;
  document.getElementById("recipeImage").src = recipe.image;
  document.getElementById("recipeIngredients").innerHTML =
    recipe.ingredients.map(i => `<li>${i}</li>`).join("");
  document.getElementById("recipeInstructions").innerHTML =
    recipe.instructions.map(step => `<li>${step}</li>`).join("");

  // Open modal (Bootstrap)
  const modal = new bootstrap.Modal(document.getElementById("recipeModal"));
  modal.show();
}

const recipes = [
  {
    id: 1,
    title: "Avocado Toast with Poached Egg",
    image: "images/breakfast/Avocado Toast with Poached Egg.avif",
    ingredients: ["2 slices whole grain bread", "1 avocado", "2 eggs", "Salt", "Pepper"],
    instructions: [
      "Toast the bread.",
      "Mash avocado with salt & pepper.",
      "Poach eggs in hot water.",
      "Spread avocado on toast, top with egg."
    ]
  },
  {
  id: 2,
  title: "Chocolate Lava Cake",
  image: "images/Desserts/Chocolate Lava Cake.avif",
  ingredients: [
    "100g dark chocolate",
    "100g unsalted butter",
    "2 whole eggs",
    "2 egg yolks",
    "1/4 cup sugar",
    "2 tbsp all-purpose flour",
    "Butter (for greasing)",
    "Cocoa powder (for dusting)",
    "Vanilla ice cream (for serving)"
  ],
  instructions: [
    "Preheat oven to 200°C (390°F). Grease ramekins with butter and dust with cocoa powder.",
    "Melt chocolate and butter together until smooth.",
    "In a bowl, whisk eggs, yolks, and sugar until pale and fluffy.",
    "Fold in the melted chocolate mixture and gently add flour.",
    "Pour batter into prepared ramekins.",
    "Bake for 10–12 minutes, until the edges are set but the center is soft.",
    "Carefully invert onto plates and serve immediately with vanilla ice cream."
  ]
},
{
  id: 3,
  title: "Stuffed Capsicum",
  image: "images/mains/Stuffed Capsicum.jpg",
  ingredients: [
    "4 medium capsicums (bell peppers)",
    "2 medium potatoes (boiled & mashed)",
    "1/2 cup green peas (boiled)",
    "1 medium onion (finely chopped)",
    "2 tbsp oil",
    "1 tsp cumin seeds",
    "1 tsp ginger-garlic paste",
    "1/2 tsp turmeric powder",
    "1 tsp red chili powder",
    "1 tsp garam masala",
    "Salt to taste",
    "Fresh coriander leaves (chopped)"
  ],
  instructions: [
    "Cut the tops of capsicums and remove seeds inside.",
    "Heat oil in a pan, add cumin seeds, onions, and sauté until golden.",
    "Add ginger-garlic paste, turmeric, chili powder, garam masala, and salt.",
    "Add boiled potatoes and peas, mix well, cook for 2–3 minutes.",
    "Stuff this mixture into hollow capsicums.",
    "Heat a pan with little oil, place stuffed capsicums upright, cover and cook on low flame until capsicum skin softens.",
    "Garnish with fresh coriander and serve hot."
  ]
  },
{
  id: 4,
  title: "Paneer Butter Masala",
  image: "images/mains/Paneer Butter Masala.avif",
  ingredients: [
    "200g paneer (cottage cheese), cubed",
    "2 tbsp butter",
    "2 medium onions (finely chopped)",
    "2 medium tomatoes (pureed)",
    "1/4 cup cashews (soaked, then blended)",
    "1 tbsp ginger-garlic paste",
    "2 green chilies (slit)",
    "1 tsp cumin seeds",
    "1/2 tsp turmeric powder",
    "1 tsp red chili powder",
    "1 tsp garam masala",
    "1/2 tsp kasuri methi (dried fenugreek leaves)",
    "1/2 cup fresh cream",
    "Salt to taste",
    "Fresh coriander leaves (for garnish)"
  ],
  instructions: [
    "Heat butter in a pan, add cumin seeds, onions, and sauté until golden.",
    "Add ginger-garlic paste and cook for a minute.",
    "Add tomato puree and cook until the oil separates.",
    "Mix in cashew paste, turmeric, chili powder, garam masala, and salt.",
    "Add 1/2 cup water, stir, and let it simmer for 5 minutes.",
    "Add paneer cubes, green chilies, and kasuri methi. Cook for 3–4 minutes.",
    "Stir in fresh cream and mix well.",
    "Garnish with coriander leaves and serve hot with naan or rice."
  ]
  },
{
  id: 5,
  title: "Masala Dosa",
  image: "images/breakfast/Masala Dosa.avif",
  ingredients: [
    "2 cups dosa batter (fermented)",
    "3 medium potatoes (boiled & mashed)",
    "1 medium onion (sliced)",
    "2 green chilies (chopped)",
    "1 tsp mustard seeds",
    "1 tsp cumin seeds",
    "1/2 tsp turmeric powder",
    "8-10 curry leaves",
    "2 tbsp oil",
    "Salt to taste",
    "Fresh coriander (chopped)",
    "Ghee or oil (for cooking dosa)"
  ],
  instructions: [
    "Heat oil in a pan, add mustard seeds, cumin, curry leaves, and green chilies.",
    "Add onions and sauté until golden.",
    "Add turmeric and mashed potatoes, mix well, season with salt.",
    "Cook for 2–3 minutes and finish with coriander leaves.",
    "Heat a tawa (griddle), pour a ladle of dosa batter, and spread in a circular motion.",
    "Drizzle oil or ghee on edges and cook until crisp.",
    "Place some potato masala in the center and fold the dosa.",
    "Serve hot with coconut chutney and sambar."
  ]
  },
{
    id: 6,
    title: "Classic Pancakes",
    image: "images/breakfast/Classic Pancakes.avif",
    ingredients: [
      "1 cup all-purpose flour",
      "2 tablespoons sugar",
      "2 teaspoons baking powder",
      "1/2 teaspoon salt",
      "1 cup milk",
      "1 large egg",
      "2 tablespoons melted butter (plus extra for cooking)",
      "1 teaspoon vanilla extract (optional)"
    ],
    instructions: [
      "In a large bowl, whisk together flour, sugar, baking powder, and salt.",
      "In another bowl, whisk milk, egg, melted butter, and vanilla extract.",
      "Pour wet ingredients into dry ingredients. Stir gently until just combined. Small lumps are okay.",
      "Preheat a non-stick skillet or griddle over medium heat and lightly grease with butter.",
      "Pour about 1/4 cup batter for each pancake. Cook until bubbles form on the surface, then flip and cook another 1–2 minutes until golden brown.",
      "Stack pancakes on a plate and serve with maple syrup, fresh fruits, or whipped cream."
    ]
  },
{
  id: 7,
  title: "Brownie Sundae",
  image: "images/Desserts/Brownie Sundae.avif",
  ingredients: [
    "2 chocolate brownies (warm, cut into squares)",
    "2 scoops vanilla ice cream",
    "2 tablespoons hot chocolate fudge sauce",
    "Whipped cream (for topping)",
    "Chopped nuts (almonds or walnuts)",
    "Cherries (for garnish)"
  ],
  instructions: [
    "Place warm brownie squares in a serving bowl or glass.",
    "Add scoops of vanilla ice cream on top of the brownies.",
    "Drizzle generously with hot chocolate fudge sauce.",
    "Top with whipped cream and sprinkle with chopped nuts.",
    "Garnish with a cherry and serve immediately."
  ]
  },
{
  id: 8,
  title: "Rainbow Vegetable Sandwich",
  image: "images/breakfast/Rainbow Vegetable Sandwich.avif",
  ingredients: [
    "8 slices whole wheat bread",
    "1/2 cup green chutney",
    "1 cucumber (sliced)",
    "1 tomato (sliced)",
    "1 carrot (grated)",
    "1 beetroot (grated)",
    "1/2 cup shredded lettuce",
    "Salt & pepper to taste",
    "Butter (optional)"
  ],
  instructions: [
    "Spread butter and green chutney on bread slices.",
    "Layer cucumber, tomato, carrot, beetroot, and lettuce evenly.",
    "Sprinkle with salt and pepper.",
    "Cover with another bread slice, press gently, and cut diagonally.",
    "Serve fresh with ketchup or chutney."
  ]
},
{
  id: 9,
  title: "Mango Cheesecake",
  image: "images/Desserts/Mango Cheesecake.avif",
  ingredients: [
    "200g digestive biscuits (crushed)",
    "100g melted butter",
    "400g cream cheese",
    "1/2 cup sugar",
    "1 cup mango pulp (fresh or canned)",
    "200ml whipped cream",
    "1 tbsp gelatin (optional for setting)"
  ],
  instructions: [
    "Mix crushed biscuits with melted butter and press into a springform pan to make the base.",
    "Whip cream cheese, sugar, and mango pulp until smooth.",
    "Fold in whipped cream and gelatin (if using).",
    "Pour mixture over biscuit base and refrigerate for 4–5 hours or until set.",
    "Top with mango slices before serving."
  ]
},
{
  id: 10,
  title: "Vegetable Upma",
  image: "images/breakfast/vegetable Upma.jpg",
  ingredients: [
    "1 cup semolina (rava/sooji)",
    "2 tbsp oil or ghee",
    "1 tsp mustard seeds",
    "1 onion (chopped)",
    "1 carrot (chopped)",
    "1/4 cup green peas",
    "2 green chilies (chopped)",
    "8–10 curry leaves",
    "2 1/2 cups water",
    "Salt to taste",
    "Fresh coriander (for garnish)"
  ],
  instructions: [
    "Dry roast semolina in a pan until lightly golden, set aside.",
    "Heat oil in a pan, add mustard seeds, curry leaves, and green chilies.",
    "Add onions, carrot, and peas; sauté until softened.",
    "Add water and salt, bring to boil.",
    "Slowly add roasted semolina while stirring continuously to avoid lumps.",
    "Cook until soft and fluffy. Garnish with coriander and serve hot."
  ]
},
{
  id: 11,
  title: "Vegetable Biryani",
  image: "images/mains/Vegetable Biryani.jpg",
  ingredients: [
    "2 cups basmati rice (soaked 30 mins)",
    "1 cup mixed vegetables (carrot, beans, peas, potato)",
    "2 onions (sliced)",
    "2 tomatoes (chopped)",
    "1/2 cup yogurt",
    "2 tsp ginger-garlic paste",
    "2 tsp biryani masala",
    "1/2 tsp turmeric powder",
    "1 tsp red chili powder",
    "Whole spices (bay leaf, cardamom, cloves, cinnamon)",
    "3 tbsp oil or ghee",
    "Fresh coriander & mint leaves"
  ],
  instructions: [
    "Cook rice until 70% done, drain, and set aside.",
    "Heat oil/ghee, fry onions until golden, remove half for garnish.",
    "Add whole spices, ginger-garlic paste, tomatoes, and yogurt.",
    "Mix in vegetables, biryani masala, chili powder, and turmeric.",
    "Layer half-cooked rice over the vegetable curry, sprinkle fried onions, mint, and coriander.",
    "Cover tightly and cook on low flame for 20–25 minutes (dum).",
    "Fluff gently and serve hot with raita."
  ]
},
{
  id: 12,
  title: "Gulab Jamun",
  image: "images/Desserts/Gulab Jamun.jpg",
  ingredients: [
    "1 cup khoya (mawa)",
    "1/4 cup all-purpose flour",
    "1/4 tsp baking soda",
    "2 tbsp milk",
    "Oil or ghee (for frying)",
    "2 cups sugar",
    "2 cups water",
    "2–3 cardamom pods",
    "Rose water (optional)"
  ],
  instructions: [
    "Mix khoya, flour, and baking soda, knead with milk to form a soft dough.",
    "Shape into small balls ensuring no cracks.",
    "Heat oil/ghee on low-medium flame and fry until golden brown.",
    "Boil sugar, water, and cardamom to make syrup. Add rose water if desired.",
    "Soak fried jamuns in warm syrup for at least 1 hour before serving."
  ]
},
{
  id: 13,
  title: "Palak Paneer",
  image: "images/mains/Palak Paneer.avif",
  ingredients: [
    "200g paneer (cubed)",
    "2 cups spinach (blanched & pureed)",
    "1 onion (chopped)",
    "2 tomatoes (chopped)",
    "1 tsp ginger-garlic paste",
    "2 green chilies",
    "1/2 tsp turmeric powder",
    "1 tsp cumin seeds",
    "1/2 tsp garam masala",
    "2 tbsp cream (optional)",
    "2 tbsp oil",
    "Salt to taste"
  ],
  instructions: [
    "Heat oil, add cumin seeds, onions, and green chilies. Sauté until golden.",
    "Add ginger-garlic paste, tomatoes, turmeric, and cook till soft.",
    "Stir in spinach puree and simmer for 5 minutes.",
    "Add paneer cubes, garam masala, and cream if using.",
    "Cook for 2–3 minutes and serve hot with roti or rice."
  ]
},
{
  id: 14,
  title: "Tiramisu",
  image: "images/Desserts/Tiramisu.avif",
  ingredients: [
    "200g ladyfinger biscuits",
    "250g mascarpone cheese",
    "1 cup heavy cream",
    "1/2 cup sugar",
    "1 cup strong coffee (cooled)",
    "2 tbsp cocoa powder",
    "2 tbsp coffee liqueur (optional)"
  ],
  instructions: [
    "Whip cream with sugar until soft peaks form.",
    "Fold in mascarpone cheese until smooth.",
    "Dip ladyfinger biscuits quickly in coffee and layer in a dish.",
    "Spread mascarpone mixture over biscuits, repeat layers.",
    "Dust with cocoa powder and refrigerate for 4–5 hours.",
    "Serve chilled."
  ]
},
{
  id: 15,
  title: "Dal Makhani",
  image: "images/mains/Dal Makhani.jpg",
  ingredients: [
    "1 cup whole black lentils (urad dal, soaked overnight)",
    "1/4 cup red kidney beans (rajma, soaked overnight)",
    "2 onions (chopped)",
    "2 tomatoes (pureed)",
    "2 tsp ginger-garlic paste",
    "1 tsp red chili powder",
    "1/2 tsp turmeric powder",
    "1 tsp garam masala",
    "1/2 cup cream",
    "3 tbsp butter",
    "2 tbsp oil",
    "Salt to taste"
  ],
  instructions: [
    "Pressure cook lentils and kidney beans until soft.",
    "Heat butter and oil, sauté onions until golden.",
    "Add ginger-garlic paste, tomato puree, and spices. Cook until thick.",
    "Add cooked lentils and beans, simmer on low flame for 30–40 minutes.",
    "Stir in cream and simmer for 5 more minutes.",
    "Serve hot with naan or rice."
  ]
}
];
