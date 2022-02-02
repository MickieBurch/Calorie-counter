




var query = 'caloriesreturn'
$.ajax({
    method: 'GET',
    url: 'https://api.calorieninjas.com/v1/nutrition?query=steak&potato',
    headers: { 'X-Api-Key': '5tmVmpAvLI1Z6qTF5q/1sw==sC1RwtgbCIjYwMaD'},
    contentType: 'application/json',
    success: function(result) {
        console.log(result.items[0].calories);
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
});


    // function pullcalories() {

    //     var request;
    //     var input1 = document.getElementById('');
    //     var api = 'https://api.calorieninjas.com/v1/nutrition?query=';
    //     var apikey =
    //         '5tmVmpAvLI1Z6qTF5q/1sw==sC1RwtgbCIjYwMaD';
    //     var sum = api + input1.value;

    //     request = new XMLHttpRequest();

    //     request.open('GET', sum, true);
    //     request.onload = function () {

    //         var data = JSON.parse(this.response);
    //         if (request.status >= 200 && request.status < 400) {
    //             console.log(result);
    //         } else {
    //             console.log(input1.value);
    //         }
    //     }

    // }
