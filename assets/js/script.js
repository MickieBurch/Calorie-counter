// grab daily and weekly report buttons
var dailyBtn = document.getElementById("open-daily");
var weeklyBtn = document.getElementById("open-weekly");
var dailyClose = document.getElementById("daily-close");
var weeklyClose = document.getElementById("weekly-close");
console.log(dailyClose);
console.log(weeklyClose);
// grab modal elements
var dailyReport = document.getElementById("daily-modal");
var weeklyReport = document.getElementById("weekly-modal");

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




// calorieninja calls
var query = 'caloriesreturn'
$.ajax({
  method: 'GET', url: 'https://api.calorieninjas.com/v1/nutrition?query=steak&potato',
  headers: {'X-Api-Key': '5tmVmpAvLI1Z6qTF5q/1sw==sC1RwtgbCIjYwMaD'},
  contentType: 'application/json',
  success: function(result) {
    console.log(result.items[0].calories);
  },
  error: function ajaxError(jqXHR) {
    console.error('Error: ', jqXHR.responseText);
}});