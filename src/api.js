// import axios from "axios";

// category
$.ajax({
    url: 'https://www.themealdb.com/api/json/v1/1/categories.php',
    method: 'GET',
    success: function(response) {
      var categoryList = $('#categoryList');
      // Loop melalui setiap kategori
      $.each(response.categories, function(index, category) {
        var card = '<a href="./category.html?category=' + category.strCategory + '"  id="cardCategory" class="bg-cream py-10  flex flex-col justify-between  items-center rounded-xl">';
        card += '<h3 class="listTitle text-xl font-semibold">' + category.strCategory + '</h3>';
        card += '<img class="" src="' + category.strCategoryThumb + '" alt="' + category.strCategory + '">';
        card += '</a>';
        // Tambahkan card ke dalam dataContainer
        categoryList.append(card);
      });
    },
    error: function(xhr, status, error) {
      console.log(error);
    }
});



// Category Detail

// Mendapatkan nilai parameter category-name dari URL
const urlParams = new URLSearchParams(window.location.search);
const categoryName = urlParams.get('category');

//  URL untuk AJAX req
const categoryURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=' + categoryName;
$.ajax({
  url: categoryURL,
  method: 'GET',
  success: function(response) {
    var mealList = $('#mealList');
    // Loop melalui setiap makanan
    $.each(response.meals, function(index, meal) {
      var card = '<a href="./meal-detail.html?meal=' + meal.idMeal+ '" class="mealCard cardWithOverlay items-end justify-center flex  hover:border-cream md:w-1/2 lg:w-1/3 xl:h-1/4">';
      card += '<img src="' + meal.strMealThumb + '" alt="' + meal.strMeal + '" class="mealImage">';
      card += '<h3 id="mealTitle" class="absolute m-6 text-cream font-semibold text-xl text-center ">' + meal.strMeal + '</h3>';
      card += '</a>';
      // Tambahkan card ke dalam mealList
      mealList.append(card);
    });
  },
  error: function(xhr, status, error) {
    console.log(error);
  }
});


// Meal Detail
// Mendapatkan nilai parameter meal-id dari URL
const mealId = urlParams.get('meal');

// URL untuk AJAX request
const mealURL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + mealId;
$.ajax({
  url: mealURL,
  method: 'GET',
  success: function(response) {
    var meal = response.meals[0];
    // Tampilkan detail makanan
    $('#detailTitle').text(meal.strMeal);
    $('#detailImg').attr('src', meal.strMealThumb);
    $('#detailInstruct').text(meal.strInstructions);
    // Tampilkan video tutorial (jika tersedia)
    $('#detailTutor').attr('src', meal.strYoutube);

    // Bahan-bahan
    var ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal['strIngredient' + i];
      const measure = meal['strMeasure' + i];
      if (ingredient && measure) {
        ingredients.push(ingredient + ' - ' + measure);
      }
    }
    var ingredientsList = ingredients.map(ingredient => '<li>' + ingredient + '</li>').join('');
    $('#detailIngridient').html(ingredientsList);
  },
  error: function(xhr, status, error) {
    console.log(error);
  }
});


// Back Button
  $(document).ready(function() {
    $('#backBtn').on('click', function(e) {
      e.preventDefault();
      window.history.back();
    });
  });
  