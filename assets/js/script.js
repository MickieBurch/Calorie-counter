// grab daily and weekly report buttons
var dailyBtn = document.getElementById("open-daily");
var weeklyBtn = document.getElementById("open-weekly");
var dailyClose = document.getElementById("daily-close");
var weeklyClose = document.getElementById("weekly-close");
var mealInputEl = document.getElementById("item-name");
console.log(dailyClose);
console.log(weeklyClose);
let items = JSON.parse(localStorage.getItem('items'))?JSON.parse(localStorage.getItem('items')): []
// grab modal elements
var dailyReport = document.getElementById("daily-modal");
var weeklyReport = document.getElementById("weekly-modal");

document.getElementById("add-meal").addEventListener("click", addMeal);
//document.getElementById("update-meal").addEventListener("click", updateMeal);
//document.getElementById("delete-meal").addEventListener("click", deleteMeal);
document.getElementById("delete-all").addEventListener("click", deleteAllMeals);
//document.getElementById("back").addEventListener("click", back);
var itemList = document.getElementById("item-list");


// calorieninja calls
async function getInput(calorieReturn) {

var apiresult;

$.ajax({
  method: 'GET', url: 'https://api.calorieninjas.com/v1/nutrition?query=' + calorieReturn,
  headers: {'X-Api-Key': '5tmVmpAvLI1Z6qTF5q/1sw==sC1RwtgbCIjYwMaD'},
  contentType: 'application/json',
  success: function(result) {
    console.log(result.items[0].calories);
    apiresult = result.items[0].calories;
    
  },
  error: function ajaxError(jqXHR) {
  console.error('Error: ', jqXHR.responseText);
}});
return apiresult
}



$("#todaysDate").html(moment().format("LL"));

$("#weekDate").html('Current Week');

async function addMeal(event){
event.preventDefault();
  mealName = document.getElementById("item-name").value;
  mealCalories = document.getElementById("item-calories").value;

  var item = {
    "itemName": mealName,
    "itemCalories": mealCalories
  }
  //debugger;
  if (!mealCalories) {
    var calledcalories = await getInput(mealName);
    console.log(typeof(calledcalories));

  }
  //myStoreItem(item);
  StorageCtrl.storeItem(item);
  displayItems();
}

//FUNCTION FOR UPDATE MEAL 
function updateMeal(){
  taskButtonHandler.addEventListener("click",updateMeal)
  console.log("update")

  }
  
  //FUNCTION FOR deleteMeal
  //ul.addEventListener("click", (event) =>{
    //if(event.target.tagName === Button){
      //const button = event.target;
      //const li = button.parentNode;
      //const ul = li.parentNode;
      //if (button.textContent === "Delete Meal"){
     //   ul.removeChild(li)
      //}
    //}
  //})
  
  
  //deleteAllMeals button 
  function deleteAllMeals(){
  var list = document.getElementById("item-list");
  while(list.firstChild){
  list.removeChild(list.firstChild);
  
}
items = [] 
localStorage.setItem('items', JSON.stringify(items));

  }


  

function displayItems(){
  items = [];
  if (localStorage.getItem('items')){items = JSON.parse(localStorage.getItem('items'));}
  var calories = 0;
itemList.innerHTML = ""
  items.forEach((item)=>{
  
    var li = document.createElement("li");
    li.innerText = "Meal Name:" +  item.itemName + " Calories: " + item.itemCalories;
    var deletebtn = document.createElement("button");
    deletebtn.value = item.itemName
    deletebtn.innerText = "delete"
    var editBtn = document.createElement("button");
    editBtn.innerText = "edit"
    li.appendChild(deletebtn);
    li.appendChild(editBtn); 
    itemList.appendChild(li);
    deletebtn.addEventListener("click",function(event){
      event.preventDefault()
      console.log(event.target.value)
      var removedItems = items.filter(item => {
        console.log(item)
        if (event.target.value !== item.itemName){
          return item
        }
      })
      console.log(removedItems)
      items = removedItems
      localStorage.setItem('items', JSON.stringify(items));
      displayItems()

    })

    editBtn.addEventListener("click",function(){
      console.log("edithit")

      
    })
    calories + item.itemCalories;
  })

  totalCaloriesSpan = document.getElementById("total-calories");
  totalCaloriesSpan.innerText = calories;

}

// modal click listeners
// daily open
dailyBtn.addEventListener("click", function() {
  dailyReport.classList.add('is-active');
});
// weekly open
weeklyBtn.addEventListener("click", function() {
  weeklyReport.classList.add('is-active');
});
// close modals
dailyClose.addEventListener("click", function() {
  dailyReport.classList.remove('is-active');
});
weeklyClose.addEventListener("click", function() {
  weeklyReport.classList.remove('is-active');
});


//When the page loads / refreshes
document.addEventListener("DOMContentLoaded", function() {
  // 
  displayItems();
});

//Storage controller
const StorageCtrl = (function () {
    storeItem: function storeItem(item) {
      let items;
      //Check if any items in localStorage
      if (localStorage.getItem('items') === null) {
        items = [];
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
      } else {
        items = JSON.parse(localStorage.getItem('items'));
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
      }
    }
    //This is getting the items that have been stored in local storage.
    getItemsFromStorage: function getItemsFromStorage() {
      let items;
      if (localStorage.getItem('items') === null) {
        items = []
      } else {
        items = JSON.parse(localStorage.getItem('items'));
      }
      return items;
    }
    //Deleting the information from local storage.
    deleteItemFromStorage: function deleteItemFromStorage() {
      let item = ItemCtrl.findToDelete();
      console.log(item);
      let items = getItemsFromStorage();
      items.forEach(x => {
        if (x.id == item.id) {
          items.splice(x.id, 1);
        }
      })
      localStorage.setItem('items', JSON.stringify(items));
    }
  

    //Updating the information inputed into local storage.
    updateItemFromStorage: function updateItemFromStorage() {
      let items = ItemCtrl.data.items;
      localStorage.setItem('items', JSON.stringify(items));
    }
  
    //Clearing out ALL information from storage if user selects delete all.

    deleteAllFromStorage: function deleteAllFromStorage() {
      localStorage.removeItem('items');
      ItemCtrl.nullifyTotalCallories();
    }
  
    //Returning all of the items listed above to track in local storage.
    
    return {
      storeItem,
      getItemsFromStorage,
      deleteItemFromStorage,
      updateItemFromStorage,
      deleteAllFromStorage
    }
  })();

  // calorieninja calls

// $.ajax({
//   method: 'GET', url: 'https://api.calorieninjas.com/v1/nutrition?query=tomato',
//   headers: {'X-Api-Key': '5tmVmpAvLI1Z6qTF5q/1sw==sC1RwtgbCIjYwMaD'},
//   contentType: 'application/json',
//   success: function(result) {
//     console.log(result.items[0].calories);
//   },
//   error: function ajaxError(jqXHR) {
//     console.error('Error: ', jqXHR.responseText);
// }});

