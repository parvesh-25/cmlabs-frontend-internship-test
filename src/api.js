// import axios from "axios";
// $.ajax({
//     url: 'https://www.themealdb.com/api/json/v1/1/categories.php',
//     method: 'GET',
//     success: function(response) {
//       var dataContainer = $('#dataContainer');

//       // Loop melalui setiap kategori
//       $.each(response.categories, function(index, category) {
//         var card = '<a href="" class="cardContent bg-cream py-10  flex flex-col justify-between  items-center rounded-xl">';
//         card += '<h3 class="listTitle text-xl font-semibold ">' + category.strCategory + '</h3>';
//         card += '<img class="" src="' + category.strCategoryThumb + '" alt="' + category.strCategory + '">';
//         card += '</a>';
//         // Tambahkan card ke dalam dataContainer
//         dataContainer.append(card);
//       });
//     },
//     error: function(xhr, status, error) {
//       console.log(error);
//     }
// });

$.ajax({
    url: 'https://www.themealdb.com/api/json/v1/1/categories.php',
    method: 'GET',
    success: function(response) {
      var categoryList = $('#categoryList');
      // Loop melalui setiap kategori
      $.each(response.categories, function(index, category) {
        var card = '<a href="./category.html?category=' + category.strCategory + '"  id="cardCategory" class="bg-cream py-10  flex flex-col justify-between  items-center rounded-xl">';
        card += '<h3 class="listTitle text-xl font-semibold ">' + category.strCategory + '</h3>';
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

// Mendapatkan nilai parameter category-name dari URL
const urlParams = new URLSearchParams(window.location.search);
const categoryName = urlParams.get('category');

// Mengatur URL untuk permintaan AJAX
const categoryURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=' + categoryName;

$.ajax({
  url: categoryURL,
  method: 'GET',
  success: function(response) {
    var mealList = $('#mealList');
    // Loop melalui setiap makanan
    $.each(response.meals, function(index, meal) {
      var card = '<a href="./meal_detail.html?mealId=' + meal.idMeal + '" class="mealCard">';
      card += '<img src="' + meal.strMealThumb + '" alt="' + meal.strMeal + '" class="mealImage">';
      card += '<h3 class="mealTitle">' + meal.strMeal + '</h3>';
      card += '</a>';
      // Tambahkan card ke dalam mealList
      mealList.append(card);
    });
  },
  error: function(xhr, status, error) {
    console.log(error);
  }
});