var count1 = 0;
var count2 = 0;

$(document).ready(function () {
    var $counter1 = $('#counter1');
    $(".photo#cat1").click(function () {
        count1 = count1 + 1;
        $counter1.text(count1);
    });
})

$(document).ready(function () {
    var $counter2 = $('#counter2');
    $(".photo#cat2").click(function () {
        count2 = count2 + 1;
        $counter2.text(count2);
    });
})
