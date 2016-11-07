var counters[7] = 0;

var cats = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven'];

$(document).ready(function () {

    var $counter = $('#counter1');
    var $photoID1 = $('#cat1')

    $(".photo#cat").click(function () {
        count1 = count1 + 1;
        $counter1.text(count1);
        $photoID1.text('You clicked on ' + cat1);
    });
})

