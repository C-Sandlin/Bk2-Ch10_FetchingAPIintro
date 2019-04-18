// create function to get all food data (local and api) and input into DOM

function getData() {
    //grab HTML to inject food data
    let foodlist = document.querySelector(".foodList");
    // clear element
    foodlist.innerHTML = "";
    // fetch LOCAL food data
    fetch("http://localhost:8088/food")
    .then (response => response.json())
    .then(parsedFoods => {
        //console.table shows data in console as a table
        console.table(parsedFoods);
        // loop over local food data, grab barcode and use it to fetch API data
        parsedFoods.forEach(item => {
            fetch(`http://world.openfoodfacts.org/api/v0/product/${item.barcode}.json`)
            .then(APIfoods => APIfoods.json())
            .then(parsedAPIfoods => {
                //target html element and inject DOM element created by foodFactory function
                // In below, item is from local API, parsedAPI foods is from online
                foodlist.innerHTML += foodFactory(item, parsedAPIfoods);
            });
        });
    });
}


// input local and API food data to create DOM element
function foodFactory(localFood, apiFood) {
    return `
    <div class="food_list">
        <h2>${localFood.name}</h2>
        <h3>${localFood.ethnicity}</h3>
        <p>${localFood.type}</p>
        <p>Country: ${apiFood.product.countries}</p>
        <p>Calories: ${apiFood.product.nutriments.energy_serving}</p>
        <p>Fat: ${apiFood.product.nutriments.fat_serving}</p>
        <p class="ingredients">Ingredients: ${apiFood.product.ingredients_text}</p>
    </div>
    `;
}

const getDataBtn = document.getElementById("btn-get-data");
getDataBtn.addEventListener("click", () => getData());























































































   // return `
    // <div class="foodItem">
    //     <h2>${foodItem.name}</h2>
    //     <p>${foodItem.category}</p>
    //     <p>${foodItem.ethnicity}</p>
    //     <p>${foodItem.origin}</p>
    // </div>
    // `

    // foodFactory = (foodItem) => {
    //     const newDiv = document.createElement("div");
    //     const existDiv = document.getElementById("container");
    //     existDiv.appendChild(newDiv);
    //     const newH2 = document.createElement("h2");
    //     newH2.innerHTML = `${foodItem.name}`;
    //     newDiv.appendChild(newH2);
    //     newDiv.className = "foodItem";
    //     const newP = document.createElement("p");
    //     newDiv.appendChild(newP);
    //     newP.innerHTML = `
    //         <p>Category: ${foodItem.category}</p>
    //         <p>Ethnicity: ${foodItem.ethnicity}</p>
    //         <p>Origin: ${foodItem.stores}</p>
    //         <p>Rating: ${foodItem.rating}</p>
    //         <p>Fat: ${foodItem.fat}</p>
    //         <p>Sugar: ${foodItem.sugar}</p>
    //         `;
    // }
    // //appends to the DOM
    // addFoodToDom = (foodAsHTML) => {
    //     const el = document.querySelector("#container");
    //     el.innerHTML += foodAsHTML;
    // }
    
    // function getData() {
    //     fetch("http://localhost:8088/food")
    //         .then(foodResult => {
    //             console.log(foodResult)
    //             return foodResult;
                
    //         })
    //         .then(foods => foods.json())
    //         .then(parsedFoods => {
    //             parsedFoods.forEach(food => {
    //                 fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
    //                 .then(response => response.json())
    //                 .then(productInfo => {
    //                     food.stores = productInfo.product.nutrition_grades;
                        
    //                 })
    //                 const foodAsHTML = foodFactory(food);
    //                 addFoodToDom(foodAsHTML);
    
    //             })
    //         })
    // }
    
    // const getDataButton = document.getElementById("btn-getData");
    // getDataButton.addEventListener("click", getData);
    