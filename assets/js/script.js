// grab daily and weekly report buttons
var dailyBtn = document.getElementById("open-daily");
var weeklyBtn = document.getElementById("open-weekly");
console.log(dailyBtn);
console.log(weeklyBtn);
// grab modal elements
var dailyReport = document.getElementById("daily-modal");
var weeklyReport = document.getElementById("weekly-modal");
console.log(dailyReport);
console.log(weeklyReport);

// modal click listeners
// daily open
dailyBtn.addEventListener("click", function() {
  dailyReport.classList.add('is-active');
});
// weekly open
weeklyBtn.addEventListener("click", function() {
  weeklyReport.classList.add('is-active');
});