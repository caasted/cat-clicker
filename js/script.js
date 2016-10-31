var count1 = 0;
var count2 = 0;

var cat1 = 'Poplinre';
var cat2 = 'Chewie';

$(document).ready(function () {

    var $counter1 = $('#counter1');
    var $photoID1 = $('#cat1')

    $(".photo#cat1").click(function () {
        count1 = count1 + 1;
        $counter1.text(count1);
        $photoID1.text('You clicked on ' + cat1);
    });
})

$(document).ready(function () {

    var $counter2 = $('#counter2');
    var $photoID2 = $('#cat2')

    $(".photo#cat2").click(function () {
        count2 = count2 + 1;
        $counter2.text(count2);
        $photoID2.text('You clicked on ' + cat2);
    });
})
