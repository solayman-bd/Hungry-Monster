function clickResponse() {
  let inputText = document.getElementById("input-text").value;
  let imageDiv = document.getElementById("image");
  let showingIngredients = document.getElementById("showing-ingredients");
  showingIngredients.innerHTML = "";
  imageDiv.innerHTML = "";
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${inputText}`)
    .then((res) => res.json())
    .then((data) => {
      let mealsName = data.meals;
      mealsName.forEach((meal) => {
        let imageDetails = document.createElement("div");
        imageDetails.className = "image-div-details";
        let mealId = meal.idMeal;
        imageDetails.setAttribute("onclick", `mealDetails(${mealId})`);
        imageDetails.innerHTML = `
      <img class="image-size" src=${meal.strMealThumb}>
      <h2 class="text-center">${meal.strMeal}</h2>
      `;
        imageDiv.appendChild(imageDetails);
      });
      document.getElementById("input-text").value = "";
    });
}
function mealDetails(mealIdValue) {
  let showingIngredients = document.getElementById("showing-ingredients");
  showingIngredients.innerHTML = "";
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealIdValue}`)
    .then((res) => res.json())
    .then((data) => {
      let requiredObject = data.meals[0];
      let objectKeys = Object.keys(requiredObject);
      let objectKeysLength = objectKeys.length;
      objectKeys.forEach((everyObject) => {
        for (let i = 0; i < objectKeysLength; i++) {
          if (everyObject === `strIngredient${[i]}`) {
            let myObj = `${requiredObject[everyObject]}`;
            if (myObj != "") {
              let li = document.createElement("li");
              li.innerText = `${myObj}`;
              showingIngredients.appendChild(li);
            }
          }
        }
      });
    });
}