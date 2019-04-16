console.log("food api rocks");

foodFactory = (foodItem) => {
    return `<h2>${foodItem.name}</h2>`
}

//appends to the DOM
addFoodToDom = (foodAsHTML) => {
    const el = document.querySelector("#container");
    el.innerHTML += foodAsHTML;
}

function getData() {
    fetch("http://localhost:8088/food")
        .then(foodResult => {
            console.log(foodResult)
            return foodResult
        })
        .then(foods => foods.json())
        .then(parsedFoods => {
            parsedFoods.forEach(food => {
                const foodAsHTML = foodFactory(food);
                addFoodToDom(foodAsHTML);
            })
        })
}

const getDataButton = document.getElementById("btn-getData");

getDataButton.addEventListener("click", getData);









