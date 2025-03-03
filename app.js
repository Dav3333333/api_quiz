"use strict";
const API_KEY = "cdc7eaa223694f11bae3056277487776";

// const URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}`;
const URL_API = `https://api.spoonacular.com/recipes/complexSearch?`; 



const section = document.querySelector("section");
let number = 100;
let offset = 1;


let endPoint = `number=${number}&apiKey=${API_KEY}&sort=popularity`;


async function getNutrition() {
    window.addEventListener("online", ()=>{
      alert("Check your network");
      return;
    });

    console.log(`${URL_API}${endPoint}`);
    //send query
    const response = await fetch(`${URL_API}${endPoint}`);

    // fetch data
    const data = await response.json();

    const list = [...Object.entries(data)[0][1]];

    // generate html for food 
    checkToRender(list);
    buttonHandle();
}

/**
 * 
 * @param {Array} list: the list of all the food sent by the server 
 */
function checkToRender(list){
    list.forEach((food)=>{
        createFoodHtml(food);
    });
}

/**
 * 
 * @param {*} food : a food object
 */
function createFoodHtml(food){
    const model = `<div class="card" id=${food.id}>
        <img class="card__img" src="${food.image}" />
        <div class="card__details">
          <p class="text text--md text--bold">${food.title}</p>
          <p class="text text--sm text--secondary">
            <span class="material-icons"><button id="${food.id}" class="read__more">READ MORE</button></span>&nbsp;
          </p>
        </div>
      </div>`;

    section.insertAdjacentHTML("beforeend",model);
}

function buttonHandle(){
  section.addEventListener("click", (e)=>{
    const target = e.target;
  
    if(target.classList.contains("read__more")){
      console.log(target.id);
      showFood(target.id);
    }
  
  });
}


async function showFood(idFood) {
  section.innerHTML = "";
  const reponse = await fetch(`https://api.spoonacular.com/recipes/${idFood}/information?includeNutrition=false&apiKey=${API_KEY}`);

  const data = await reponse.json();

  const foodArray = Object.entries(data);
  const food = {};
  foodArray.forEach(([key, value]) => {
    food[key] = value;
  });


    // Convert description from HTML entities to actual HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = food.summary;
    const actualDescription = tempDiv.innerHTML;

    const instructions = (food.instructions)? food.instructions : "No instructions available";

  const model = `<div class="food__details">
                    <img class="card__img" style="border-radius: 10px 10px 0px 0px;" src="${food.image}" />
                    <div class="food__info">
                      <p class="text text--md text--bold">${food.title}</p>
                      <div class="text text--sm text--secondary" style="text-align: justify; font-size: 2rem;">${instructions}</div>
                      <div class="text text--sm text--secondary" style="text-align: justify;"></div>
                      <div class="text text--sm text--secondary" style="text-align: justify; font-size: 2rem;">${actualDescription}</div>
                    </div>
                </div>`;
  section.innerHTML = model;
}

function initInssentials() {
  getNutrition();
  window.addEventListener("hashchange", (e)=>{
    console.log(window.location.hash.slice(1));
    endPoint = `diet=${(window.location.hash.slice(1).toLocaleLowerCase())}&number=${number}&apiKey=${API_KEY}&sort=popularity`;
    section.innerHTML = "";
    getNutrition();
  });
}

initInssentials();
