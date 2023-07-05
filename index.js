import { menuArray } from "./data.js";

const renderSectionOne = document.getElementById("sectionOne");
const renderSectionTwo = document.getElementById("inner-container");
const footerContainer = document.getElementById("footer-container");
const container = document.getElementById("container");
const consentForm = document.getElementById("consent-form");

console.log(modal);

let totalPrice = 0;

// addEventListener

document.addEventListener("click", function (event) {
  if (event.target.dataset.add) {
    addToArr(event.target.dataset.add);
  } else if (event.target.id === "Complete-order") {
    completeOrder();
  }
  //   else if (event.target.id === "pay") {
  //     completePay();
  //   }
});

//////////////////////////////////////////////////////////////////

// Complete Order Btn function

function completeOrder() {
  document.getElementById("modal").style.display = "block";
}
///////////////////////////////////////////////////////

// Getting data from consent form

document.addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(event.target);

  // Get form values
  const name = formData.get("name");

  completePay(name);
});

// //////////////////////////////////////////

// Complete Pay Btn function

function completePay(name) {
  document.getElementById("modal").style.display = "none";
  container.innerHTML = `
 
      <div class="last-section-inner">
        <p class="thanks-para">Thanks, ${name}! Your order is on its way!</p>
      </div>
   
  
  `;
}

////////////////////////////////////////////////

function addToArr(iconID) {
  let arr = [];
  iconID = parseInt(iconID); // Convert iconID to a number

  const pushedObj = menuArray.filter(function (menu) {
    return menu.id === iconID;
  })[0];

  arr.push(pushedObj);
  totalPrice += pushedObj.price;

  bottomRender(arr);
}

function bottomRender(array) {
  array.forEach(function (obj) {
    renderSectionTwo.innerHTML += `

    <div class="inner-one">
      <h2>${obj.name}</h2>
      <button class="remove-btn" data-id="${obj.id}">remove</button>
      <h3 class="child-three">${obj.price}$</h3>
    </div>

   `;

    footerContainer.innerHTML = `

    <div class="inner-three">
    <h2>Total Price:</h2>
    <h3 class="child-three">${totalPrice}$</h3>
  </div>
   `;
  });
}

// new arr foreach

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function displayMenu() {
  let menuItem = "";

  menuArray.forEach(function (obj) {
    //////////////////////////////////////

    //   For ingredients
    let ingredientHTML = "";

    if (obj.ingredients.length > 0) {
      obj.ingredients.forEach(function (ingredient) {
        ingredientHTML += `
       
        <span class = 'flex-ingredient'>${ingredient}</span>
        </span>
        `;
      });
    }

    ////////////////////////////////////////
    menuItem += `
        <div class="flex-container">
        <div class="child-one">
          <span class = "emoji">${obj.emoji}</span>
        </div>
        <div class="child-two">
          <h2>${obj.name}</h2>
           <div>${ingredientHTML}</div>
          <h3>${obj.price}$</h3>
        </div>

        <div class="plus-circle-icon child-three">
          <i class="fas fa-plus" data-add = "${obj.id}"></i>
        </div>
      </div>

        `;
  });

  return menuItem;
}

function render() {
  renderSectionOne.innerHTML = displayMenu();
}

render();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
