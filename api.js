// Back Button
$(document).ready(function () {
  $('#backBtn').on('click', function (e) {
    e.preventDefault();
    window.history.back();
  });
});


$(document).ready(function () {
  // category
  $.ajax({
    url: 'https://www.themealdb.com/api/json/v1/1/categories.php',
    method: 'GET',
    success: function (response) {
      var categoryList = $('#categoryList');
      // Loop melalui setiap kategori
      $.each(response.categories, function (index, category) {
        var card = '<div class="cardWrapper w-1/2 px-2 md:w-1/3 lg:w-1/4 lg:px-4  ">';
        card += '<a href="/view/category.html?category=' + category.strCategory + '" id="cardCategory" class="bg-cream py-6  flex flex-col justify-between items-center rounded-xl  lg:py-7">';
        card += '<h3 class="listTitle text-xl font-semibold  text-center mb-8 sm:mb-10 md:text-[28px] md:mb-14 lg:mb-16 xl:mb-24">' + category.strCategory + '</h3>';
        card += '<img class="p-2 rounded-xl md:rounded-2xl" src="' + category.strCategoryThumb + '" alt="' + category.strCategory + '">';
        card += '</a>';
        card += '</div>';

        // Tambahkan card ke dalam dataContainer
        categoryList.append(card);
      });
    },
    error: function (xhr, status, error) {
      console.log(error);
    }
  });

  // Category Detail
  // Mendapatkan nilai parameter category-name dari URL
  const urlParams = new URLSearchParams(window.location.search);
  const categoryName = urlParams.get('category');

  // URL untuk AJAX req
  const categoryURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=' + categoryName;
  $.ajax({
    url: categoryURL,
    method: 'GET',
    success: function (response) {
      var mealList = $('#mealList');
      // Loop melalui setiap makanan
      $.each(response.meals, function (index, meal) {
        var card = '<a id="mealCard"  href="/view/meal-detail.html?meal=' + meal.idMeal + '" class="cardWithOverlay items-end justify-center flex md:w-1/2 xl:w-1/3">';
        card += '<img id="mealImage" src="' + meal.strMealThumb + '" alt="' + meal.strMeal + '" class="w-screen object-cover sm:h-96 lg:h-auto">';
        card += '<h3 id="mealTitle" class="absolute m-6 text-cream font-semibold text-2xl  text-center md:text-[28px]  ">' + meal.strMeal + '</h3>';
        card += '</a>';
        mealList.append(card);
      });
    },
    error: function (xhr, status, error) {
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
    success: function (response) {
      var meal = response.meals[0];
      // Tampilkan detail makanan
      $('#detailTitle').text(meal.strMeal);
      $('#detailImg').attr('src', meal.strMealThumb);
      $('#detailInstruct').text(meal.strInstructions);

      // Tampilkan video tutorial (jika tersedia)
      const youtubeLink = meal.strYoutube;
      const youtubeEmbedLink = youtubeLink.replace('watch?v=', 'embed/');
      $('#detailTutor').attr('src', youtubeEmbedLink);

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
    error: function (xhr, status, error) {
      console.log(error);
    }
  });
});
