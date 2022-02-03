
document.getElementById("add-meal").addEventListener("click", addMeal);
// document.getElementById("update-meal").addEventListener("click", updateMeal);
// document.getElementById("delete-meal").addEventListener("click", deleteMeal);
// document.getElementById("delete-all").addEventListener("click", deleteAllMeals);
//document.getElementById("back").addEventListener("click", back);
var itemList = document.getElementById("item-list");

//When the page loads / refreshes
document.addEventListener("DOMContentLoaded", function() {
  // 
  displayItems();
});



function addMeal(){
  mealName = document.getElementById("item-name").value;
  mealCalories = document.getElementById("item-calories").value;

  var item = {
    "itemName": mealName,
    "itemCalories": mealCalories
  }

  //myStoreItem(item);
  StorageCtrl.storeItem(item);
  displayItems();
}

function displayItems(){
  items = [];
  items = items = JSON.parse(localStorage.getItem('items'));
  var calories = 0;

  items.forEach((item)=>{
    var li = document.createElement("li");
    li.innerText = "Meal Name:" +  item.itemName + " Calories: " + item.itemCalories;
    itemList.appendChild(li);
    calories + item.itemCalories;
  })

  totalCaloriesSpan = document.getElementById("total-calories");
  totalCaloriesSpan.innerText = calories;

}




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
  